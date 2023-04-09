var request = require("request");

var options = { method: 'POST',
  url: 'https://dev-rqbvmubwc6xeogdn.us.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: '{"client_id":"7O9WIGI7cbbtghelMEcLCsnxiiiEgurH","client_secret":"RX_UAjqhtOFrog7IJ40sXRgAo57CTQuOdXCo_FLC_z9XtQjrxBZzFL2uIgwDbroT","audience":"http://localhost:3000","grant_type":"client_credentials"}' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  let obj = JSON.parse(body)
  console.log(body);
  console.log(obj.access_token);
});
