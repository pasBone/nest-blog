import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { IResponse } from './../../interface';
import { ApiResponseCode }  from '../enums/api-response-code.enum';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    catch(exception, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        
        const { status: code, error: msg } = exception.getResponse();
        const result: IResponse = {
            code: code || ApiResponseCode.ERROR,
            msg: msg || '操作失败',
            time: Date.now(),
            data: null,
            path: request.url
        }
        response
            .status(status)
            .json(result);
    }
}