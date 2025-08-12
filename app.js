// NodeJS Core Modules:
// 1.http - a protocol for transferring data from the server to the user, and vice versa. It's helpful in launching servers, sending requests etc...
// 2.https - http + secure, is a protocol for transfaerring data that is secured, i.e encrypted/encoded
// 3.fs - for working with files
// 4.path - helps in constructing paths to files
// 5.os - helps with Operating Systems and giving relevant information
//
//the require method can take in a path as an argument, or even the core modules(i.e in-built modules such as http, https, os, fs, path, etc)
const http = require('http');
//
// We now have to import our routes so that we can use it in our createServer() method..
// Now, since the routes isn't a global module, we have to specify explicitly the path, therefore in this case we put the ./ before the name of the file
const routes = require('./routes');
//
// Testing the different exports method we have in nodeJS
console.log(routes.text);
//
//the createServer() method takes in a function, which in turns takes in two arguments, response and request arguments. Response and Request are objects that gives us the liberty to do whatever we want with the incoming requests, or response...
//This callback function is called for every incoming request, for every request that reaches our server
// Now, after moduling our code, and putting the routing logic in a different file, we have to pass that module in our creatServer() method, instead of explicitly putting the anonymous function here
const server = http.createServer(routes.handler);
//
//listen() method starts a process, where nodejs will not immediately exit our script but will instead keep the server running to listen for incoming requests
//
//listen() method, as the name suggests, listens for any incoming requests..
//It optionally takes a couple of argments, a port number is one of them
server.listen(3000);
