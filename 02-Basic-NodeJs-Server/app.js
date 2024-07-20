const http = require('http');
// const https = require('https');
const port = 3000;

const server = http.createServer((req, res) => {
    res.write('Hello World!');
    res.end();
});

server.listen(port, (err) => err ? console.log(err) : console.log(`Listening on port ${port}`));