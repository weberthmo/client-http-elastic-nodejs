var http = require('follow-redirects').http;
var fs = require('fs');

var options = {
  'method': 'POST',
  'hostname': 'localhost',
  'port': 9200,
  'path': '/indice_samsung/_bulk',
  'headers': {
//     'Authorization': 'Basic Og==',
    'Content-Type': 'application/json'
  },
  'maxRedirects': 20
};

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

var postData =  "{ \"index\" : {} }\r\n{ \"account\": \"samsungbr\", \"id\": 16, \"name\": \"Vale\"}\r\n{ \"index\" : {} }\r\n{ \"account\": \"samsungbr\", \"id\": 9, \"name\": \"Elo\"}\r\n{ \"index\" : {} }\r\n{ \"account\": \"samsungbr\", \"id\": 501, \"name\": \"Samsung Itaucard\"} \r\n{ \"index\" : {} }\r\n{ \"account\": \"colaboradores\", \"id\": 16, \"name\": \"Vale\"}\r\n{ \"index\" : {} }\r\n{ \"account\": \"colaboradores\", \"id\": 9, \"name\": \"Elo\"}\r\n";

req.write(postData);

req.end();