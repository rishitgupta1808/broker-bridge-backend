import { NextFunction, Request, Response } from "express";
import { CompanyPayload } from "./company.interface";
import { addCompanyService } from "./company.service";

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


