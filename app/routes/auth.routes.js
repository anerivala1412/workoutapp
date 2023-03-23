const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const passport = require("passport");
require('./../middlewares/passport');
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });


    app.get('/', (req, res) => {
        res.send("<button><a href='/auth'>Login With Google</a></button>")
    });

    // Auth 
    app.get('/auth', passport.authenticate('google', {
        scope: ['email', 'profile']
    }));

    // Auth Callback
    app.get('/auth/callback',
        passport.authenticate('google', {
            successRedirect: '/auth/callback/success',
            failureRedirect: '/auth/callback/failure'
        }));

    // Success 
    app.get('/auth/callback/success', (req, res) => {
        if (!req.user)
            res.redirect('/auth/callback/failure');
        res.send("Welcome " + req.user.email);
    });

    // failure
    app.get('/auth/callback/failure', (req, res) => {
        res.send("Error");
    })
    app.post(
        "/api/auth/signup", [
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted
        ],
        controller.signup
    );

    app.post("/api/auth/signin", controller.signin);

    app.post("/api/auth/signout", controller.signout);
};