
import { Request, Response, NextFunction } from 'express';


export interface CustomRequest<T> extends Request<T,unknown,unknown,T> {
    user?: UserPayload; // Assuming UserPayload is the type you want for the user property
}
  
  // Your existing UserPayload interface
import jwt from 'jsonwebtoken';
import { UserPayload } from '../api/user/user.interface';
require('dotenv').config()

export const validateUser = (req : CustomRequest<unknown>, res : Response, next : NextFunction) => {
    console.log("validate")
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({ error: "Unauthorized Access." })
    }
    
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, process.env.JWT_SECURE_KEY, (err, payload) => {
        if (err) {
            return res.status(403).json({ error: "User don't have permission to access the resource" })
        }
        req.user = payload
        console.log(req.user)
        next()
    })
}
