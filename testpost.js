// We need this to build our post string
var querystring = require('querystring');
var http = require('http');
var fs = require('fs');

  // Build the post string from an object
  var post_data = querystring.stringify({
      "reqtype": "initpark"
  });

  // An object of options to indicate where to post to
  var post_options = {
      host: '192.168.1.110',
      // host: "localhost",
      json: true,
      port: '2116',
      path: '/compile',
      method: 'POST',
      data: post_data
  };

  // Set up the request
  var post_req = http.request(post_options, function(res) {
      // res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });
  });

  // post the data
  post_req.write(post_data);
  post_req.end();

  console.log('Executed');
