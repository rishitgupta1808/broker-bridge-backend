import { Router } from 'express'
import { validateUser } from '../../utils/validate';
import { addProjectController, getCommercialAmmenities, getMyProjectController, getResidentialAmmenities, listProjectControler } from './project.controller';

const router = Router()


router.get("/residential/amenities", getResidentialAmmenities)
router.get("/commercial/amenities", getCommercialAmmenities)
router.post("/add", addProjectController)
router.get("/list", listProjectControler)
router.get("/myproject",validateUser, getMyProjectController)


module.exports = router;
