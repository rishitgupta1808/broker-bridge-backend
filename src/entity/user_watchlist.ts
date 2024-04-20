import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, OneToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { UserRole } from "./user_role";
import { Company } from "./company";
import { User } from "./user";
import { Project } from "./project";

@Entity()
export class UserWatchlist {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.watchlist)
    @JoinColumn({ name: "user" })
    user: User;

    @ManyToOne(() => Project, (project) => project.user_watchlist)
    @JoinColumn({ name: "project" })
    project: Project;

    @CreateDateColumn({ type: 'timestamp without time zone' })
    created_date: Date;

    @UpdateDateColumn({ type: 'timestamp without time zone' })
    modified_date: Date;

}


