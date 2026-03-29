import express from "express"
import cors from "cors"
import router from "./routes/user.routes.js";
import routerc from "./routes/captain.routes.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import routerM from "./routes/maps.routes.js";
import routerR from "./routes/ride.routes.js";

const app = express();

dotenv.config({
    path : './.env'
})

app.use(cors({
    origin : process.env.CORS_ORIGIN, 
    credentials : true
}))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use("/users", router)
app.use("/captains", routerc)
app.use("/maps", routerM)
app.use("/rides", routerR)

app.get('/', (req, res) => {
    res.send("Hello World");
})

export {app}