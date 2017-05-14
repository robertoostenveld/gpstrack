var express = require('express')
var request = require("request")
var app = express()

var TTN_ACCESSKEY = process.env.TTN_ACCESSKEY;
var PORT = 3009;

if (TTN_ACCESSKEY == undefined) {
  console.log('Error: run secret.sh first');
  process.exit();
};

app.use(express.static('public'))

app.get("/query", function(req, res) {
  request({
    url: 'https://gpstrack.data.thethingsnetwork.org/api/v2/query?last=3d',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'key ' + TTN_ACCESSKEY
    },
    json: true
  }, function (error, response, body) {

    if (!error && response.statusCode === 200) {
      res.status(200).json(body);
    }
  });
});

app.listen(PORT, function () {
  console.log('Listening on port '+PORT);
})
