import { userModel } from "../models/user.model.js";

const createUser = async ({firstName, email, lastName, password}) => {
    if(!firstName || !email || !password) {
        throw new Error('ALl fields are required')
    }

    const user = await userModel.create({
        fullName: {
            firstName,
            lastName
        }, 
        email,
        password
    });

    return user;
}

export { createUser }