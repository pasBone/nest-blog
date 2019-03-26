import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class UsersAuth {
    @PrimaryColumn({
        unique: true
    })
    id: string

    // @Column()
    // create_time: number

    // @Column()
    // update_time: number

    @OneToOne(type => Users)
    @JoinColumn()
    users: Users
}