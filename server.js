/**
 * Purpose: Main server code. Handles GET and POST requests.
 * Source:  server.js
 */

var http = require('http');
var async = require("async");

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
    var start = {};

    console.log('POST Request Received');
    req.on('data', function(data) {
      console.log('POST Request Data Received: ' + data);

      var reqObj = JSON.parse(data);
      var resObj = {};

      var time = {};

      if (reqObj.reqtype === "initpark") {
        console.log("Returning for initpark");
        time = new Date();
        start = new Date(time);
        initPark(reqObj.userID, reqObj.parkingID, time.toLocaleString());
        getAllPark();
        res.end(time.toLocaleString());
      } else if (reqObj.reqtype === "endpark") {
        console.log("Returning for endpark");
        console.log("Start: " + getStartTime(reqObj.userID, reqObj.parkingID));
        time = new Date();
        console.log("End: " + time.toLocaleString());

        endPark(reqObj.userID, reqObj.parkingID, time.toLocaleString(), 9.61);
        getAllPark();
        res.end(JSON.stringify({
          "timestamp": time.toLocaleString(),
          "price": 9.61
        }));



        // async.series([
        //   function() {
        //     val = getStartTime(reqObj.userID, reqObj.parkingID);
        //     console.log("First val: " + val);
        //   },
        //   function() {
        //     console.log("Val: " + val);
        //     if (val.length > 0) {
        //       val = val[0].START_TIME;
        //     }
        //     console.log("Past date: " + val);
        //     getAllPark();
        //     console.log("Past date milli: " + Date.parse(val));
        //     var cost = Date.parse(time.toLocaleString()) - Date.parse(val);
        //     console.log("Cost: " + cost);
        //     console.log("Difference: " + (new Date(cost)));
        //   },
        //   function() {
        //     endPark(reqObj.userID, reqObj.parkingID, time.toLocaleString(), 99);
        //     getAllPark();
        //     res.end(JSON.stringify({
        //       "timestamp": time.toLocaleString(),
        //       "price": 9.61
        //     }));
        //   }
        // ]);




      }
    });
  }
}).listen(port, hostname, function() {
  console.log("Server running at http://" + hostname + ":" + port);
});
