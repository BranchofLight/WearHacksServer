var http = require('http');

var hostname = '192.168.1.110';
// var hostname = "localhost";
var port = 2116;

http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (req.method === "GET") {
    console.log('GET Request Received');
    if (req.url === '/currtime') {
      var time = new Date();
      time = time.toLocaleString();
      res.end("The time is: " + time + '\n');
    } else {
      res.end();
    }
  } else if (req.method === "POST") {
    console.log('POST Request Received');
    req.on('data', function(data) {
      var time = new Date();
      console.log('POST Request Data Received: ' + data);

      var reqObj = JSON.parse(data);
      var resObj = {};

      if (reqObj.reqtype === "initpark") {
        console.log("Returning for initpark");
        res.end(time.toLocaleString());
      } else if (reqObj.reqtype === "endpark") {
        console.log("Returning for endpark");
        res.end(JSON.stringify({
          "timestamp": time.toLocaleString(),
          "price": 9.61
        }));
      }
    });
  }
}).listen(port, hostname, function() {
  console.log("Server running at http://" + hostname + ":" + port);
});
