const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const cors = require('cors'); // Allows to make a request to our API from a different domain name
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const session = require('express-session');

mongoose.connect(config.database);

// On Connection
mongoose.connection.on("connected", () => {
    console.log("Connected to database " + config.database);
});
// On Error
mongoose.connection.on("error", (err) => {
    console.log("Database error: " + error);
});

const app = express();

const users = require('./routes/users');

// Port Number
const port = process.env.PORT || 8080;

// CORS Middleware
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(bodyParser.json());

// https://github.com/hoangvvo comment in https://github.com/hoangvvo/next-connect/issues/195
// After reading the comment I decided to use express-session as said in the following link, this solved the issue
// https://www.npmjs.com/package/express-session
app.use(session({ secret: "yoursecret", resave: true, saveUninitialized: true }));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


require('./config/passport')(passport);

app.use('/users', users);

// Index Route 
app.get('/', (req, res) => {
    res.send('Invalid endpoint');
    // Not gonna be used in backend
});

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


// Start Server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});