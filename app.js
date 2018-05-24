var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');
var groups = require('./routes/groups');
var lists = require('./routes/task-lists');
var invites = require('./routes/invites');
var channels = require('./routes/channels');

var app = express();

// Connect to database
var db = require('./helper/database');

// Passport authentication setup
var passport = require('passport');
var { GoogleStrategy, FacebookStrategy } = require('./helper/passport');
passport.use(GoogleStrategy);
passport.use(FacebookStrategy);

// Configure Passport authenticated session persistence.
passport.serializeUser(function(user, cb) {
  cb(null, {id: user._id});
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
if (process.env.host != 'local') app.use(express.static(path.join(__dirname, 'build')));
// app.use(express.static(path.join(__dirname, 'public')));

// Use Mongo store for session information 
app.use(require('./helper/session').middleware);

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

var router = express.Router();
router.use('/users', users);
router.use('/auth', auth);
router.use('/groups', groups);
router.use('/lists', lists);
router.use('/invites', invites);
router.use('/channels', channels);
router.use('/checkAuth', require('connect-ensure-login').ensureLoggedIn(),
  function(req, res) {
    res.status(200).json({message: 'logged in'});
  });

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.use('/api', function nocache(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}, router);

if (process.env.host != 'local')
  app.get('/*', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
  });

// Temp testing stuff
app.get('/login',
  function(req, res){
    res.render('login');
  });

  app.get('/socket', function(req, res){
    res.sendFile(__dirname + '/public/socket.html');
  });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
