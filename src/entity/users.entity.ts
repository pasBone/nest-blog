import { Entity, Column, PrimaryColumn, Generated } from 'typeorm';
import { UserState, UserRole } from './../common/enums/user.enum';

@Entity()
export class Users {
    @PrimaryColumn({
        unique: true
    })
    @Generated("uuid")
    id: string

    @Column({
        length: 40,
        unique: true,
    })
    username: string

    @Column({
        default: 0
    })
    age: number

    @Column()
    ip: string

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    create_time: Date;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    update_time: Date;

    @Column({
        type: "enum",
        enum: UserState,
        default: UserState.NORMAL
    })
    state: UserState

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.EDITOR
    })
    role: UserRole
}