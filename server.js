var http = require('http');

var hostname = '192.168.1.10';
var port = 2116;

http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (req.method === "GET") {
    console.log('GET Request Received');
    if (req.url === '/currtime') {
      var time = time.toLocaleString();
      res.end("The time is: " + time + '\n');
    }
  }

  if (req.method === "POST") {
    console.log('POST Request Received');
    req.on('data', function(data) {
      var time = new Date();
      console.log('POST Request Data Received: ' + data);

      var reqObj = JSON.parse(data);
      var resObj = {};

      if (reqObj.reqtype === "initpark") {
        res.end(time.toLocaleString());
      } else if (reqObj.reqtype === "endpark") {
        resObj = {
          "timestamp": time.toLocaleString(),
          "price": 4.20
        };

        res.end(resObj);
      }
    });
  }
}).listen(port, hostname, function() {
  console.log("Server running at http://" + hostname + ":" + port);
});
