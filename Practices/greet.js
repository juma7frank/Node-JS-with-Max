//
// Import the http core module for creating the server
const http = require('http');
//
// Create the server
const server = http.createServer((req, res) => {
  //
  // Store the response's url for the purposes of routing
  const url = req.url;
  //
  // Route a dummy greet text
  if (url === '/greet') {
    res.write('<html>');
    res.write('<head><title>Greet Text</title></head>');
    res.write(
      `<body><h1>Welcome, Juma<h1><p>Today is: ${new Date()}</p></body>`
    );
    res.write('</html>');
    //
    // End the response process
    res.end();
  }
  //
  // Rout for a random Bible verse from an array
  if (url === '/verse') {
    //
    // Define an array of 5 verses
    const arrayVerses = [];
  }
});
//
// Listen for the incoming request
server.listen(3000);
