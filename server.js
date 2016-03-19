var http = require('http');

var hostname = 'localhost';
var port = 2116;

http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  if (req.method === "GET") {
    if (req.url === '/currtime') {
      var time = new Date();
      time = time.getDate();
      res.write("THE TIME IS: " + time + '\n');
    }
  }

  res.end("Finish.\n");
}).listen(port, hostname, function() {
  console.log("Server running at http://" + hostname + ":" + port);
});
