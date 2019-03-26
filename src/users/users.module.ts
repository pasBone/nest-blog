import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserServices } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './../entity/users.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    controllers: [UserController],
    providers: [UserServices]
})
export class UserModule { };