const Logger = require('./logger.js');
const path = require('path');
const os = require('os');
const fs = require('fs');
const EventEmitter = require('events');
const http = require('http');

const logger = new Logger();

// logger.log('message');

// var pathObj = path.parse(__filename);
// console.log(pathObj);

// var totalMem = os.totalmem();
// var freeMem = os.freemem();
// var cpus = os.cpus();

// console.log(`Total Mem: ${totalMem}`);
// console.log(`Free Mem: ${freeMem}`);
// console.log(`Total CPUs: ${cpus}`);

// fs.readdir('./', function(err, files){
//     if (err)
//         console.log('Error', err);
//     else    
//         console.log('Result', files);
// })

// CALLING EVENT
// emitter.on('messageLogged', function(arg){
//     console.log('Listener Called', arg);
// });

// logger.on('messageLogged', (arg) => {
//     console.log('Listener Called', arg);
// });

// logger.on('logging', (arg) => {
//     console.log('Logging listener called', arg)
// });

// logger.log('message');

// // RAISING EVENT
// emitter.emit('messageLogged', {id: 1, url: 'http://'});
// emitter.emit('logging', {data: ''});

const server = http.createServer((req, res) => {
    if (req.url === '/'){
        res.write('Hello World');
        res.end();
    }

    if (req.url === '/api/courses'){
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
});

// server.on('connection', (socket) => {
//     console.log('New Connection');
// });
server.listen(3000);

console.log('Listening on PORT 3000...');