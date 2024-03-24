import { NextFunction, Request, Response } from "express";
import { AmenitiesCommercial, AmenitiesResidential } from "../../config/constant/enum";

export const getResidentialAmmenities = (req: Request<unknown, unknown, unknown, unknown>, res: Response, next: NextFunction)  =>{
    try {
      return res.status(200).json({ 'success': true, data : Object.values(AmenitiesResidential).filter((v) => isNaN(Number(v)))})
    } catch (error) {
      console.log(error)
      return res.status(500).json({ 'success': false, message: 'Error in getting  User', err: error.message });
    }
  }

export const getCommercialAmmenities = (req: Request<unknown, unknown, unknown, unknown>, res: Response, next: NextFunction)  =>{
    try {
      return res.status(200).json({ 'success': true, data :Object.values(AmenitiesCommercial).filter((v) => isNaN(Number(v))) })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ 'success': false, message: 'Error in getting  User', err: error.message });
    }
}