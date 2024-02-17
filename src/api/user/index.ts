import { Router } from 'express'
import { addUserController, getRolesController, loginController } from './user.controller';

const router = Router()

router.post("/", addUserController)
router.get("/roles", getRolesController)
router.post("/login", loginController)

module.exports = router;
