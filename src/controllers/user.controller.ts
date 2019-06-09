
import { Controller, Catch, Post, Get, Req, Body, Param, BadRequestException } from '@nestjs/common';
import { UserServices } from '../services/user.service';
import { IUsers } from '../interface';
import { Request } from 'express';
import { getClientIp } from '../common/utils';
import { CreateUserDto } from './../dtos/user.dto'

@Catch()
@Controller('users')
export class UserController {

    constructor(private readonly userServices: UserServices) { }
    @Post()
    async create(
        @Body() dto: CreateUserDto,
        @Req() request: Request) {

        const users: IUsers = {
            username: dto.username,
            password: dto.password,
            ip: getClientIp(request)
        }

        const hasUser = await this.userServices.getUserByUsername(dto.username);

        if (hasUser == undefined) {
            const result = await this.userServices.create(users);
            return {
                msg: '注册成功',
                data: {
                    id: result.id,
                    username: result.user.username
                }
            }
        }

        throw new BadRequestException({
            error: `${dto.username}用户名已存在`
        });
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<IUsers> {
        return this.userServices.getUser(id);
    }
}