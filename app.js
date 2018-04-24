var CloudFlareOFA = require('./CloudFlareOFA.js')
//var api_url_zones = "https://api.cloudflare.com/client/v4/zones?page=1&per_page=1000&order=type&direction=asc"
//var api_url = "https://api.cloudflare.com/client/v4/zones/"
var x_auth_key = "xxx"
var x_auth_email = "xxx"

/*
var ip = "3.3.3.3"
var mode = "block"
var id = "id_to_delete_IP"
var zoneId = "zoneId"
var addBlockIp = {"mode": mode, "configuration": {"target": "ip", "value": ip}, "notes": "Test OFA"}
*/

var cloudflareOFA = new CloudFlareOFA(x_auth_key, x_auth_email)

var allEntries = []


cloudflareOFA.getAllZones( 
    function callback(zones){

        /*
        for(x=0; x<zones.length; x++){
            cloudflareOFA.getIPsPerZone(zones[x], function callback2(zoneID, returnArray){
                console.log(zoneID + ": " + returnArray.length)
            })
        }
        */
        //var aa="as"
        cloudflareOFA.getIPs_For_ALL_Zones(zones, function(returnArray){
            console.log(returnArray.length)
            console.log(aa)
        })
    }
)


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


/*
var action = {"mode": "whitelist", "configuration": {"target": "ip", "value": "95.110.157.223"}, "notes": "Test OFA"}

cloudflareOFA.addNewIP(action,
    function callback(response) {
        console.log(response);
    }
)
*/


/*
cloudflareOFA.deleteIP("dcad3d6b0cdd614b0d1d018e5647fb8e",
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