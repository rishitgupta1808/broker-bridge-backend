import { NextFunction, Request, Response } from "express";
import { CompanyPayload } from "./company.interface";
import { addCompanyService } from "./company.service";
import { AWSService } from "../../utils/s3upload";

export interface MulterRequest extends Request {
    files: any;
}

const AWSserviecInstance = new AWSService();


export const addCompanyController = async (req: Request<unknown, unknown, CompanyPayload, unknown>, res: Response, next: NextFunction) => {

    try {
        const {
            name,
            website,
            email,
            gstin,
            user
        } = req.body
     
      const addProductdtl = await addCompanyService({
        name,
        website,
        email,
        gstin,
        user
      })

      res.status(200).json({ 'success': true, data: addProductdtl })

    } catch (error) {
      console.log(error)
      res.status(500).json({ 'success': false, message: 'Error in adding the company', err: error.message });
    }
  }

  export const attachUploadController = async (req: MulterRequest, res: Response, next: NextFunction) => {
    try {

        let file = req.files
        let allPromises = [];
        console.log("file", file)
        if (Array.isArray(file)) {
            for (let f of file) {
                allPromises.push(AWSserviecInstance.uploadFileGetKey(f));
            }
        } else {
            allPromises.push(AWSserviecInstance.uploadFileGetKey(file));
        }

        let resUploadedFiles = await Promise.all(allPromises);

        res.status(200).json({ success: true, message: resUploadedFiles });
    } catch (error) {
        console.log(error)
        //formatError(error)
        res.status(error.httpCode || 500).json({ 'success': false, message: error.message })
    }
}


