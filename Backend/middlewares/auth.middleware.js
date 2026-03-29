import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { userModel } from "../models/user.model.js"
import { CaptainModel } from "../models/captain.model.js";
import { BlacklistToken} from "../models/blacklistToken.model.js"

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        // const authHeader = req.headers.authorization;

        // if (!authHeader || !authHeader.startsWith("Bearer ")) {
        //     throw new ApiError(401, "Unauthorized request - No token");
        // }

        // const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
        // const token =
        //     req.cookies?.token ||
        //     (authHeader && authHeader.startsWith("Bearer ")
        //         ? authHeader.replace("Bearer ", "")
        //         : null);

        if(!token) {
            throw new ApiError(401, "No access token provided")
        }

        const isBlackListed = await BlacklistToken.findOne({ token : token });

        if(isBlackListed) {
            throw new ApiError(401, "Unauthorized access")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await userModel.findById(decodedToken._id).select("-password")

        if(!user) {
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user;
        next();
    } catch (error) {
        console.log("JWT VERIFY ERROR:", error.message);
        throw new ApiError(401, "Invalid Access Token");
    }
})

export const verifycaptainJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

        if(!token) {
            throw new ApiError(401, "Unauthorizeed request")
        }

        const isBlackListed = await BlacklistToken.findOne({ token : token });
        console.log(isBlackListed)

        if(isBlackListed) {
            throw new ApiError(401, "Unauthorized access")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const captain = await CaptainModel.findById(decodedToken._id).select("-password")

        if(!captain) {
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.captain = captain;
        next();
    } catch (error) {
        throw new ApiError(402, "Invalid Access Token")
    }
})