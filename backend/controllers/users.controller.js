const { createToken } = require('../auth/jwt');
const usersModel = require('../models/users');
const bcrypt = require('bcrypt');
module.exports.loginUser = async (req, res, next) => {
    let {
        username,
        password
    } = req.body;

    username = username.trim();
    password = password.trim();

    if (!username || !password) {
        return res.status(400).json({
            message: "Username or password missing for login"
        })
    }

    try {
        let user = await usersModel.findOne({
            username
        })

        if(!user){
            return res.status(400).json({
                message: "Please enter correct username"
            })
        }

        let passwordMatched = bcrypt.compareSync(password, user.password); // true
        if(!passwordMatched){
            return res.status(400).json({
                message: "Incorrect password"
            })
        }   

        // If user has entered correct username and password
        // provide jwt to the user
        let token = createToken({
            username: user.username,
            email: user.email
        })

        res.status(200).json({
            message: "Login success",
            token,
            user: {
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error
        })
    }
}

module.exports.createUser = async (req, res, next) => {
    const {
        username,
        password,
        profileImage,
        email,
        address,
    } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: "Username or password missing"
        })
    }

    try {
        let user = await usersModel.create({
            username,
            password,
            profileImage: profileImage || "",
            email: email || "",
            address: address || "",
        })
        res.status(200).json({
            message: "User created successfully",
            status: 200,
            user: {
                username,
                profileImage,
                email
            }
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error
        })
    }

}