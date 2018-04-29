// Use Mongo store for session information
const session = require('express-session');
const connection = require('mongoose').connection;
const MongoStore = require('connect-mongo')(session);
const store = new MongoStore({ mongooseConnection: connection })
 
const middleware = session({
    secret: 'keyboard cat', 
    resave: true, 
    saveUninitialized: true,
    store: store
});

exports = module.exports = {
    middleware,
    store
}