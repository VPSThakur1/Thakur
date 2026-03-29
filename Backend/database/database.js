import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\nMongoDb connected successfully ${process.env.PORT}`)

        console.log(`Host: ${connectionInstance.connection.host}\nDB: ${connectionInstance.connection.name}`
);
    } catch (error) {
        console.log("MONGO-DB connection error ", error)
        process.exit(1)
    }
}

export default connectDB