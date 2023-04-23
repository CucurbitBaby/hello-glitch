const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('Hello World!');
  res.end();
});

server.listen(process.env.PORT || 3000, () => {
  console.log('demo-01 Server listening on port %d', server.address().port);
});