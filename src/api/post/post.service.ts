import { getRepository } from "typeorm";
import { Project } from "../../entity/project";
import { Company } from "../../entity/company";
import { UserWatchlist } from "../../entity/user_watchlist";
import { PostPayload } from "./post.interface";
import { User } from "../../entity/user";
import { Post } from "../../entity/post";

export const addPosttService = async (payload: PostPayload) => {
    try {
        const {user} = payload
        let userDetails = await getRepository(User).findOne({where :{id :  user}})

        if(!userDetails)
        throw new  Error("User Not Found");

        let post = new Post()

        Object.assign(post, payload)

        let savePost = await getRepository(Post).save(post);

        return savePost;

    } catch (error) {
      console.log(error)
      throw error;
    }
}


export const getPostService  = async (payload ?: {id :  number}) => {
    try {

        const {id} = payload

        return await getRepository(Post).find({
            relations: {
                user : true
            },
            ...(
                id !==  undefined && {
                    where : {
                        user : {
                            id
                        }
                    }
                }
            ),
            order :{
                created_date : "DESC"
            }
        });

    } catch (error) {
      console.log(error)
      throw error;
    }
}

export const likePostService  = async (payload: {id: number}) => {
    try {

        return await getRepository(Post).increment({id : payload.id },"likes",1);

    } catch (error) {
      console.log(error)
      throw error;
    }
}