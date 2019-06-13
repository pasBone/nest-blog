import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { ApiException } from './../exceptions/api.exception';
import { IResponse } from './../../interface';
import { ApiResponseCode } from '../enums/api-response-code.enum';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    catch(exception, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();

        const { status: code = ApiResponseCode.ERROR, error: msg = '操作失败', data = null, } = exception.getResponse();

        let result: IResponse;

        if (exception instanceof ApiException) {
            result = {
                // ...exception.getError() as IResponse,
                code: 100,
                msg: exception.getErrorMessage(),
                data: null,
                time: Date.now(),
                path: request.url
            }

        } else {
            result = {
                code,
                msg,
                data,
                time: Date.now(),
                path: request.url
            }
        }


        response
            .status(status)
            .json(result);
    }
}