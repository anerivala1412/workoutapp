const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.category = require("./category.model");
db.SubCategory = require("./sub-category.model");

db.slide = require("./slide.model");
db.Session = require("./session.model");
db.Meal = require('./meal.model');
db.Trainer = require('./trainer.model')
db.Training = require('./training.model')

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;