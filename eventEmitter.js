const { EventEmitter } = require("events");

const eventEmitter = new EventEmitter();
console.log("event emitter called");

module.exports = eventEmitter;
