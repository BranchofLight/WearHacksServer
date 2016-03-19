var http = require('http');

var hostname = '192.168.1.100';
var port = 2116;

http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  if (req.method === "GET") {
    if (req.url === '/currtime') {
      var time = time.toLocaleString();
      res.end("The time is: " + time + '\n');
    }
  }

  if (req.method === "POST") {
    console.log('POST Request Received');
    req.on('data', function(data) {
      console.log('POST Request Data Received: ' + data);
      var time = time.toLocaleString();
      res.end("The time is: " + time + "\n");
    });
  }
}).listen(port, hostname, function() {
  console.log("Server running at http://" + hostname + ":" + port);
});
