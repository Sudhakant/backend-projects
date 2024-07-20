const http = require('http');
// const https = require('https');
const fs = require('fs');
const port = 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile('index.html', (error, data) => {
        if(error){
            res.writeHead(404);
            res.write('Error: File not found');
        } else {
            res.write(data);
        }
        res.end();
    })
    // res.write('Hello World!');
    // res.end();
});

server.listen(port, (err) => err ? console.log(err) : console.log(`Listening on port ${port}`));