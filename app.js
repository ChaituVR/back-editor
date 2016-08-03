var http = require('http'),
    httpProxy = require('http-proxy');
//
// Create your proxy server and set the target in the options.
//
//httpProxy.createProxyServer({target:'http://localhost:9001'}).listen(8000); // See (†)

var proxy_web = new httpProxy.createProxyServer({
        target: {
            host: 'localhost',
            port: 8080
        }
    }).listen(8000);

    var proxy_api = new httpProxy.createProxyServer({
        target: {
            host: 'localhost',
            port: 8081
        }
    });
//
// Create your target server
//
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('request successfully proxied!' + '\n' + JSON.stringify(req.headers, true, 2));
  res.end();
}).listen(8081);

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('request successfully proxied!' + '\n' + JSON.stringify(req.headers, true, 2));
  res.end();
}).listen(8080);
