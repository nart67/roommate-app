var io;
var sessionStore = require('./session').store;
var passportSocketIo = require('passport.socketio');
var User = require('../model/users').User;

const setio = function(_io) {
  io = _io;
}

 const defaultConnect = function() {
   if (!io) throw new Error('Set io before creating connections');
  io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
      console.log('message: ' + msg);
    });
  });
}

const namespaceConnect = function(namespace) {
  if (!io) throw new Error('Set io before creating connections');
  var nsp = io.of('/' + namespace);
  nsp.use(passportSocketIo.authorize({
    cookieParser: require('cookie-parser'),
    key: 'connect.sid',
    secret: 'keyboard cat',
    store: sessionStore,
    success: onAuthorizeSuccess(namespace),
    fail: onAuthorizeFail
  }))
  .on('connection', function(socket){
    console.log('a user connected');
    socket.on('chat message', function(msg){
      nsp.emit('chat message', msg);
      console.log('message: ' + msg);
    });
  });
}

function onAuthorizeSuccess(namespace) {

  return function(data, accept) {
    console.log('successful connection to socket.io');

    User.inGroup(data.user.id, namespace, function(err, inGroup) {
      if (err) accept(err);
      if (inGroup) accept();
      accept(new Error('Permission denied'));
    });
  }
}

function onAuthorizeFail(data, message, error, accept){
  if(error)
    throw new Error(message);
  console.log('failed connection to socket.io:', message);

  if(error)
    accept(new Error(message));
}

exports = module.exports = {
  setio,
  defaultConnect,
  namespaceConnect
}