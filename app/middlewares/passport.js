const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();

passport.serializeUser((user, done) => {
    done(null, user);
})
passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_END_CALLBACK, //fe url end point will be here
        passReqToCallback: true,
        profileFields: ['id', 'displayName', 'photos', 'email']
    },
    function(request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FB_END_CALLBACK, //fe url end point will be here
    passReqToCallback: true,
    profileFields: ['id', 'displayName', 'photos', 'email']
}, function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));