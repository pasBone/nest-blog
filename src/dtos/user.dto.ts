import { IUsers } from '../interface';
import { IsString, IsInt, IsNotEmpty, Min, MinLength, MaxLength } from 'class-validator';

class UserInfo {
    @IsNotEmpty({ message: '用户名必须不能为空' })
    @MinLength(4, { message: '用户名最小长度为4位' })
    @MaxLength(12, { message: '用户名最大长度为12位' })
    readonly username: string;

    @IsNotEmpty({ message: '密码不能为空' })
    @MinLength(6, { message: '密码最小长度为6位' })
    @MaxLength(16, { message: '密码最大长度为16位' })
    readonly password: string;
}

export class CreateUserDto extends UserInfo implements IUsers {
    constructor() { super() }

    readonly ip: string;

    readonly age?: number;

    readonly create_time?: Date;

    readonly update_time?: Date;

}

export class UserLoginDto extends UserInfo {
    constructor() { super() }

    readonly update_time?: Date;
}