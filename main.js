/**
 * Purpose: Main server code. Handles GET and POST requests.
 * Source:  server.js
 */

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
		BEACON_ID int,
		USER_ID int,
		CHARGE float
=============================**/

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('parkDB.db');
var check;

db.serialize(function() {
	db.run("CREATE TABLE if not exists park_info (AUTO_ID INTEGER PRIMARY KEY AUTOINCREMENT, START_TIME datetime, END_TIME datetime, BEACON_ID int, USER_ID int, CHARGE float)");
});

/**=============================
		INSERT QUERIES
=============================**/
// Inserts an entry into the park_info table
var initPark = function(userID, beaconID, startTime){
 	db.run("INSERT INTO park_info (START_TIME, END_TIME, BEACON_ID, USER_ID, CHARGE) VALUES ('"+ startTime +"', NULL, " + beaconID + "," + userID + ", 0.0)");
}

/**=============================
		UPDATE QUERIES
=============================**/
// Updates the entry of the park_info table with the end time and the charge amount
var endPark = function(userID, beaconID, endTime, charge){
	db.run("UPDATE park_info SET END_TIME='"+ endTime +"', CHARGE="+ charge +" WHERE USER_ID="+ userID + " AND BEACON_ID="+ beaconID +" AND END_TIME IS NULL;")
}

/**=============================
		SELECT QUERIES
=============================**/
// Fetches all entries from the park_info table
var getAllPark = function(){
	db.all("SELECT * from park_info",function(err,rows){
		console.log(rows);
	});
}

// Fetches the entry start time from the park_info table
var getStartTime = function(userID, beaconID){
	db.all("SELECT START_TIME from park_info WHERE USER_ID="+ userID +" AND BEACON_ID="+ beaconID ,function(err,rows){
		console.log(rows);
	});
}

db.close();
