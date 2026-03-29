import {getAddressCoordinate, getAutoCompleteSuggestions, getDistanceTime} from "../services/maps.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validationResult } from "express-validator";

const getCoordinates = asyncHandler(async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ApiError(400, "Invalid input", errors.array());
    }

    const {address} = req.query;

    try {
        const coordinates = await getAddressCoordinate(address);
        return res.status(200).json(
            new ApiResponse(200, coordinates, "Success")
        )
    } catch (error) {
        throw new ApiError(404, "Coordinate NOT FOUND");
    }
})

const getDistanceTIME = asyncHandler(async(req, res, next) => {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({ errors : errors.array()});
        }

        const {origin, destination} = req.query;

        const distanceTime = await getDistanceTime(origin, destination);
        res.status(200).json(
            distanceTime
        )

    } catch (err) {
        console.log(err);
        throw new ApiError(500, "Internal Server Error")
    }
})

const getAutoCompleteSuggestion = asyncHandler(async(req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ApiError(400, "Invalid input", errors.array());
        }

        const { input } = req.query;

        const suggestions = await getAutoCompleteSuggestions(input);

        res.status(200).json(
            new ApiResponse(200, suggestions, 'successfully fetched suggestions')
        )
    } catch (err) {
        console.log(err)
        res.status(500).json({message : 'Internal Server error auto Suggestions'})
    }
})

export { getCoordinates, getDistanceTIME, getAutoCompleteSuggestion }