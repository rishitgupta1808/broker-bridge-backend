import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { UserRole } from "./user_role";
import { Company } from "./company";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    full_name: string;

    @Column({ unique: true, length: 50 })
    email: string;

    @Column("varchar", { length: 255, nullable: false })
    password: string;

    @Column({ unique: true, length: 15 })
    number: string;

    @Column({length: 200, type : "varchar", default : null })
    profile_photo: string;

    @Column({ unique: true, length: 50 })
    aadhaar_number: string;

    @ManyToOne(() => UserRole, (userRole) => userRole.user)
    @JoinColumn({ name: "role_id" })
    role: UserRole;

    @OneToOne(() => Company, (company) => company.user)
    @JoinColumn({ name: "company_id" })
    company: Company;

}


