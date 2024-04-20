import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { User } from "./user";

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type : "simple-array", nullable : true})
    media: string[];

    @Column({type: "text" })
    caption: string;

    @Column({type: "int", default : 0 })
    likes: number;

    @ManyToOne(() => User, (user) => user.post)
    @JoinColumn({ name: "user" })
    user: User;

    @CreateDateColumn({ type: 'timestamp without time zone' })
    created_date: Date;

    @UpdateDateColumn({ type: 'timestamp without time zone' })
    modified_date: Date;

}


