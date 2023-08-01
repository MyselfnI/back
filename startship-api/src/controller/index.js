import { registerController } from "./auth/register.js";
import { loginConteroller } from "./auth/login.js";
import { referalControler } from "./app/referalController.js";
import { forgetPasswordController } from "./auth/forgotPassword.js";
import { addAmountController } from "./app/addAmountController.js";
import { verifyOtpController } from "./auth/verifyOtp.js";
import { uploadAvatar } from "./app/uplaoadAvatarController.js";
import { getUserProfileController } from "./app/getProfile.js";
import { DeleteUserController } from "./auth/delectUser.js";
//exports

export const register = registerController
export const login = loginConteroller
export const forgetPassword  = forgetPasswordController
export const refer = referalControler
export const addAmount = addAmountController
export const verifyOtp = verifyOtpController
export const updateProfileImage = uploadAvatar
export const getProfile = getUserProfileController
export const deleteUser = DeleteUserController