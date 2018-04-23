var CloudFlareOFA = require('./CloudFlareOFA.js')
//var api_url_zones = "https://api.cloudflare.com/client/v4/zones?page=1&per_page=1000&order=type&direction=asc"
//var api_url = "https://api.cloudflare.com/client/v4/zones/"
var x_auth_key = "xx"
var x_auth_email = "xx"

/*
var ip = "3.3.3.3"
var mode = "block"
var id = "id_to_delete_IP"
var zoneId = "zoneId"
var addBlockIp = {"mode": mode, "configuration": {"target": "ip", "value": ip}, "notes": "Test OFA"}
*/

var cloudflareOFA = new CloudFlareOFA(x_auth_key, x_auth_email)

cloudflareOFA.getAllZones( 
    function callback(zones){

        for(x=0; x<zones.length; x++){
            cloudflareOFA.getIPsPerZone(zones[x], function callback2(zoneID, returnArray){
                console.log(zoneID + ": " + returnArray.length)
            })
        }


    }
)

cloudflareOFA.getParentIPs(function callback2(returnArray){
    console.log("Parent IPs: " + returnArray.length)
})

//https://api.cloudflare.com/client/v4/zones/1063c2c1226c35ceeb448cd0319b8e6e/firewall/access_rules/rules
//api_url + zoneId + '/firewall/access_rules/rules

/*
cloudflareOFA.getAllBlockedIPS(
   function callback (data) {
       console.log(JSON.stringify(data));
});
*/

/*
cloudflareOFA.setAllBlockedIPS(
    function callback (response) {
        console.log(JSON.stringify(response));
});

cloudflareOFA.deleteIPS(
    function callback (response) {
        console.log(JSON.stringify(response));
});
*/