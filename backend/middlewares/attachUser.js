const User = require("../models/user");

const attachUser = (req, res, next) => {
    const uuid = req.body.uuid;

    User.findOne({ uuid: uuid }).then((user) => {
        req.user = user;
        next();
    });
}

module.exports = attachUser;