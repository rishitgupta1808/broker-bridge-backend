import { NextFunction, Request, Response } from "express";
import { UserPayload } from "./user.interface";
import { addUserService, getRolesService, loginService } from "./user.service";

export const addUserController = async (req: Request<unknown, unknown, UserPayload, unknown>, res: Response, next: NextFunction) => {

    try {
        const {
            full_name,
            email,
            number,
            aadhaar_number,
            role,
            password
        } = req.body
     
      const addProductdtl = await addUserService({
        full_name,
        email,
        number,
        aadhaar_number,
        role,
        password
      })

      res.status(200).json({ 'success': true, data: addProductdtl })

    } catch (error) {
      console.log(error)
      res.status(500).json({ 'success': false, message: 'Error in adding the user', err: error.message });
    }
  }

export const getRolesController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roles = await getRolesService()
    res.status(200).json({ 'success': true, data: roles })
  } catch (error) {
    console.log(error)
    res.status(500).json({ 'success': false, message: 'Error in getting roles', err: error.message });
  }
}

export const loginController = async (req: Request<unknown, unknown, {email: string, password: string}, unknown>, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const roles = await loginService({email, password})
    res.status(200).json({ 'success': true, data: roles })
  } catch (error) {
    console.log(error)
    res.status(500).json({ 'success': false, message: 'Error in Login', err: error.message });
  }
}



