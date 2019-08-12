export enum UserState {
    NORMAL = 1,   //正常状态
    ABNORMAL = 0  //异常状态不可使用
}

export enum UserRole {
    ADMIN = 3,  //超级管理员
    EDITOR = 2, //普通编辑管理员
    GHOST = 1  //来宾
}