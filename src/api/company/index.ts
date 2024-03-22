import { Router } from 'express'
import { addCompanyController, attachUploadController } from './company.controller';

const router = Router();
import multer from 'multer';
var storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
var upload = multer({
    dest: 'uploads/',
    storage: storage
})

router.post("/", addCompanyController)
router.post("/upload-file", upload.array('file'), attachUploadController)


module.exports = router;
