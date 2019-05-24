
import { Controller, Post, Get, Req, Body, Param } from '@nestjs/common';
import { UserServices } from '../services/user.service';
import { IUsers } from '../interface';
import { Request } from 'express';
import { getClientIp } from '../common/utils'

@Controller('users')
export class UserController {

    constructor(private readonly userServices: UserServices) { }

    @Post()
    async create(
        @Body() userBody: IUsers,
        @Req() request: Request) {

        let users: IUsers = {
            username: userBody.username,
            password: userBody.password,
            ip: getClientIp(request)
        }
        return this.userServices.create(users);
    }

    @Get(':id')
    async findOne(@Param('id') id): Promise<IUsers> {
        return this.userServices.getUser(id);
    }
}