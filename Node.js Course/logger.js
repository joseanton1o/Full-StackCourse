const EventEmitter = require('events');
const uuid = require('uuid'); // create a standard format for id's

class Logger extends EventEmitter {
    log(msg) {
        // Call event
        this.emit('message', { id: uuid.v4(), msg }); // uuid.v4() creates a random id
    }
}

// module.exports = Logger;

const logger = new Logger();

logger.on('message', (data) => console.log('Called Listener:', data));

logger.log('Hello World'); // This calls log method which will emit message event 'message', data is formed by the id and msg (msg is the argument passed to log method)