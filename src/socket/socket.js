const io = require('socket.io-client');

const socket = io();

socket.on('reconnecting', (attemptNumber) => {
    console.log('reconnecting: ' + attemptNumber);
});
socket.on( 'disconnect', function () {
    console.log( 'disconnected from server' );
} );
socket.on( 'connect_timeout', function () {
    console.log( 'connection timeout');
});
socket.on( 'connect_error', function (error) {
    console.log( 'connection error: ' + error);
});
socket.on('connect', function() {
    socket.emit('subscribe', 'roomTwo');
})

export default socket;