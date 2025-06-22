//
//the require method can take in a path as an argument, or even the core modules(i.e in-built modules such as http, https, os, fs, path, etc)
const http = require('http');
//
//the createServer() method takes in a function, which in turns takes in two arguments, response and request arguments. Response and Request are objects that gives us the liberty to do whatever you want with the incoming requests, or response
//This callback function is called for every incoming request
const server = http.createServer((req, res) => {
  //
  //Accessing specific properties and methods of the request object
  console.log(req.url, req.method, req.headers);
  //
  //Quitting the server by shutting down the event loop manually
  //process.exit();
  //
  //In the setHeader() method, we state the type of the cotent, AND the that type explixitly as the second argument
  res.setHeader('Content-Type', 'text/html');
  //Manually speaking, we write the response body in chunks, as you can very well see. However, there's a better way of writting it
  res.write('<html>');
  res.write('<head><title>Node Response!</title></head>');
  res.write('<body><h1>My first Node Response...SUCCESS!</h1></body>');
  res.write('</html>');
  //
  //the end() is for saying that we've finished sending our requests, and there after we cannot change anything
  res.end();
});
//
//listen() method, as the name suggests, listens for any incoming requests..
//It optionally takes in a port number
server.listen(3000);
