
import { Controller, Post, Get, Response, HttpStatus, Res, Req, Body, Param } from '@nestjs/common';
import { UserServices } from '../services/user.service';
import { Request } from 'express';
import { getClientIp } from '../common/utils'
import { IUsers, IResponse } from '../interface';

@Controller('users')
export class UserController {

    constructor(private readonly userServices: UserServices) { }

    @Post()
    async create(
        @Body() body: IUsers,
        @Req() request: Request) {

        const { username, password } = body;
        const users: IUsers = {
            username,
            password,
            ip: getClientIp(request)
        }
        return await this.userServices.create(users);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<{}> {
        return {
            code: 200,
            data: this.userServices.getUser(id)
        }
        // return this.userServices.getUser(id);
    }
}