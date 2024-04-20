import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./user";
import { UserRoleEnum } from "../config/constant/enum";

@Entity()
export class UserRole {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type : "varchar", length: 100 })
    role: UserRoleEnum;

    @OneToMany(() => User, (user) => user.role)
    user: User[];

}


