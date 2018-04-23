var request = require('request')

var CloudFlareOFA = function (x_auth_key, x_auth_email) {
    var headers =   {
                        'X-Auth-Email': x_auth_email,
                        'X-Auth-Key': x_auth_key,
                        'Content-Type': 'application/json'
                    }

    this.getAllZones = function(callback){
        getAllZonesBACKEND(headers, 1, [], callback)
    }

    this.getIPsPerZone = function(zoneID, callback){
        getIPsPerZoneBACKEND(headers, zoneID, 1, [], callback)
    }

    this.getParentIPs = function(callback){
        getParentIPsBACKEND(headers, 1, [], callback)
    }

    this.addNewIP = function (action, callback) {
       
        var httpHEADER = {
            url:  "https://api.cloudflare.com/client/v4/user/firewall/access_rules/rules",
            method: 'POST',
            headers: headers,
            json: true,
            body: action
        }
        request(httpHEADER,
            function (error, response, body) {
                //console.log("Error: " + response.statusCode)
                if (error || response.statusCode !== 200) {
                    console.error(error)
                    callback(null)
                }else{
                    callback(response.statusCode)
                }
            }
        )
    }

    this.deleteIP = function (id, callback) {

        var httpHEADER = {
            url:  "https://api.cloudflare.com/client/v4/user/firewall/access_rules/rules/" + id,
            method: 'DELETE',
            headers: headers
        }
        request(httpHEADER,
            function (error, response, body) {
                if (error || response.statusCode !== 200) {
                    console.error(error)
                    callback(null)
                }else{
                    callback(response.statusCode)
                }
                
            }
        )
    }


}

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
                    if(body.result[i].configuration.target==="ip" || body.result[i].configuration.target==="ip_range"){
                        entry.ip = body.result[i].configuration.value
                        returnArray.push(entry)
                    }
                    
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

function getParentIPsBACKEND(headers, page, returnArray, callback){
    httpHEADER = {
        url: "https://api.cloudflare.com/client/v4/user/firewall/access_rules/rules?page=" + page + "&per_page=1000",
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
                    if(body.result[i].configuration.target==="ip" || body.result[i].configuration.target==="ip_range"){
                        entry.ip = body.result[i].configuration.value
                        returnArray.push(entry)
                    }
                    
                }
                if(body.result_info.total_pages===page){
                    callback(returnArray)
                }else{
                    getParentIPsBACKEND(headers, page+1, returnArray, callback)
                }
            }
        }
    )
}


module.exports = CloudFlareOFA;
