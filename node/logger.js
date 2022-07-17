const EventEmitter = require('events');

var url = 'http://mylogger.io/log';

class Logger extends EventEmitter{
    log(message){
        // Send http request
        console.log(message);
    
        // RAISING EVENT
        this.emit('messageLogged', {id: 1, url: 'http://'});
        this.emit('logging', {data: ''});
    }
}

module.exports = Logger;