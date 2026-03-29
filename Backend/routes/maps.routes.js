import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { getCoordinates, getDistanceTIME, getAutoCompleteSuggestion } from "../controllers/map.controller.js";
import { query } from "express-validator";

const routerM = Router();

routerM.get('/get-coordinates', 
    query('address').isString().isLength({ min : 3}), 
    verifyJWT, 
    getCoordinates
);

routerM.get('/get-distance-time', 
    query('origin').isString().isLength({ min : 3}),
    query('destination').isString().isLength({ min : 3}),
    verifyJWT,
    getDistanceTIME
)

routerM.get('/get-suggestions',
    query('input').isString().isLength({ min : 3}),
    verifyJWT,
    getAutoCompleteSuggestion
)

export default routerM