import { Controller, Post, Get } from '@nestjs/common';
import { UserServices } from './users.service';
import { IUsers } from '../interface/users.interface';
@Controller('users')
export class UserController {
    constructor(private readonly userServices: UserServices) { }

    @Post()
    async create(obj): Promise<string> {

        let users: IUsers = {
            username: 'aa' + Math.random().toFixed(4),
            age: 10,
            ip: '192.068.0.0.1',
            create_time: 10909,
            update_time: 55000
        }
        return this.userServices.create(users);
    }

    @Get()
    findAll() {
        return this.userServices.getUsers();
    }
}