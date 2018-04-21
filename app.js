var CloudFlareOFA = require('./CloudFlareOFA.js'),
    api_url_zones = "https://api.cloudflare.com/client/v4/zones?page=1&per_page=1000&order=type&direction=asc",
    api_url_delete = "https://api.cloudflare.com/client/v4/user/subscriptions/",
    api_url = "https://api.cloudflare.com/client/v4/zones/",
    api_url_post = "https://api.cloudflare.com/client/v4/user/firewall/access_rules/rule",
    x_auth_key = "xxxx",
    x_auth_email = "xxxxx",
    ip = "3.3.3.3",
    mode = "block",
    id = "1afb8156a9c17f728c4ecb1c2d3e22a8",
    addBlockIp = {"mode": mode, "configuration": {"target": "ip", "value": ip}, "notes": "Test OFA"},
    cloudflareOFA = new CloudFlareOFA(api_url_zones, api_url, api_url_delete, api_url_post, x_auth_key, x_auth_email, addBlockIp, id);

cloudflareOFA.getAllZones(
    function callback (jsonArray) {
        console.log(JSON.stringify(jsonArray));
});

cloudflareOFA.getAllBlockedIPS(
    function callback (jsonArray) {
        console.log(JSON.stringify(jsonArray));
});

cloudflareOFA.setAllBlockedIPS(
    function callback (response) {
        console.log(JSON.stringify(response));
});

cloudflareOFA.deleteIPS(
    function callback (response) {
        console.log(JSON.stringify(response));
});
