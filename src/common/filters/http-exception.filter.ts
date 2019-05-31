import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { IResponse } from './../../interface';
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    catch(exception, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus()
        console.log(exception);

        const result: IResponse = {
            code: status,
            time: Date.now(),
            msg: '',
            data: false,
            path: request.url
        }

        response
            .status(status)
            .json(result);
    }

}