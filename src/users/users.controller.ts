/*
 * @Author: xiaojun.xiong 
 * @Date: 2019-05-23 15:08:26 
 * @Last Modified by: xiaojun.xiong
 * @Last Modified time: 2019-05-23 16:04:22
 */
import { Controller, Post, Get, Req, Body } from '@nestjs/common';
import { UserServices } from './users.service';
import { IUsers } from '../interface/users.interface';
import { Request } from 'express';
import { getClientIp } from './../utils'

@Controller('users')
export class UserController {
    
    constructor(private readonly userServices: UserServices) { }

    @Post()
    async create(
        @Body() userBody: IUsers,
        @Req() request: Request): Promise<string> {

        let users: IUsers = {
            username: userBody.username,
            password: userBody.password,
            ip: getClientIp(request)
        }
        return this.userServices.create(users);
    }

    @Get()
    findAll() {
        return this.userServices.getUsers();
    }
}