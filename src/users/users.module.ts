import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserServices } from './users.service';

@Module({
    controllers: [UserController],
    providers: [UserServices]
})
export class UserModule { };