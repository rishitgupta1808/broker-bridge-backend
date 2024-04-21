import { Router } from 'express'
import { isBuilder, validateUser } from '../../utils/validate';
import { addPosttController, getMyPosttController, getPosttController, likePostController } from './post.controller';

const router = Router()

router.post("/add",validateUser, isBuilder, addPosttController)
router.get("/mypost", validateUser, getMyPosttController)
router.get("/",validateUser, getMyPosttController)
router.put("/like/:id", validateUser, likePostController)

module.exports = router;
