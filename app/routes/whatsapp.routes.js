require('dotenv').config();
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/whats-app-login', function(req, res, next) {
        var data = getTextMessageInput(process.env.RECIPIENT_WAID, 'Welcome to the Fitorobic!');

        sendMessage(data)
            .then(function(response) {
                res.redirect('/');
                res.sendStatus(200);
                return;
            })
            .catch(function(error) {
                console.log(error);
                console.log(error.response.data);
                res.sendStatus(500);
                return;
            });
    });

};