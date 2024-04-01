import { getRepository } from "typeorm";
import { ListtProjectPayload, ProjectPayload } from "./project.interface";
import { Project } from "../../entity/project";
import { Company } from "../../entity/company";

export const addProjectService = async (payload: ProjectPayload) => {
    try {
        const {company} = payload
        let companyDetails = await getRepository(Company).findOne({where :{id :  company}})

        if(!companyDetails)
        throw new  Error("Company Not Found");

        let project = new Project()

        Object.assign(project, payload)

        let saveUser = await getRepository(Project).save(project);

        return saveUser;

    } catch (error) {
      console.log(error)
      throw error;
    }
}
export const listProjectService= async (payload: ListtProjectPayload) => {
    try {

        let {search, property_type, id} = payload

        let queryRunner = getRepository(Project)
        .createQueryBuilder("project")
        .leftJoinAndSelect("project.company", "company")

        if(search){
            queryRunner.where('LOWER(project.name) LIKE LOWER(:searchString)', { searchString: `%${search.toLowerCase()}%` });
            queryRunner.where('LOWER(project.location) LIKE LOWER(:searchString)', { searchString: `%${search.toLowerCase()}%` });
        }

        if(property_type)
        queryRunner.andWhere('project.property_type = :property_type', {property_type})

        if(id)
        queryRunner.andWhere('project.id = :id', {id})

        return await queryRunner.orderBy('project.created_date',"DESC").getMany()

    } catch (error) {
      console.log(error)
      throw error;
    }
}