require('dotenv').config();
const {getTextMessageInput} = require('../middlewares/whatapp.service');
const {sendMessage} = require('../middlewares/whatapp.service');
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/whats-app-login', async function(req, res, next) {
        var data = await getTextMessageInput(process.env.RECIPIENT_WAID, 'Welcome to the Fitorobic!');

        sendMessage(data)
            .then(function(response) {
                // res.redirect('/');
                res.status(200).send(response.data);
                return ;
            })
            .catch(function(error) {
                console.log(error);
                console.log(error.response);
                res.sendStatus(500);
                return;
            });
    });

};