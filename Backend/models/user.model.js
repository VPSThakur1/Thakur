import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({
    fullName : {
        firstName : {
            type : String,
            required : true,
            minlength : [2, 'First name must be at least 2 characters long'],
        },
        lastName : {
            type : String,
            minlength : [2, 'First name must be at least 2 characters long'],
        }
    },
    email : {
        type : String,
        required : true,
        unique : true,
        minlength: [6, 'email must be at least 6 characters long']
    },
    password : {
        type : String,
        required : true,
        select : false,
    }, 
    socketId : {
        type : String,
    }
}, {timestamps : true})


userSchema.methods.isPasswordCompare = async function(password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id : this._id,
    }, 
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    })
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id : this.id,
    }, 
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    })
}

export const userModel = mongoose.model("User", userSchema)