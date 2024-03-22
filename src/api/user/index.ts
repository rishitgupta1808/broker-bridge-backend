import { Router } from 'express'
import { addUserController, changePasswordController, getRolesController, getUserDetailsController, loginController, sendOtpChanggePasswordController, sendOtpLoginController, verifyEmialController, verifyOtpController } from './user.controller';
import { validateUser } from '../../utils/validate';

const router = Router()


router.get("/roles", getRolesController)
router.post("/login", loginController)
router.get("/:id",validateUser,getUserDetailsController)
router.post("/", addUserController)
router.post("/verify-email", verifyEmialController)
router.post("/otp", verifyOtpController)
router.post("/login/otp", sendOtpLoginController)
router.post("/password/otp",sendOtpChanggePasswordController)
router.put("/password/change", changePasswordController)

module.exports = router;
