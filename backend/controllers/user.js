const bcrypt = require("bcrypt");
const User = require("../models/user");

exports.createUser = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const uuid = req.body.uuid;
    const isOAuth = req.body.isOAuth;

    if (!isOAuth) {
        var hashedPassword = bcrypt.hashSync(password, 10);
    }
    try {
        let user = new User({
            email: email,
            password: (isOAuth==false) ? hashedPassword : null,
            uuid: (isOAuth==true) ? uuid : null,
            isOAuth: isOAuth,
        });
        user.save();
        
        res.status(201).json({
            status: "success",
            message: "User created successfuly",
        });
    }
    catch(err) {
        res.status(409).json({
            status: "error",
            message: err.message,
        })
    }
};