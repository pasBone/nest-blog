import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from './../entities/users.entity';

@Injectable()
export class UserServices {
    constructor() {

    }

    private readonly usersRepository: Repository<Users>
    
    async create(): Promise<string> {
        let users = new Users();
        users.age = 20;
        users.username = 'xiongxiaojun';
        users.id = 0;
        return this.usersRepository.save(users)
            .then(res => {
                return 'create user done...'
            }).catch(err => {
                return err;
            });

    }
    getUsers(): Array<{}> {
        return [{
            name: 'xiongxiaojun'
        }]
    }
}
