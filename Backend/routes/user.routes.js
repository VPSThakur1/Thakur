import { Router } from "express";
import {body} from "express-validator"
import { registerUser, loginUser, getUserProfile , logoutUser} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

router.post('/register', [
    body('email')
        .isEmail()
        .withMessage('Invalid Email'),
    body('fullName.firstName')
        .isLength({min : 2})
        .withMessage('FIrst 2 letter'),
    body('password')
        .isLength({min : 6})
        .withMessage('Password is 6')
],
    registerUser
)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min : 6})
    .withMessage('Password length must be 6 character long')
],
    loginUser
)

router.get('/profile', verifyJWT, getUserProfile)
router.get('/logout', verifyJWT, logoutUser)
export default router; 