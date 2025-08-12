//
// Import a module for acccessing the file system, which will become handy in manipulating the file system as the requests keep coming
const fs = require('fs');
//
// So here we want to import our app.js file, and we do that by first defining a function that should behave the same as the callback function in the createServer() method..
// Seondly we have to export it so that it can become accessiblle outside this file...
// There are several ways for exporting modules in NodeJS, as shown below this file..
const requestHandler = (req, res) => {
  //
  // Now we wanna start routing requests, that is send a response based on the request that is sent
  // Store the url and the method properties in constants because we wanna use them
  const url = req.url;
  const method = req.method;
  //
  // Next, check if the url is '/', for which we'll send a specific response, otherwise send another response
  if (url === '/') {
    res.write('<html>');
    res.write("<head><title>When the url is '/'</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write('</html>');
    //
    // Use the return keyword when calling the end() method on the response object, so that if the condition on the if-block is true, the rest of this anonymous function wouldn't run
    return res.end();
  }
  //
  // Next, try to redirect the user back to the "/", instead of just running the rest of the code
  if (url === '/message' && method === 'POST') {
    //
    // Define a constant for storing our chunks, and parsing it later
    const body = [];
    //
    // In nodeJs, data flows in chunks, and these chunks keep flowing until the whole data is completed
    // Upon completion is where we can do whatever we want with the data, for example storing it in a file, as shown in the following example
    // We use the on() method as an event listener to listen for the 'data' event, which is the first argument of that method, then followed by the second argument which is the method (just like the addEventListener() method does) that should take place based on that data
    // the callback function, i.e the second argument, in turn takes an argument, which is a/the chunk
    // the on() method can listen to a couple of events such as error, close, data etc..
    req.on('data', (chunk) => {
      //
      // In the terminal, you see something like 'message=Jesus%21'.
      // We see message because the value of the name attribute in my html input field was message
      // Now, it's needful to understand that the form element in the html automatically sends a request, where it takes the input data, and puts them in the request object as key-value pairs, where the names assigned to the inputs are the keys, and the value are what the user enters
      console.log(chunk);
      body.push(chunk);
    });
    //
    // Upon the completion of the incoming chunks, we now have to listen to the 'end' event, and like the 'data' event, we have a second argument as a callback, which is for handling the chunks, typically in this case bringing them together
    // This function  for the 'end' listener, is only registered for the future, and therefore it is wise to create  and store the message(the parsed data) here...
    return req.on('end', () => {
      //
      // Create a new constant for buffering the data, meaning that we can do anything with the parsed data now
      // Now, as you can see, I'm using the concat method because I'm sure that the data/request that'll be coming is of type string, otherwise I'd handled it in another way
      // the Buffer is a globally available object in NodeJS, which will create a new buffer and add all the chunks from the body to it
      const parsedBody = Buffer.concat(body).toString();
      //
      // Now access the message, and in this scenario using the split method
      const message = parsedBody.split('=')[1];
      //
      // Then store the message in a separate file
      // the 'Sync' here stands for synchronous
      // there's normally writeFileSync() method, and wirteFile() method...
      // The first one is synchronous, meaning that it blocks the execution of the subsequent lines of code, until it creates the specified file.... therefore, this may not be the best option, especially when working with large codebase, and receiving many requests...
      // However, the second method, i.e writeFile() method, doesn't block the subsequent lines  of code...
      // Unlike the first method, i.e writeFileSync() method, this writeFile() method takes in a third argument as a callback function, which should execute once the writeFile() method is done creating the file
      // This callback function takes an error object as a parameter, that returns a NULL if no error occured, but if it does occur then inside the function you can handle it gracefully, like maybe informing the user that an error occured or however you choose...
      // Since the callback function is executed once the file has been created, in this scenario I've put the lines of code, i.e the response inside the callback function, because that's what I want in the end. Right?
      fs.writeFile('message.txt', message, (err) => {
        //
        // Set the status code to 302. 302 means redirection
        res.statusCode = 302;
        //
        // Set the headers for the response
        res.setHeader('Location', '/');
        //
        // End the response, and don't forget to return so that to avoid, if the condition is satisfied, to run the rest of the code in this anonymous code
        return res.end();
      });
    });
  }
  //
  //Accessing specific properties and methods of the request object
  // console.log(req.url, req.method, req.headers);
  //
  //Quitting the server by shutting down the event loop manually
  // process.exit();
  //
  //In the setHeader() method, we state the type of the content, AND then that type explixitly as the second argument
  res.setHeader('Content-Type', 'text/html');
  //
  // Manually speaking, we write the response body in chunks, as you can very well see.
  // However, there's a better way of writing it...which we'll explore this better way soon 🎉
  res.write('<html>');
  res.write('<head><title>Node Response!</title></head>');
  res.write('<body><h1>My first Node Response...SUCCESS!</h1></body>');
  res.write('</html>');
  //
  //the end() is for saying that we've finished sending our requests, and thereafter we cannot change anything
  // we must not change the response after we end it, because this is basically the part whre we'll send it back to the client
  res.end();
};
//THE FOLLOWING ARE WAYS OF EXPORTING MODULES IN NODEJS
//
// module is a global object available in nodeJS, that has the expors property for, well, exporting modules to other files....it can take values from a single value, to even an object with key-value pair
// module.exports = requestHandler;

// module.exports = {
//   handler: requestHandler,
//   text: 'Some hard coded text',
// };

// module.exports.handler = requestHandler;
// module.exports.text = 'Again some hard coded text';

exports.handler = requestHandler;
exports.text = 'Still some more text 😂';
