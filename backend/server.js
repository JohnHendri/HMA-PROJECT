require('./config/config');

const http = require('http');
const app = require('./app');

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(`server starter at port: ${process.env.PORT}`);
});
