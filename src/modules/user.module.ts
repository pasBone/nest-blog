import { Module } from '@nestjs/common';
import { UserController } from './../controllers/user.controller';
import { UserServices } from './../services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../entity/users.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    controllers: [UserController],
    providers: [UserServices]
})
export class UserModule { };