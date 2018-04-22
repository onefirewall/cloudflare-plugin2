var CloudFlareOFA = require('./CloudFlareOFA.js'),
    api_url_zones = "https://api.cloudflare.com/client/v4/zones?page=1&per_page=1000&order=type&direction=asc",
    api_url = "https://api.cloudflare.com/client/v4/zones/",
    api_url_post_delete = "https://api.cloudflare.com/client/v4/user/firewall/access_rules/rules",
    x_auth_key = "globalkey",
    x_auth_email = "email",
    ip = "3.3.3.3",
    mode = "block",
    id = "id_to_delete_IP",
    addBlockIp = {"mode": mode, "configuration": {"target": "ip", "value": ip}, "notes": "Test OFA"},
    cloudflareOFA = new CloudFlareOFA(api_url_zones, api_url, api_url_post_delete, x_auth_key, x_auth_email, addBlockIp, id);

cloudflareOFA.getAllBlockedIPS(
   function callback (data) {
       console.log(JSON.stringify(data));
});

cloudflareOFA.setAllBlockedIPS(
    function callback (response) {
        console.log(JSON.stringify(response));
});

cloudflareOFA.deleteIPS(
   function callback (response) {
       console.log(JSON.stringify(response));
});
