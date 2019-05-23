import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, Generated } from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class UsersAuth {
    @PrimaryColumn({
        unique: true
    })
    @Generated("uuid")
    id: string

    @Column({
        length: 32
    })
    password: string

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    create_time: Date;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    update_time: Date;

    @OneToOne(type => Users)
    @JoinColumn()
    user: Users
}