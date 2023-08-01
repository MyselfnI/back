import { Router } from "express";
import { deleteUser,refer,register,login,forgetPassword,verifyOtp } from "../../controller/index.js";

export const authRouter = Router();
const router = authRouter;

router.post('/register',register)
router.post('/login',login)
router.post('/forgot-password/:email',forgetPassword)
router.get('/verifyAccount/:otp',verifyOtp)
router.post("/refer/:code",refer)
router.post("/delete-user/:userId",deleteUser)