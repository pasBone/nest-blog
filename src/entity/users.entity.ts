import { Entity, Column, PrimaryColumn, Generated } from 'typeorm';

export enum UserState {
    NORMAL = "1",   //正常状态
    ABNORMAL = "0"  //异常状态不可使用
}

export enum UserRole {
    ADMIN = "3",
    EDITOR = "2",
    GHOST = "1"
}

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