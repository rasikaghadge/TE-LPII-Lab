var http = require("http");
var url = require("url");

//create a server object:
http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    var q = url.parse(req.url, true).query;
    var txt = q.year + " " + q.month;
    res.write("Hello World!"); //write a response to the client
    res.end(txt); //end the response
  })
  .listen(8080); //the server object listens on port 8080
