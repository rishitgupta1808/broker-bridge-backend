import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../../utils/validate";
import { PostPayload } from "./post.interface";
import { addPosttService, getPostService , likePostService } from "./post.service";


export const addPosttController = async (req:   CustomRequest<PostPayload>, res: Response, next: NextFunction) => {

  try {
      const {
        media,
        caption,
        likes
      } = req.body;

      const {
        id
      }  = req.user


   
    const addProductdtl = await addPosttService({
      media,
      caption,
      likes,
      user :  id
    })

    return res.status(200).json({ 'success': true, data: addProductdtl })

  } catch (error) {
    console.log(error)
    return res.status(500).json({ 'success': false, message: 'Error in adding the post', err: error.message });
  }
}

export const getPosttController = async (req:   CustomRequest<PostPayload>, res: Response, next: NextFunction) => {

  try {
   
    const addProductdtl = await getPostService()

    return res.status(200).json({ 'success': true, data: addProductdtl })

  } catch (error) {
    console.log(error)
    return res.status(500).json({ 'success': false, message: 'Error in adding the post', err: error.message });
  }
}

export const getMyPosttController = async (req:   CustomRequest<PostPayload>, res: Response, next: NextFunction) => {

  try {

    const {
      id
    } = req.user

    console.log("dfer",id)
   
    const addProductdtl = await getPostService({id})

    return res.status(200).json({ 'success': true, data: addProductdtl })

  } catch (error) {
    console.log(error)
    return res.status(500).json({ 'success': false, message: 'Error in adding the post', err: error.message });
  }
}


export const likePostController = async (req: CustomRequest<PostPayload>, res: Response, next: NextFunction) => {

  try {

    const {
      id
    } = req.params
   
    const addProductdtl = await likePostService({id})

    return res.status(200).json({ 'success': true, data: addProductdtl })

  } catch (error) {
    console.log(error)
    return res.status(500).json({ 'success': false, message: 'Error in adding the post', err: error.message });
  }
}


 

