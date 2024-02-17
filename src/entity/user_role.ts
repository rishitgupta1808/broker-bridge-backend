import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./user";

@Entity()
export class UserRole {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    role: string;

    @OneToMany(() => User, (user) => user.role)
    user: User[];

}


