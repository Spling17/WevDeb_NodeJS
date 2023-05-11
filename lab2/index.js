// Importing required modules
const http = require('http');
const router = require('./router');

// Setting up the server to listen on port 8000
const server = http.createServer(router);
server.listen(8000, () => {
  console.log('Server is listening on port 8000...');
});

// Importing required modules
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

// Function to handle requests
function router(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const query = parsedUrl.query;

  // Handling requests for the home page
  if (path === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Hello Node!</h1>');
    res.write('<a href="http://localhost:8000/read-message">Read Message</a><br>');
    res.write('<a href="http://localhost:8000/write-message">Write Message</a>');
    res.end();
  }
  
  // Handling requests for the read-message page
  else if (path === '/read-message') {
    fs.readFile('message.txt', (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<h1>404 Not Found</h1>');
        res.end();
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`<h1>Message:</h1><p>${data.toString()}</p>`);
        res.end();
      }
    });
  }

  // Handling requests for the write-message page
  else if (path === '/write-message') {
    if (req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(`
        <h1>Write a Message</h1>
        <form method="POST">
          <input type="text" name="message" required>
          <button type="submit">Submit</button>
        </form>
      `);
      res.end();
    } else if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        const message = querystring.parse(body).message;
        fs.writeFile('message.txt', message, err => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.write('<h1>500 Internal Server Error</h1>');
            res.end();
          } else {
            res.writeHead(302, { 'Location': 'http://localhost:8000/read-message' });
            res.end();
          }
        });
      });
    }
  }
  
  // Handling requests for other pages
  else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write('<h1>404 Not Found</h1>');
    res.end();
  }
}

// Exporting the router function
module.exports = router;