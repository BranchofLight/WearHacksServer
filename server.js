var http = require('http');

var hostname = 'localhost';
var port = 2116;

http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  if (req.method === "GET") {
    if (req.url === '/currtime') {
      var time = new Date();
      time = time.toLocaleString();
      res.write("The time is: " + time + '\n');
    }
  }

  if (req.method === "POST") {
    // var requestBody = '';
    res.on('data', function(data) {
      // requestBody += data;
      console.log(data);
      res.write("The time is: " + time + "\n");
    });
  }

  res.end("Finish.\n");
}).listen(port, hostname, function() {
  console.log("Server running at http://" + hostname + ":" + port);
});
