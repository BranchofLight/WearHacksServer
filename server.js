/**
 * Purpose: Main server code. Handles GET and POST requests.
 * Source:  server.js
 */

var http = require('http');
// var async = require("async");

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
      } else if (reqObj.reqtype === "carLeft") {
          console.log("Car has left");
          
          db.each("SELECT * from park_info WHERE PARKING_ID=" + reqObj.parkingID + " AND END_TIME IS NULL;", function(err, rows) {

            var endTime = new Date();

            var startTime = new Date(rows.START_TIME);
            var timeDiff = (endTime.getTime() - startTime.getTime())/1000;

            var chargeCalc = timeDiff * 1.53;

            endParkProximity(reqObj.parkingID, endTime.toLocaleString(), chargeCalc);

            res.end();

          });


      } else if (reqObj.reqtype === "endpark") {
          console.log("Returning for endpark");
          

          db.each("SELECT * from park_info WHERE USER_ID=" + reqObj.userID + " AND PARKING_ID=" + reqObj.parkingID + " GROUP BY END_TIME DES LIMIT 1;", function(err, rows) {
            
            res.end(JSON.stringify({
              "starttime": rows.START_TIME,
              "endtime:": rows.END_TIME,
              "parkingID": rows.PARKING_ID,
              "userID": rows.USER_ID,
              "price": rows.CHARGE
            }));

          });

      }

    });
  }
}).listen(port, hostname, function() {
  console.log("Server running at http://" + hostname + ":" + port);
});

function testMonkey(userID, parkingID){

  db.each("SELECT * from park_info WHERE USER_ID=" + userID + " AND PARKING_ID=" + parkingID + ";", function(err, rows) {
    rows.START_TIME;
  });

  var someValOne = getStartTime(userID, parkingID);
  var timeOne = new Date();
  var someTime = timeOne.toLocaleString();

  endPark(userID, parkingID, timeOne.toLocaleString(), 9.61);
  getAllPark();
  
  console.log("Start: " + someValOne);
  console.log("End: " + someTime);

  return timeOne.toLocaleString();
}
