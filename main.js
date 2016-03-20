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

/**
 * Purpose: Handles the database functionality.
 * Source:  parkDB.js
 */

/**=============================
	Init connections to database
	DBName: parkDB.db
	TableName: park_info
	Schema:
		AUTOID INTERGER PK,
		START_TIME datetime,
		END_TIME datetime,
		PARKING_ID int,
		USER_ID int,
		CHARGE float
=============================**/

var sqlite3 = require('sqlite3');//.verbose();
var db = new sqlite3.Database('parkDB.db');
var check;

db.serialize(function() {
	db.run("CREATE TABLE if not exists park_info (AUTO_ID INTEGER PRIMARY KEY AUTOINCREMENT, START_TIME datetime, END_TIME datetime, PARKING_ID int, USER_ID int, CHARGE float)");
});

/**=============================
		INSERT QUERIES
=============================**/
// Inserts an entry into the park_info table
var initPark = function(userID, parkingID, startTime) {
 	db.run("INSERT INTO park_info (START_TIME, END_TIME, PARKING_ID, USER_ID, CHARGE) VALUES ('"+ startTime +"', NULL, " + parkingID + "," + userID + ", 0.0)");
};

/**=============================
		UPDATE QUERIES
=============================**/
// Updates the entry of the park_info table with the end time and the charge amount
var endPark = function(userID, parkingID, endTime, charge) {
	db.run("UPDATE park_info SET END_TIME='"+ endTime +"', CHARGE="+ charge +" WHERE USER_ID="+ userID + " AND PARKING_ID="+ parkingID +" AND END_TIME IS NULL;");
};

/**=============================
		SELECT QUERIES
=============================**/
// Fetches all entries from the park_info table
var getAllPark = function() {
	db.all("SELECT * from park_info", function(err,rows) {
		console.log(rows);
	});
};

// Fetches the entry start time from the park_info table
var getStartTime = function(userID, parkingID) {
	var val = {};
	db.get("SELECT * from park_info WHERE USER_ID=" + userID + " AND PARKING_ID=" + parkingID + ";", [], function(err, row) {
		val = row;
		console.log("row: " + row);
	});
	console.log(val);
	console.log("v: " + val);
	console.log("v.start: " + val.START_TIME);
	console.log("Returning val: " + val.START_TIME);
	return val.START_TIME;
};
