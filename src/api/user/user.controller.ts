import { NextFunction, Request, Response } from "express";
import { UserPayload } from "./user.interface";
import { addUserService, changePasswordService, getRolesService, getUserDetailsService, loginService, sendOtpChangePasswordService, sendOtpLoginService, verifyEmailService, verifyOtpService } from "./user.service";

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

      return res.status(200).json({ 'success': true, data: addProductdtl })

    } catch (error) {
      console.log(error)
      return res.status(500).json({ 'success': false, message: 'Error in adding the user', err: error.message });
    }
  }

export const getRolesController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roles = await getRolesService()
    return res.status(200).json({ 'success': true, data: roles })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ 'success': false, message: 'Error in getting roles', err: error.message });
  }
}

export const loginController = async (req: Request<unknown, unknown, {email: string, password: string}, unknown>, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const roles = await loginService({email, password})
    return res.status(200).json({ 'success': true, data: roles })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ 'success': false, message: 'Error in Login', err: error.message });
  }
}

export const getUserDetailsController = async(req: Request<{id : string}, unknown, unknown, unknown>, res: Response, next: NextFunction) => {
  try {
    
    const id = parseInt(req.params.id, 10);
    console.log("id",id)
    if (isNaN(id))
    return res.status(400).json({ 'success': false, message: "Invalid Id format" });

    const user = await getUserDetailsService({id})
    return res.status(200).json({ 'success': true, data: user })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ 'success': false, message: 'Error in getting  User', err: error.message });
  }
}

export const verifyEmialController = async(req: Request<unknown, unknown,{email : string}, unknown>, res: Response, next: NextFunction)  =>{
  try {
    const {email} = req.body
    const user = await verifyEmailService({email})

    if(user.userExist)
    return res.status(200).json({ 'success': false, message : "User Already Exist" })
    else
    return res.status(200).json({ 'success': true, message : "mail send  successfully" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ 'success': false, message: 'Error in getting  User', err: error.message });
  }
}

export const verifyOtpController =  async(req: Request<unknown, unknown,{otp : number, email : string}, unknown>, res: Response, next: NextFunction)  =>{
  try {
    const {otp, email} = req.body
    const user = await verifyOtpService({otp, email})
    return res.status(200).json({ 'success': true, data : user })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ 'success': false, message: 'Error in getting  User', err: error.message });
  }
}

export const sendOtpLoginController = async(req: Request<unknown, unknown,{email : string}, unknown>, res: Response, next: NextFunction)  =>{
  try {
    const {email} = req.body
    const user = await sendOtpLoginService({email})
    return res.status(200).json({ 'success': true, message : "mail send  successfully" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ 'success': false, message: 'Error in getting  User', err: error.message });
  }
}

export const sendOtpChanggePasswordController = async(req: Request<unknown, unknown,{email : string}, unknown>, res: Response, next: NextFunction)  =>{
  try {
    const {email} = req.body
    const user = await sendOtpChangePasswordService({email})
    return res.status(200).json({ 'success': true, message : "mail send  successfully" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ 'success': false, message: 'Error in getting  User', err: error.message });
  }
}

export const changePasswordController = async(req: Request<unknown, unknown,{email : string, new_password:  string}, unknown>, res: Response, next: NextFunction)  =>{
  try {
    const {email, new_password} = req.body
    const user = await changePasswordService({email, new_password})
    return res.status(200).json({ 'success': true, message : "password change successfully" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ 'success': false, message: 'Error in getting  User', err: error.message });
  }
}




