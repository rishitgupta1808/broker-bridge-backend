import { NextFunction, Request, Response } from "express";
import { AmenitiesCommercial, AmenitiesResidential } from "../../config/constant/enum";
import { ListtProjectPayload, ProjectPayload } from "./project.interface";
import { addProjectService, listProjectService } from "./project.service";

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

export const addProjectController = async (req: Request<unknown, unknown, ProjectPayload, unknown>, res: Response, next: NextFunction) => {

  try {
      const {
        property_type,
        name,
        url,
        availability_status,
        rera_registration_number,
        location,
        amenities,
        starting_price,
        media,
        price_list,
        payment_plan,
        brocher,
        floor_plan_2d,
        floor_plan_3d,
        virtual_tour,
        company,
        total_area,
        bhk_value
      } = req.body
   
    const addProductdtl = await addProjectService({
        property_type,
        name,
        url,
        availability_status,
        rera_registration_number,
        location,
        amenities,
        starting_price,
        media,
        price_list,
        payment_plan,
        brocher,
        floor_plan_2d,
        floor_plan_3d,
        virtual_tour,
        company,
        total_area,
        bhk_value
    })

    return res.status(200).json({ 'success': true, data: addProductdtl })

  } catch (error) {
    console.log(error)
    return res.status(500).json({ 'success': false, message: 'Error in adding the user', err: error.message });
  }
}

export const listProjectControler = async (req: Request<unknown, unknown, unknown, ListtProjectPayload>, res: Response, next: NextFunction) => {

  try {
      const {
        property_type,
        search,
        id,
      } = req.query
   
    const addProductdtl = await listProjectService({
      property_type,
      search,
      id
    })

    return res.status(200).json({ 'success': true, data: addProductdtl })

  } catch (error) {
    console.log(error)
    return res.status(500).json({ 'success': false, message: 'Error in adding the user', err: error.message });
  }
}