
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { bcryptGenSalt, bcryptCompare } from './../common/utils';
import { Users } from '../entity/users.entity';
import { UsersAuth } from '../entity/auths.entity';
import { ApiResponseCode } from './../common/enums/api-response-code.enum';
import { CreateUserDto, UserLoginDto } from './../dtos/user.dto'

@Injectable()
export class UserServices {

    constructor(
        @InjectRepository(Users) private readonly usersRepository: Repository<Users>,
    ) { }

    /**
     * @description 用户注册
     * @param userInfo 
     */
    async create(dto: CreateUserDto) {
        try {

            const hasUser = await this.getUserByUsername(dto.username);

            if (hasUser == undefined) {
                // 保存基本信息
                const usersEnty = new Users();
                usersEnty.username = dto.username;
                usersEnty.ip = dto.ip;

                // 写入密码到 auth 表
                const usersAuth = getRepository(UsersAuth);

                const password = await bcryptGenSalt(dto.password);
                await this.usersRepository.save(usersEnty);
                await usersAuth.save({ password, user: usersEnty });

                return {
                    msg: '注册成功',
                    data: {
                        username: dto.username
                    }
                }
            }

            return {
                code: ApiResponseCode.ERROR,
                msg: '用户名已存在'
            }

        } catch (error) {
            throw new BadRequestException({
                error: `注册失败`
            });
        }
    }

    /**
     * @description 用户登录
     * @param user 
     */
    async userLogin(dto: UserLoginDto) {
        try {
            const userRes = await this.usersRepository.findOne(dto);
            if (userRes) {
                if (userRes.state == '0') {  // 用户已被禁用
                    return {
                        code: ApiResponseCode.USER_STATE_INVALID,
                        msg: '账号已被禁用'
                    }
                }

                // 通过userId查询密码
                const usersAuth = getRepository(UsersAuth);
                const authRes = await usersAuth.findOne({
                    user: {
                        id: userRes.id
                    }
                });

                const userResult = await bcryptCompare(dto.password, authRes.password);
                if (userResult) {
                    return {
                        msg: '登录成功'
                    }
                }
                return {
                    code: ApiResponseCode.USER_ACCOUNT_INVALID,
                    msg: '账号或密码错误'
                }
            }
            return {
                code: ApiResponseCode.USER_ID_INVALID,
                msg: '用户不存在'
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
    async getUserByUsername(username: string): Promise< Users > {
        return await this.usersRepository.findOne({
            username
        });
    }


    async getUser(id: string): Promise<Users> {
        return await this.usersRepository.findOne(id)
    }
}
