import { Router } from 'express'
import { validateUser } from '../../utils/validate';
import { addProjectController, getCommercialAmmenities, getResidentialAmmenities, listProjectControler } from './project.controller';

const router = Router()


router.get("/residential/amenities", getResidentialAmmenities)
router.get("/commercial/amenities", getCommercialAmmenities)
router.post("/add", addProjectController)
router.get("/list", listProjectControler)


module.exports = router;
