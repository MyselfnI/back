import { Router } from "express";
import { refer,addAmount,updateProfileImage,getProfile } from "../../controller/index.js";

export const appRouter = Router()
const router = appRouter

//referal
router.post("/refer/:code",refer)

//update account
router.post("/addAmount",addAmount)
//load account
router.post("/load/:id")

//udate profile image
router.patch('/upload-avatar',updateProfileImage)

//get profile
router.get('/get-profile',getProfile)