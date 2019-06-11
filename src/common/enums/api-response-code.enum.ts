export enum ApiResponseCode {
    TIMEOUT = -1,   // 系统繁忙
    SUCCESS = 1,    // 业务成功
    ERROR = 0,      // 业务失败
    
    PARAMS_ERROR = 2,  //参数校验失败
    USER_ID_INVALID = 10001, // 用户id无效
    USER_STATE_INVALID = 10002, // 用户已被禁用
    USER_ACCOUNT_INVALID = 10003 // 用户账号或密码错误
}