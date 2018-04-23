var dotenv = require('dotenv'),
    request = require('request'),
    _ = require('underscore');

var CloudFlareOFA = function (api_url_zones, api_url, x_auth_key, x_auth_email, addBlockIp, id, zoneId) {
    var headers = {
            'X-Auth-Email': x_auth_email,
            'X-Auth-Key': x_auth_key,
            'Content-Type': 'application/json'
        },

        optionsGetZones = {
            url: api_url_zones,
            method: 'GET',
            headers: headers
        },

        optionsPOST = {
            url: api_url + zoneId + '/firewall/access_rules/rules',
            method: 'POST',
            headers: headers,
            json: true,
            body: addBlockIp
        },
        optionsDELETE = {
            url: api_url + zoneId + '/firewall/access_rules/rules' + id,
            method: 'DELETE',
            headers: headers
        };

    this.getAllBlockedIPS = function (callback) {
    	request(optionsGetZones,
            function (error, response, body) {
                if (error || response.statusCode !== 200) {
                    callback(error || body);
                }
                createMyZones(body, api_url, headers, callback);
            });
    };

    this.setAllBlockedIPS = function (callback) {
        request(optionsPOST,
            function (error, response, body) {
                if (error || response.statusCode !== 200) {
                    callback(error);
                }
                callback(response.statusCode);
            });
    };

    this.deleteIPS = function (callback) {
        request(optionsDELETE,
            function (error, response, body) {
                if (error || response.statusCode !== 200) {
                    callback(error);
                }
                callback(response.statusCode);
            });
    };
};

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
        data = [],
        optionsGET = {
            url: api_url + zoneId + '/firewall/access_rules/rules?page=1&per_page=1000&order=type&direction=asc',
            method: 'GET',
            headers: headers
        };

    request(optionsGET,
        function (error, response, body) {
            if (error || response.statusCode !== 200) {
                return callback(error || body);
            }

            data.push(createMyJson(body, zoneId));

            if (dataIndex == size) {
                callback(data);
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
