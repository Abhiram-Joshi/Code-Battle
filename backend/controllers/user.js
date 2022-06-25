const bcrypt = require("bcrypt");
const User = require("../models/user");

exports.createUser = async (req, res) => {
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
            uuid: uuid,
            isOAuth: isOAuth,
        });
        
        await user.save();
        
        res.status(201).json({
            status: "success",
            message: "User created successfuly",
            data: {
                email: email,
            }
        });
    }
    catch(err) {
        res.status(409).json({
            status: "error",
            message: err.message,
            data: null,
        })
    }
};