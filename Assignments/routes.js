//
// Begin the routing logic by defining a function for it
const requestHandler = (req, res) => {
  //
  // Store the url & the method properties in a constant for routing purposes
  const url = req.url;
  //
  // On url "/", return a dummy greeting text
  if (url === '/') {
    //
    // Set a header to tell the browser that I'll send a html code
    res.setHeader('context-type', 'text/html');

    //
    // Display the dummy greet on the screen
    res.write('<html>');
    res.write('<head>');
    res.write('<title>Dummy Greet</title>');
    res.write('</head>');
    res.write('<body>');
    res.write('<h1>Hello there</h1>');
    res.write(
      '<form action="/create-user" method="POST"><input type="text" name="username><button type="submit">Send</button></form>'
    );
    res.write('</body>');
    res.write('</html>');
    //
    // end the response process, meaning that we can't do anything after it, and use the return keyword so that the other logic in this code wouldn't run if the condition on the if-block is true
    res.end();
  }
  //
  // On url "/message" return a html list
  if (url === '/users') {
    //
    // Display the dummy html list
    res.write('<html>');
    res.write('<head>');
    res.write('<title>Dummy List</title>');
    res.write('</head>');
    res.write(
      '<body><ul><li>User1</li><li>User2</li><li>User3</li><li>User4</li><li>User5</li></ul></body>'
    );
    res.write('</html>');
    //
    // End the process by calling the end() method
    res.end();
  }
  //
  // Add the "/create-user" route and parse the incoming data, then logging it to the console thereafter
  if (url === '/create-user') {
    //
    // Sending some html code for testing purpoes!
    res.write('<html>');
    res.write('<head><title>Create User Page!</title></head>');
    res.write('<body><h1>Hello, welcome to the Create User Page!</h1></body>');
    res.write('</html>');
    //
    // Define an array for storing the chunks
    const body = [];
    //
    // Listen to the 'data' event, and parse the incoming data
    req.on('data', (chunk) => {
      //
      // Log to the console the chunks for debugging purposes
      console.log(chunk);
      body.push(chunk);
    });
    //
    // Upon receiving all the chunks of data, listen to the 'end' event, and do something with the buffer of those chunks of data
    req.on('end', () => {
      //
      // Create a constant for storing buffering the chunks of those data
      const parsedData = Buffer.concat(body).toString();
      console.log(parsedData.split('=')[1]);
    });
    //
    // Set the status code for redirection, i.e 302
    res.statusCode = 302;
    //
    // Set the header to tell the browser where to redirect to
    // res.setHeader('Location', '/');
    //
    // End the response process
    res.end();
  }
};
//
// Export the requestHandler() method to be accessed outside this file
exports.handler = requestHandler;
