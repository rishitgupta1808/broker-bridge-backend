import { Router } from 'express'
import { isBuilder, validateUser } from '../../utils/validate';
import { addProjectController, addProjectWatchlistController, editProjectController, getCommercialAmmenities, getMyProjectController, getResidentialAmmenities, listProjectControler } from './project.controller';

const router = Router()


router.get("/residential/amenities", getResidentialAmmenities)
router.get("/commercial/amenities", getCommercialAmmenities)
router.post("/add",validateUser, isBuilder, addProjectController)
router.put("/edit",validateUser, isBuilder, editProjectController)
router.get("/list",validateUser,listProjectControler)
router.get("/myproject",validateUser, getMyProjectController)
router.post("/watchlist/add",validateUser, addProjectWatchlistController)


module.exports = router;
