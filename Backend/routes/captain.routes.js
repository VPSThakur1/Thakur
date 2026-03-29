import { Router } from "express";
import { body } from "express-validator"
import { verifycaptainJWT } from "../middlewares/auth.middleware.js"
import { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain } from "../controllers/captain.controller.js"

const routerc = Router();

routerc.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({min : 2}).withMessage('FIrst 2 letter'),
    body('password').isLength({min : 6}).withMessage('Password is 6'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 2 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn([ 'car', 'motorcycle', 'auto' ]).withMessage('Invalid vehicle type')
],
    registerCaptain
)

routerc.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min : 6}).withMessage('Password is 6'),
],
    loginCaptain
)

routerc.get('/profile', verifycaptainJWT, getCaptainProfile)

routerc.get('/logout', verifycaptainJWT, logoutCaptain)

export default routerc