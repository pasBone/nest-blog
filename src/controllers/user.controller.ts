
import { Controller, Post, Get, Req, Body, Param, BadRequestException } from '@nestjs/common';
import { UserServices } from '../services/user.service';
import { IUsers, IApiResponse } from '../interface';
import { Request } from 'express';
import { getClientIp } from '../common/utils';
import { CreateUserDto, UserLoginDto } from './../dtos/user.dto'

@Controller('users')
export class UserController {

    constructor(private readonly userServices: UserServices) { }
    /**
     * @description 用户注册
     * @param dto 
     * @param request 
     */
    @Post()
    async create(
        @Body() dto: CreateUserDto,
        @Req() request: Request
    ): Promise<IApiResponse> {

        dto.ip = getClientIp(request)
        return await this.userServices.create(dto);
    }

    @Post('login')
    async login(@Body() dto: UserLoginDto): Promise<IApiResponse> {
        return await this.userServices.userLogin(dto);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<IApiResponse> {
        return await this.userServices.getUser(id);
    }
}