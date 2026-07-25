const http = require('http');
const handler = require('./api/index');

const PORT = process.env.PORT || 3000;

// Adapt Vercel handler to native HTTP response
const server = http.createServer((req, res) => {
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.send = (body) => {
    res.end(body);
  };
  res.json = (obj) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(obj));
  };

  handler(req, res);
});

server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Zontal Arcade Server active on port ${PORT}`);
  console.log(`🎮 Game Portal:  http://localhost:${PORT}`);
  console.log(`📚 Documentation: http://localhost:${PORT}/docs`);
  console.log(`====================================================`);
});
