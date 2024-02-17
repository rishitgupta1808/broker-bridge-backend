import { getRepository } from "typeorm";
import { Company } from "../../entity/company";
import { CompanyPayload } from "./company.interface";
import { User } from "../../entity/user";


export const addCompanyService = async (payload: CompanyPayload) => {
    try {
        const user = await getRepository(User).findOne({where:{id: payload.user}})
        if(!user) throw new Error("User not found")
        
        const company = await getRepository(Company).save({...payload, user})
        return company
    } catch (error) {
        throw error
    }
}
