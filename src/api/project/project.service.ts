import { getRepository } from "typeorm";
import { AddProjectWatchListPayload, ListtProjectPayload, ProjectPayload } from "./project.interface";
import { Project } from "../../entity/project";
import { Company } from "../../entity/company";
import { UserWatchlist } from "../../entity/user_watchlist";

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

        let {search, property_type, id, userId} = payload

        let queryRunner = getRepository(Project)
        .createQueryBuilder("project")
        .leftJoinAndSelect("project.company", "company")

        if(search){
            queryRunner.where('LOWER(project.name) LIKE LOWER(:searchString)', { searchString: `%${search.toLowerCase()}%` });
            queryRunner.orWhere('LOWER(project.location) LIKE LOWER(:searchString)', { searchString: `%${search.toLowerCase()}%` });
        }

        if(property_type)
        queryRunner.andWhere('project.property_type = :property_type', {property_type})

        if(id)
        queryRunner.andWhere('project.id IN (:...id)', {id  : id.trim().split(",")})

        if(userId)
        queryRunner.leftJoin("company.user",  "user").where("user.id =:id", {id : userId})
        

        return await queryRunner.orderBy('project.created_date',"DESC").getMany()

    } catch (error) {
      console.log(error)
      throw error;
    }
}

export const addProjectWatchlistService= async (payload: AddProjectWatchListPayload) => {
    try {

        let {project, user} = payload

        const isProject = await listProjectService({id : project})

        if(!isProject)
        return new Error("Project is nott available by this id")

        let watchlist = new UserWatchlist()

        Object.assign(watchlist, payload)

        return await getRepository(UserWatchlist).save(watchlist)

    } catch (error) {
      console.log(error)
      throw error;
    }
}