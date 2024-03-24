import { Router } from 'express'
import { validateUser } from '../../utils/validate';
import { getCommercialAmmenities, getResidentialAmmenities } from './project.controller';

const router = Router()


router.get("/residential/amenities", getResidentialAmmenities)
router.get("/commercial/amenities", getCommercialAmmenities)


module.exports = router;
