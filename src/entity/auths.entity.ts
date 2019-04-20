import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class UsersAuth {
    @PrimaryColumn({
        unique: true
    })
    id: string

    @Column({
        length: 32
    })
    password: string

    @Column({
        type: 'bigint',
    })
    create_time: number

    @Column({
        type: 'bigint',
    })
    update_time: number

    @OneToOne(type => Users)
    @JoinColumn()
    users: Users
}