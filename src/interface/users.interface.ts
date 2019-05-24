export interface IUsers {
    username: string,
    password?: string,
    ip: string,
    age?: number,
    create_time?: Date,
    update_time?: Date
}

export interface IUserService {
    findAll(): Promise<IUsers[]>;
    findOne(id: string): Promise<IUsers>;
    create();
}