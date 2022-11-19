const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt'); // Extract the token from the header
    opts.secretOrKey = config.secret;
    
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        // The arrow function is a callback function that is called when the user is found
        User.getUserById(jwt_payload.data._id, (err, user) => {
            if (err){
                return done(err, false);
            }
            if (user){
                return done(null,user);
            } else {
                return done(null,false);
            }
        });
    })); // jwt_payload is the decoded token
}