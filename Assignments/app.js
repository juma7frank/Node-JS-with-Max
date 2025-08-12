//
// Import the http module for creating server
const http = require('http');
//
// Import custom routes module from the routes file
const routes = require('./routes');
//
// Create the server from the http module
const server = http.createServer(routes.handler);
//
// Listen for the incoming requests
server.listen(3000);
