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

    //For BackendCheck of social logins
    app.get('/', (req, res) => {
        res.send("<button><a href='/auth/google'>Login With Google</a></button><button><a href='/auth/facebook'>Login With Facebook</a></button>")

    });

    //social login via facebook
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['public_profile', 'email', ]
    }));

    //callback of facebook hook
    app.get('/auth/callback/fb',
        passport.authenticate('facebook', {
            successRedirect: '/auth/callback/success',
            failureRedirect: '/auth/callback/failure'
        }));

    //social login via google
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['email', 'profile']
    }));

    //callback of google hook
    app.get('/auth/callback/google',
        passport.authenticate('google', {
            successRedirect: '/auth/callback/success',
            failureRedirect: '/auth/callback/failure'
        }));

    // Success of Social login
    app.get('/auth/callback/success', (req, res) => {
        if (!req.user)
            res.redirect('/auth/callback/failure');
        controller.socialSignIn(req.user)
        res.send("Welcome " + JSON.stringify(req.user));
    });

    // failure of Social login
    app.get('/auth/callback/failure', (req, res) => {
        res.send("Error");
    })

    // Manually SignUp
    app.post(
        "/api/auth/signup", [
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted
        ],
        controller.signup
    );


    // Manually SignIn
    app.post("/api/auth/signin", controller.signin);

    app.post("/api/auth/signout", controller.signout);
};