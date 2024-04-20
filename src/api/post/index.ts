import { Router } from 'express'
import { isBuilder, validateUser } from '../../utils/validate';
import { addPosttController, getPosttController, likePostController } from './post.controller';

const router = Router()

router.post("/add",validateUser, isBuilder, addPosttController)
router.get("/",validateUser, getPosttController)
router.put("/like/:id", validateUser, likePostController)

module.exports = router;
