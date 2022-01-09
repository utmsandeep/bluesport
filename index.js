const app = require('./app');
const http = require('http');

const server = http.createServer(app);

const { APP_PORT } = process.env;
const port = process.env.PORT || APP_PORT;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
