import { Injectable } from '@nestjs/common';

@Injectable()
export class UserServices{
    constructor() {

    }
    getUsers(): Array<{}> {
        return [{
            name: 'xiongxiaojun'
        }]
    }
}
