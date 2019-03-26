import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './../entity/users.entity';
import { UsersAuth } from './../entity/auths.entity';

@Injectable()
export class UserServices {

    constructor(
        @InjectRepository(Users)
        // @InjectRepository(UsersAuth)
        private readonly usersRepository: Repository<Users>,
        // private readonly usersAuthRepository: Repository<UsersAuth>
    ) { }



    async create(): Promise<string> {
        let users = new Users();
        // let usersAuth = new UsersAuth();
        let now = Date.now();
        // users.id = '12345678901234';
        users.age = 20;
        users.username = 'xiongxiaojun';
        users.password = 'asdsarewqrewqr';
        users.ip = '192.168.1.1';
        users.create_time = now;
        users.update_time = now;

        // usersAuth.id = '3659855';
        // usersAuth.create_time = now;
        // usersAuth.update_time = now;

        await this.usersRepository.save(users);
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
