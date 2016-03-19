// We need this to build our post string
var querystring = require('querystring');
var http = require('http');
var fs = require('fs');

  // Build the post string from an object
  var post_data = querystring.stringify({
      'compilation_level' : 'ADVANCED_OPTIMIZATIONS',
      'output_format': 'json',
      'output_info': 'compiled_code',
        'warning_level' : 'QUIET',
        'js_code' : 'somethig'
  });

  // An object of options to indicate where to post to
  var post_options = {
      host: '192.168.1.100',
      port: '2116',
      path: '/compile',
      method: 'POST',
      data: 'tst',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(post_data)
      }
  };

  // Set up the request
  var post_req = http.request(post_options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });
  });

  // post the data
  post_req.write(post_data);
  post_req.end();

  console.log('Executed');
