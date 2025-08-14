const http = require('http');
const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === '/') {
    res.setHeader('content-type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Prayer Request</title></head>');
    res.write(
      '<body><form action="/send-prayer" method="post"><textarea name="prayer"></textarea><button type="submit">Submit Prayer</button></form></body>'
    );
    res.write('</html>');
    res.end();
  }
  if (url === '/send-prayer') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody.split('=')[1]);
    });
  }
});
