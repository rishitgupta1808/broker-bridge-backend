import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { UserRole } from "./user_role";
import { User } from "./user";
import { AmenitiesCommercial, AmenitiesResidential, AvailabilityStatus, PropertyType } from "../config/constant/enum";
import { Company } from "./company";

@Entity()
export class Project {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type : "simple-array", })
    property_type: string[PropertyType];

    @Column({length: 100 })
    name: string;

    @Column({length: 50, type: "varchar", default : "" })
    bhk_value: string;

    @Column({length: 250, type: "varchar" })
    url: string;

    @Column({length: 500, type: "varchar" })
    availability_status: AvailabilityStatus;

    @Column({length: 250, type: "varchar" })
    rera_registration_number: string;

    @Column({length: 500, type: "varchar" })
    location: string;

    @Column({type:  "simple-array"})
    amenities: AmenitiesCommercial[] | AmenitiesResidential[];

    @Column({type: "numeric",precision: 18, scale: 2})
    starting_price: number;

    @Column({type: "decimal",precision: 18, scale: 2})
    total_area: number;

    @Column({type : "simple-array", nullable : true})
    media: string[];

    @Column({length: 500, type: "varchar" })
    price_list: string;

    @Column({length: 500, type: "varchar", nullable : true })
    payment_plan: string;

    @Column({length: 500, type: "varchar" })
    brocher: string;

    @Column({length: 500, type: "varchar", nullable : true})
    floor_plan_2d: string;

    @Column({length: 500, type: "varchar",  nullable : true })
    floor_plan_3d: string;

    @Column({length: 500, type: "varchar", nullable : true })
    virtual_tour: string;

    @ManyToOne(()=>Company, (company)=>company.project)
    @JoinColumn({name : 'company_id'})
    company : Company

    @CreateDateColumn({ type: 'timestamp without time zone' })
    created_date: Date;

    @UpdateDateColumn({ type: 'timestamp without time zone' })
    modified_date: Date;
}


