import { userModel } from "../models/user.model.js";
import { createUser } from "../services/user.service.js"
import { validationResult } from "express-validator"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { BlacklistToken } from "../models/blacklistToken.model.js"

const registerUser = asyncHandler(async(req, res, next) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        return res.status(400).json({errors : errors.array() });
        // throw new ApiError(400, "error");
    }
    
    const {fullName, email, password} = req.body;
    const isUserAlreadyExisted = await userModel.findOne({ email });
    
        if(isUserAlreadyExisted) {
            throw new ApiError(400, "User Already existed")
        }

    console.log(req.body)


    const hashedPassword = await userModel.hashPassword(password);

    const user = await createUser({
        firstName : fullName.firstName,
        lastName : fullName.lastName,
        email,
        password: hashedPassword
    });

    const token = user.generateAccessToken();

    return res.status(201).json(
        new ApiResponse(201, {token, user}, "UserCreated Successfully")
    )
})

const loginUser = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        // return res.status(400).json({errors : errors.array() });
        throw new ApiError(400, errors.array()[0].msg);
    }

    const {email,password} = req.body;
    console.log("email :", req.body.email)

    const user = await userModel.findOne({ email }).select('+password');

    if(!user) {
        throw new ApiError(401, "Invalid Email or Password");
    }

    const isMatch = await user.isPasswordCompare(password)

    if(!isMatch) {
        throw new ApiError(402, "Invalid Email or PASSWORD");
    }

    const token = user.generateAccessToken();

    res.cookie('token', token) ;

    return res.status(200).json(
        new ApiResponse(200, {user, token }, "User Logged in successfully")
    )
})

const getUserProfile = asyncHandler(async (req, res, next) => {
    return res.status(201).json(
        new ApiResponse(200, req.user, "user")
    )
})

const logoutUser = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split?.(' ')[ 1 ];
    
    if (!token) {
        throw new ApiError(400, "Token not found");
    }

    await BlacklistToken.create({
        token,  
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // match JWT expiry
    })
    
    res.clearCookie('token');
    return res.status(201).json(
        new ApiResponse(201, `Logout out User`)
    )
})

export { registerUser, loginUser, getUserProfile, logoutUser }