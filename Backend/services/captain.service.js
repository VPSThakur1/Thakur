import { CaptainModel } from "../models/captain.model.js"
import { ApiError } from "../utils/ApiError.js"

const createCaptain = async ({ fullName, email, password, vehicle }) => {

    if (!fullName?.firstName || !email || !password ||!vehicle?.color || !vehicle?.plate || !vehicle?.capacity || !vehicle?.vehicleType) {
        throw new ApiError(400, "All fields are required")
    }

    const captain = await CaptainModel.create({
        fullName: {
            firstName: fullName.firstName,
            lastName: fullName.lastName
        },
        email,
        password,
        vehicle: {
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        }
    })

    return captain
}

export { createCaptain }