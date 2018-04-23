var dotenv = require('dotenv'),
    request = require('request'),
    _ = require('underscore');

var CloudFlareOFA = function (x_auth_key, x_auth_email) {
    var headers = {
            'X-Auth-Email': x_auth_email,
            'X-Auth-Key': x_auth_key,
            'Content-Type': 'application/json'
        },
        optionsGetZones = {
            url: "api_url_zones",
            method: 'GET',
            headers: headers
        },
        optionsPOST = {
            url: "api_url" + '/firewall/access_rules/rules',
            method: 'POST',
            headers: headers,
            json: true,
            body: 'addBlockIp'
        },
        optionsDELETE = {
            url: "api_url" + 'zoneId' + '/firewall/access_rules/rules' + 'id',
            method: 'DELETE',
            headers: headers
        };

    //var myown = new CloudFlareOFA(api_url_zones, api_url, x_auth_key, x_auth_email)

    this.getAllZones = function(page, zones, callback){
        getAllZonesBACKEND(headers, page, zones, callback)
    }

    this.getIPsPerZone = function(zoneID, page, returnArray, callback){
        getIPsPerZoneBACKEND(headers, zoneID, page, returnArray, callback)
    }

    this.getAllBlockedIPS = function (callback) {
    	request(optionsGetZones,
            function (error, response, body) {
                if (error || response.statusCode !== 200) {
                    return callback(error || body);
                }

                console.log(body)
                console.log("==========================")
                createMyZones(body, api_url, headers, callback);
            });
    };

    this.setAllBlockedIPS = function (callback) {
        request(optionsPOST,
            function (error, response, body) {
                if (error || response.statusCode !== 200) {
                    return callback(error);
                }
                callback(response.statusCode);
            });
    };

    this.deleteIPS = function (callback) {
        request(optionsDELETE,
            function (error, response, body) {
                if (error || response.statusCode !== 200) {
                    return callback(error);
                }
                callback(response.statusCode);
            });
    };
};

function getAllZonesBACKEND(headers, page, zones, callback){
    httpHEADER = {
        url: "https://api.cloudflare.com/client/v4/zones?page=" + page + "&per_page=1000",
        method: 'GET',
        headers: headers
    }
    request(httpHEADER,
        function (error, response, body) {
            if (error || response.statusCode !== 200) {
                console.error(error)
                callback(null)
            }else{
                var body = JSON.parse(body)
                for(i=0;i<body.result.length;i++){
                    zones.push(body.result[i].id)
                }
                if(body.result_info.total_pages===page){
                    callback(zones)
                }else{
                    getAllZonesBACKEND(headers, page+1, zones, callback)
                }
            }
        }
    )
}

function getIPsPerZoneBACKEND(headers, zoneID, page, returnArray, callback){
    httpHEADER = {
        url: "https://api.cloudflare.com/client/v4/zones/" + zoneID + "/firewall/access_rules/rules?page=" + page + "&per_page=1000",
        method: 'GET',
        headers: headers
    }
    request(httpHEADER,
        function (error, response, body) {
            if (error || response.statusCode !== 200) {
                console.error(error)
                callback(null)
            }else{
                var body = JSON.parse(body)

                for(i=0;i<body.result.length;i++){
                    var entry = {
                        id: body.result[i].id,
                        notes: body.result[i].notes,
                        mode: body.result[i].mode
                    }
                    returnArray.push(entry)
                }
                if(body.result_info.total_pages===page){
                    callback(zoneID, returnArray)
                }else{
                    getIPsPerZoneBACKEND(headers, zoneID, page+1, returnArray, callback)
                }
            }
        }
    )
}

function createMyZones(validElements, api_url, headers, callback) {
    var resp = JSON.parse(validElements),
        result = resp.result,
        dataIndex = 0;
    
    _.map(result, function (item) {
    	dataIndex++;
    	createGetRest(result.length, item.id, api_url, headers, dataIndex, callback);
    });
};

function createGetRest(size, zoneId, api_url, headers, dataIndex, callback) {
    var respData,
        optionsGET = {
            url: api_url + zoneId + '/firewall/access_rules/rules?page=1&per_page=4&order=type&direction=asc',
            method: 'GET',
            headers: headers
        };
    request(optionsGET,
        function (error, response, body) {
            if (error || response.statusCode !== 200) {
                return callback(error || body);
            }
        if (dataIndex == size) {
            callback(createMyJson(body, zoneId));
        } else {
            createMyJson(body, zoneId)
        }
    });
};

function createMyJson(validElements, zoneId) {
    var resp = JSON.parse(validElements),
        result = resp.result,
        arrayListData = [];

    _.map(result, function (item) {
        arrayListData.push({
            id: item.id,
            ip: item.configuration.value,
            mode: item.mode,
            zoneId: zoneId
        });
    });
    return arrayListData;
};

module.exports = CloudFlareOFA;
