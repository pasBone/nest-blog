import { IUsers } from '../interface';
import { IsString, IsInt, IsNotEmpty, Min, MinLength, MaxLength } from 'class-validator';


export class CreateUserDto implements IUsers {
    @IsNotEmpty({ message: '用户名必须不能为空' })
    @MinLength(4, {message: '用户名最小长度为4位'})
    @MaxLength(12, {message: '用户名最大长度为12位'})
    readonly username: string;

    @IsNotEmpty({ message: '密码不能为空' })
    readonly password: string;
    
    readonly ip: string;

    @IsString()
    readonly age?: number;

    readonly create_time?: Date;

    readonly update_time?: Date;

}