var io;
var sessionStore = require('./session').store;
var passportSocketIo = require('passport.socketio');
var User = require('../model/users').User;
var Group = require('../model/groups').Group;
var Message = require('../model/messages').Message;

const initialize = function(server) {
  io = require('socket.io')(server);
  createDefault();
}

const createDefault = function() {
  if (!io) throw new Error('Set io before creating connections');
  io.use(passportSocketIo.authorize({
    cookieParser: require('cookie-parser'),
    key: 'connect.sid',
    secret: 'keyboard cat',
    store: sessionStore,
    success: onAuthorizeSuccess,
    fail: onAuthorizeFail
  }))
  .on('connection', function(socket){
    console.log('a user connected');
    socket.on('sys message', function(msg){
      console.log(socket.request.user);
      io.emit('sys message', msg);
      console.log('message: ' + msg);
    });

    socket.on('send', function(data) {
      const room = 'chat/' + data.room;
      console.log('message: ' + data.message);
      if (socket.rooms[room]) {
        socket.to(room).emit('chat message', data);
        const promise = Message.create({
          message: data.message,
          user: socket.request.user.id,
          channel: data.room
        });
        promise.then()
        .catch((e) => console.log(e));
      }
      else socket.emit('sys message', 'Not in room');
    });

    socket.on('subscribe', function(room) { 
      authenticateRoom(socket.request.user, room, socket);
    });

    socket.on('unsubscribe', function(room) {  
      console.log('leaving room', room);
      socket.leave(room); 
    });

    socket.on('join chat', function(room) {
      console.log('joining chat', room);
      socket.join('chat/' + room);
    });

    socket.on('leave chat', function(room) {
      console.log('leaving chat', room);
      socket.leave('chat/' + room);
    });
  });
}

const authenticateRoom = function(user, room, socket) {
  User.inGroup(user.id, room, function(err, inGroup) {
    if (err || !inGroup) socket.emit('connect_error', 'Not authorized');
    else {
      console.log('joining room', room);
      socket.join(room);
      socket.emit('sys message', 'joined ' + room);
    }
  });
}

const onAuthorizeSuccess = function(data, accept) {
  console.log('successful connection to socket.io');

  accept();
}

const onAuthorizeFail = function(data, message, error, accept){
  console.log('failed connection to socket.io:', message);

  if(error)
    accept(new Error(message));
}

const emit = function(room, event, data, socket) {
  if (socket && io.sockets.connected[socket]) {
    socket = io.sockets.connected[socket];
    socket.to(room).emit(event, data);
  } else {
    io.sockets.in(room).emit(event, data);
  }
}

exports = module.exports = {
  initialize,
  emit
}