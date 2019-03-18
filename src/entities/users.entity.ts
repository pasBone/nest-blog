import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable } from 'typeorm';

@Entity()
export class Users{
    @PrimaryGeneratedColumn()
    id: Number

    @Column()
    username: String

    @Column()
    age: Number
}