import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { UserRole } from "./user_role";
import { User } from "./user";
import { AmenitiesCommercial, AmenitiesResidential, AvailabilityStatus, PropertyType } from "../config/constant/enum";
import { Company } from "./company";

@Entity()
export class Project {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, type: "varchar", enum: PropertyType })
    property_type: PropertyType;

    @Column({length: 100 })
    name: string;

    @Column({length: 250, type: "varchar" })
    url: string;

    @Column({length: 500, type: "varchar" })
    availability_status: AvailabilityStatus;

    @Column({length: 250, type: "varchar" })
    rera_registration_number: string;

    @Column({length: 500, type: "varchar" })
    location: string;

    @Column({type: "enum", enum : [...Object.values(AmenitiesCommercial), ...Object.values(AmenitiesResidential)]})
    amenities: AmenitiesCommercial | AmenitiesResidential;

    @Column({type: "numeric",precision: 18, scale: 2})
    starting_price: number;

    @Column("simple-array")
    media: string[];

    @ManyToOne(()=>Company, (company)=>company.project)
    @JoinColumn({name : 'company_id'})
    company : Company
}


