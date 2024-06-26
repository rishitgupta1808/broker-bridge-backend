
import { Request, Response, NextFunction } from 'express';


export interface CustomRequest<T> extends Request<T,unknown,T,T> {
    user?: User; // Assuming UserPayload is the type you want for the user property
}
  
  // Your existing UserPayload interface
import jwt from 'jsonwebtoken';
import { UserPayload } from '../api/user/user.interface';
import { UserRoleEnum } from '../config/constant/enum';
import { User } from '../entity/user';
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

export const isBuilder = (req : CustomRequest<unknown>, res : Response, next : NextFunction) => {
    console.log("check role")

    console.log(req.user.role.id , UserRoleEnum.Builder + 1)
    if(req.user.role.id === UserRoleEnum.Builder + 1)
    next();
    else
    return res.status(403).json({ error: "Only Role Builder have permission to access the resource" })
}


