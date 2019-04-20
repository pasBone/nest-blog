import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './../entity/users.entity';
import { UsersAuth } from './../entity/auths.entity';
import { IUsers } from '../interface/users.interface';
@Injectable()
export class UserServices {

    constructor(
        @InjectRepository(Users) private readonly usersRepository: Repository<Users>,
        @InjectRepository(UsersAuth) private readonly usersAuthRepository: Repository<UsersAuth>,
    ) { }

    async create(userInfo :IUsers): Promise<string> {
        let users = new Users();
        let usersAuth = new UsersAuth();
        let now = Date.now();
        
        userInfo.create_time = now;
        userInfo.update_time = now;

        usersAuth.create_time = now;
        usersAuth.update_time = now;
        usersAuth.password = "asfdsadasda";;

        await this.usersRepository.save({users, ...userInfo});
        // await this.usersAuthRepository.save(usersAuth);

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
