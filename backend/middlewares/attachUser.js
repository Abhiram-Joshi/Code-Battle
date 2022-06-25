const User = require("../models/user");

const attachUser = (req, res, next) => {
    const email = req.body.email;

    User.findOne({ email: email }).then((user) => {
        req.user = user;
        next();
    });
}

module.exports = attachUser;