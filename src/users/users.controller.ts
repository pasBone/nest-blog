import { Controller, Post, Get } from '@nestjs/common';
import { UserServices } from './users.service';

@Controller('users')
export class UserController {
    constructor(private readonly userServices: UserServices) { }
    
    @Post()
    create() {
        return 'this is new Users post'
    }

    @Get()
    findAll() {
        return this.userServices.getUsers();
    }
}