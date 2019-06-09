
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { bcryptGenSalt, bcryptCompare } from './../common/utils';
import { Users } from '../entity/users.entity';
import { UsersAuth } from '../entity/auths.entity';
import { IUsers } from '../interface';
import { ApiResponseCode } from './../common/enums/api-response-code.enum';
import { CreateUserDto, UserLoginDto } from './../dtos/user.dto'

@Injectable()
export class UserServices {

    constructor(
        @InjectRepository(Users) private readonly usersRepository: Repository<Users>,
    ) { }

    async create(userInfo: IUsers) {
        try {
            // 保存基本信息
            const users = new Users();
            users.username = userInfo.username;
            users.ip = userInfo.ip;
            // 写入密码到 auth 表
            const usersAuth = getRepository(UsersAuth);
            const password = await bcryptGenSalt(userInfo.password);

            await this.usersRepository.save(users);
            return await usersAuth.save({
                password,
                user: users
            });

        } catch (error) {
            throw new BadRequestException({
                error: `注册失败`
            });
        }
    }

    async getUser(id: string): Promise<Users> {
        return await this.usersRepository.findOne(id)
    }

    /**
     * @description 用户登录
     * @param user 
     */
    async userLogin(user: UserLoginDto) {
        try {
            const userRes = await this.usersRepository.findOne(user);
            console.dir(userRes);
            if (userRes) {
                if (userRes.state == '0') {  // 用户已被禁用
                    return {
                        code: ApiResponseCode.USER_STATE_INVALID,
                        msg: '账号已被禁用',
                        data: null
                    }
                }

                // 通过userId查询密码
                const usersAuth = getRepository(UsersAuth);
                const authRes = await usersAuth.findOne({
                    user: {
                        id: userRes.id
                    }
                });
                
                const userResult = await bcryptCompare(user.password, authRes.password);
                
                console.log(userResult);
                if (userResult) {
                    return {
                        msg: '登录成功'
                    }
                }

                return {
                    code: ApiResponseCode.USER_ACCOUNT_INVALID,
                    msg: '账号或密码错误',
                    data: null
                }
            }
            return {
                code: ApiResponseCode.USER_ID_INVALID,
                msg: '用户不存在',
                data: null
            }

        } catch (error) {
            throw new BadRequestException({
                error: `登录失败`
            });
        }
    }

    /**
     * @description 根据用户名查询用户信息
     * @param username 用户名
     */
    async getUserByUsername(username: string): Promise<Users> {
        return await this.usersRepository.findOne({
            username
        });
    }
}
