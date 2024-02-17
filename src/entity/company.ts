import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { UserRole } from "./user_role";
import { User } from "./user";

@Entity()
export class Company {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ unique: true, length: 50 })
    website: string;

    @Column({ unique: true, length: 15 })
    gstin: string;

    @OneToOne(() => User, (user) => user.company)
    user: User;

}


