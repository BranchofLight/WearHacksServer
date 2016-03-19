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