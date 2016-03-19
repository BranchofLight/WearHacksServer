var http = require('http');

var hostname = '192.168.1.100';
var port = 2116;
var time = new Date();

http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  if (req.method === "GET") {
    if (req.url === '/currtime') {
      time = time.toLocaleString();
      res.write("The time is: " + time + '\n');
    }
  }

  if (req.method === "POST") {
    console.log('POST Req Received');

    // var requestBody = '';
    req.on('data', function(data) {
      // requestBody += data;

      console.log('POST Req2 Received');
      console.log("Data: " + data);
      time = time.toLocaleString();
      res.end("The time is: " + time + "\n");
    });
  }

  // res.end("Finish.\n");
}).listen(port, hostname, function() {
  console.log("Server running at http://" + hostname + ":" + port);
});
