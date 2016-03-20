// We need this to build our post string
var querystring = require('querystring');
var http = require('http');
var fs = require('fs');

var carPresent = false;

// Build the post string from an object
var post_data = JSON.stringify({
	"reqtype":"carLeft",
	"parkingID":"7",
});

// An object of options to indicate where to post to
var post_options = {
    host: '192.168.1.110',
    port: '2116',
    path: '/compile',
    method: 'POST',
    data: 'tst',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(post_data)
    }
};



var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("COM10", {
  baudrate: 9600
}, false);
 
serialPort.open(function (error) {
  if ( error ) {
    console.log('failed to open: '+error);
  } else {
    console.log('open');

    serialPort.on('data', function(data) {
		// console.log('data received: ' + data);

		if(data == 1){
			console.log("Car has arrived.");
		}

		if(data == 0){
			console.log("Car has left.");
			// post the data

			// Set up the request
			var post_req = http.request(post_options, function(res) {
			    res.setEncoding('utf8');
			    res.on('data', function (chunk) {
			        console.log('Response: ' + chunk);
			    });
			});

			post_req.write(post_data);
			post_req.end();

			console.log("POSTED DATA.");

		}
    });

    // serialPort.write("ls\n", function(err, results) {
    //   // console.log('err ' + err);
    //   // console.log('results ' + results);
    // });
  }
});


console.log('Executed');
 
