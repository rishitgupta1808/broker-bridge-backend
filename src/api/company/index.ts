import { Router } from 'express'
import { addCompanyController } from './company.controller';

const router = Router()

router.post("/", addCompanyController)


module.exports = router;
