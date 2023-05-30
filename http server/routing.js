const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Route handling
  if (req.url === '/') {
    // Handle the root route
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Hello, this is the homepage!');
  } else if (req.url === '/about') {
    // Handle the about route
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('This is the about page.');
  } else {
    // Handle 404 Not Found
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('404 Not Found');
  }
});

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
