import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const captainSchema = new Schema ({
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
        lowercase : true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    password : {
        type : String,
        required : true,
        select : false,
    }, 
    socketId : {
        type : String,
    },
    status : {
        type : String,
        enum: [ 'active', 'inactive' ],
        default : 'inactive'
    },
    vehicle : {
        color : {
            type : String,
            required : true,
            minlength : [ 3 , 'Color must be at least 3 characters long'],
        },
        plate : {
            type : String,
            required : true,
            minlength : [ 5, "plate must be at least 5 characters long"]    
        },
        capacity : {
            type : Number,
            required : true,
            minlength : [2, "Capacity must be at least 1"],
        },
        vehicleType: {
            type : String,
            required : true,
            enum: [ 'car', 'motocycle', 'auto'],
        }
    },
    location : {
        ltd : {
            type : Number,
        },
        lng : {
            type : Number,
        }
    }
})

captainSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id : this._id,
    }, 
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    })
}

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

captainSchema.methods.isPasswordCompare = async function(password) {
    return await bcrypt.compare(password, this.password)
}

export const CaptainModel = mongoose.model("captain", captainSchema); 