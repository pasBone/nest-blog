
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { Users } from '../entity/users.entity';
import { UsersAuth } from '../entity/auths.entity';
import { IUsers } from '../interface';

@Injectable()
export class UserServices {

    constructor(
        @InjectRepository(Users) private readonly usersRepository: Repository<Users>,
    ) { }

    async create(userInfo: IUsers) {
        // 保存基本信息
        const users = new Users();
        users.username = userInfo.username;
        users.ip = userInfo.ip;
        // 写入密码到 auth 表
        const usersAuth = getRepository(UsersAuth);
        await this.usersRepository.save(users);
        return await usersAuth.save({
            password: userInfo.password,
            user: users
        })
    }
    async getUser(id: string): Promise<Users> {
        return await this.usersRepository.findOne(id)
    }

    async getUserByUsername(username: string): Promise<Users>{
        // 根据用户名查询用户信息
        return await this.usersRepository.findOne({
            username
        });
    }
}
