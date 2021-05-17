const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const sano =10;

const userSchema = mongoose.Schema({
    firsname: {
        type: String,
        required: [true, "Provide a username"],
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")){
        next();
    }
    const salt= await bcrypt.genSalt(sano);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

const User = mongoose.model("User", userSchema);

module.exports = User;