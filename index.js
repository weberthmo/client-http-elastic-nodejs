var http = require('follow-redirects').http;
var fs = require('fs');

var options = {
  'method': 'POST',
  'hostname': 'localhost',
  'port': 9200,
  'path': '/teste_bulk/_bulk',
  'headers': {
//     'Authorization': 'Basic Og==',
    'Content-Type': 'application/json'
  },
  'maxRedirects': 20
};

var d = new Date().toISOString();

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

var postData =  `{ \"index\" : {} }\r\n{ \"timestamp\": "${d}", \"account\": \"testebr\", \"id\": 16, \"name\": \"Vale\"}\r\n{ \"index\" : {} }\r\n{ \"account\": \"testebr\", \"id\": 9, \"name\": \"Elo\"}\r\n{ \"index\" : {} }\r\n{ \"account\": \"testebr\", \"id\": 501, \"name\": \"teste Itaucard\"} \r\n{ \"index\" : {} }\r\n{ \"account\": \"colaboradores\", \"id\": 16, \"name\": \"Vale\"}\r\n{ \"index\" : {} }\r\n{ \"account\": \"colaboradores\", \"id\": 9, \"name\": \"Elo\"}\r\n`;

req.write(postData);

req.end();