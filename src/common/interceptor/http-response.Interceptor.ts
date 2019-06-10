import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { IResponse } from './../../interface/response.interface'
import { Observable, } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ApiResponseCode } from '../enums/api-response-code.enum';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<IResponse> {
        return next
            .handle()
            .pipe(map((response = {}) => {
                const { code = ApiResponseCode.SUCCESS, msg = '操作成功', data = null } = response;
                return {
                    code,
                    msg,
                    data,
                    time: Date.now(),
                }
            }));
    }
}
