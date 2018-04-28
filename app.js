var CloudFlareOFA = require('./CloudFlareOFA.js')
//var api_url_zones = "https://api.cloudflare.com/client/v4/zones?page=1&per_page=1000&order=type&direction=asc"
//var api_url = "https://api.cloudflare.com/client/v4/zones/"
var x_auth_key = ""
var x_auth_email = ""

/*
var ip = "3.3.3.3"
var mode = "block"
var id = "id_to_delete_IP"
var zoneId = "zoneId"
var addBlockIp = {"mode": mode, "configuration": {"target": "ip", "value": ip}, "notes": "Test OFA"}
*/

var cloudflareOFA = new CloudFlareOFA(x_auth_key, x_auth_email)

var allEntries = []

/*
cloudflareOFA.getAllZones( 
    function callback(zones){

        cloudflareOFA.getIPs_For_ALL_Zones(zones, function(returnArray){
            console.log(returnArray.length)
            console.log(aa)
        })
    }
)
*/

/*
cloudflareOFA.getParentIPs(function callback2(returnArray){
    returnArray.forEach(element => {
        allEntries.push(element)
    });
    //console.log("Parent IPs: " + returnArray.length)
    console.log("IN: " + allEntries.length)
    //console.log(returnArray)
})
*/
console.log("OUT: " + allEntries.length)



var action = {"mode": "block", "configuration": {"target": "ip", "value": "162.158.154.236"}, "notes": "Test OFA"}

cloudflareOFA.sync_addNewIP(action)

/*
cloudflareOFA.addNewIP(action,
    function callback(response, id) {
        console.log(response, id);
    }
)
*/


/*
cloudflareOFA.deleteIP("a5c3025486b6e8aa03098b7b102734de",
    function callback (response) {
        console.log(response);
    }
)
*/

/*
cloudflareOFA.deleteIPInZone("dcad3d6b0cdd614b0d1d018e5647fb8e","1063c2c1226c35ceeb448cd0319b8e6e",
    function callback (response) {
        console.log(response);
    }
)
*/