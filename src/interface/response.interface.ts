export interface IPagination {
    pageNumber: number, //当前页数
    pageSize: number,  //每页显示条数
    total: number //总条数
}

export interface IResponse {
    code: number,     //业务状态码
    time: number,     //请求时间
    path: string,    //请求路径
    msg: string,    //请求结果说明
    data: object | string | boolean | [], //请求结果
    pagination?: IPagination  //分页信息
}