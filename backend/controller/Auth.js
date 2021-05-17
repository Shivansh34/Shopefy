const User = require('../models/User');
const bcrypt = require('bcryptjs')


exports.register = async (req,res,next) =>{
    const {firstname,lastname,email,password}= req.body;
    try {
        const user = await User.create({
            firstname:firstname,
            lastname:lastname,
            email:email,
            password:password,
        });
        res.status(201).json({
            success:true,
            user: user,
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

exports.login = (req,res,next) =>{
    res.send("Login Route");
};

exports.forgotpassword = (req,res,next) =>{
    res.send("Register Route");
}

exports.resetpassword =(req,res,next) =>{
    res.send("Reset Password Route");
}

