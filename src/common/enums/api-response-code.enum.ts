export enum ApiResponseCode {
    TIMEOUT = -1,   // 系统繁忙
    SUCCESS = 1,    // 业务成功
    ERROR = 0,      // 业务失败
    PARAMS_ERROR = 2,  //参数校验失败
    USER_ID_INVALID = 10001 // 用户id无效
}