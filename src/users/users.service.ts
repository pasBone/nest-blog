import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { Users } from './../entity/users.entity';
import { UsersAuth } from './../entity/auths.entity';
import { IUsers } from '../interface';

@Injectable()
export class UserServices {

    constructor(
        @InjectRepository(Users) private readonly usersRepository: Repository<Users>
    ) { }

    async create(userInfo: IUsers): Promise<string> {
        const users = new Users();
        const usersAuth = getRepository(UsersAuth);
        
        users.username = userInfo.username;
        users.ip = userInfo.ip;

        await this.usersRepository.save(users);
        const response = await usersAuth.save({
            password: userInfo.password,
            user: users
        })
        console.log('========');
        console.log(response);

        return '';
        // return this.usersRepository.save(users)
        //     .then(res => {
        //         return 'create user done...'
        //     }).catch(err => {
        //         return err;
        //     });

    }
    getUsers(): Array<{}> {
        return [{
            name: 'xiongxiaojun'
        }]
    }
}
