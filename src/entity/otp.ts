import { Entity, PrimaryGeneratedColumn, Column, OneToMany, PrimaryColumn } from "typeorm";
import { User } from "./user";

@Entity()
export class Otp {
    @PrimaryColumn()
    email: string;

    @Column({ type : "numeric" })
    otp: number;

}


