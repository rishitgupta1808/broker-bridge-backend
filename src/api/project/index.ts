import { Router } from 'express'
import { validateUser } from '../../utils/validate';
import { addProjectController, addProjectWatchlistController, getCommercialAmmenities, getMyProjectController, getResidentialAmmenities, listProjectControler } from './project.controller';

const router = Router()


router.get("/residential/amenities", getResidentialAmmenities)
router.get("/commercial/amenities", getCommercialAmmenities)
router.post("/add", addProjectController)
router.get("/list",listProjectControler)
router.get("/myproject",validateUser, getMyProjectController)
router.post("/watchlist/add",validateUser, addProjectWatchlistController)


module.exports = router;
