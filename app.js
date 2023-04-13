const express = require("express");
const cors = require("cors");
const session = require('express-session');
const dbConfig = require("./app/config/db.config");
require('dotenv').config();
const passport = require('passport');
const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const customCss = fs.readFileSync((process.cwd() + "/swagger.css"), 'utf8');

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { customCss }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(session({

    resave: false,
    saveUninitialized: true,
    secret: 'SECRET'
}, {
    name: 'google-auth-session',
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
}));
// app.use(
//     cookieSession({
//         name: 'google-auth-session',
//         secret: "COOKIE_SECRET", // should use as secret environment variable
//         httpOnly: true
//     })
// );
app.use(passport.initialize());
app.use(passport.session());
const db = require("./app/models");
const Role = db.role;

db.mongoose
    .connect(`${process.env.DB_URL_DEVELOPEMENT}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB....");
        //  roleCedar();
    })
    .catch(err => {
        console.log({ err }, "error")
        console.error("Connection error", err);
        process.exit();
    });


// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/slide.routes")(app);
require("./app/routes/category.routes")(app);
require("./app/routes/sub-category.routes")(app);
require("./app/routes/session.routes")(app);
require("./app/routes/meal.routes")(app);
require("./app/routes/trainer.routes")(app);
require("./app/routes/training.routes")(app);
require("./app/routes/e-store.routes")(app);
require("./app/routes/activity.routes")(app);
require("./app/routes/experience.routes")(app);
require("./app/routes/whatsapp.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

function roleCedar() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "moderator"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'moderator' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}