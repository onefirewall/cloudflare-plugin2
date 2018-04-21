var dotenv = require('dotenv'),
    request = require('request'),
    _ = require('underscore');

var CloudFlareOFA = function (api_url_zones, api_url, api_url_delete, api_url_post, x_auth_key, x_auth_email, addBlockIp, id) {
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
        optionsGET = {
            url: api_url + id + '?page=1&per_page=1000&order=type&direction=asc',
            method: 'GET',
            headers: headers
        },
        optionsPOST = {
            url: api_url_post,
            method: 'POST',
            headers: headers,
            json: true,
            body: addBlockIp
        },
        optionsDELETE = {
            url: api_url_delete + id,
            method: 'DELETE',
            headers: headers
        };

    this.getAllZones = function (callback) {
        request(optionsGetZones,
            function (error, response, body) {
                if (error || response.statusCode !== 200) {
                    return callback(error || body);
                }
                callback(createMyZones(body));
            });
    };

    this.getAllBlockedIPS = function (callback) {
        request(optionsGET,
            function (error, response, body) {
                if (error || response.statusCode !== 200) {
                    return callback(error || body);
                }
                callback(createMyJson(body));
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

function createMyZones(validElements) {
    var zonesList = [],
        resp = JSON.parse(validElements),
        result = resp.result;

    _.map(result, function (item) {
        zonesList.push({
            id: item.id
        });
    });
    return zonesList;
};

function createMyJson(validElements) {
    var arrayList = [],
        resp = JSON.parse(validElements),
        result = resp.result;

    _.map(result, function (item) {
        arrayList.push({
            id: item.id,
            ip: item.configuration.value,
            mode: item.mode
        });
    });
    return arrayList;
};

module.exports = CloudFlareOFA;
