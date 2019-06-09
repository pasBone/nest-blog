import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { IResponse } from './../../interface/response.interface'
import { Observable,  } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ApiResponseCode } from '../enums/api-response-code.enum';
import { isPlainObject } from 'lodash';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<IResponse> {
        return next
            .handle()
            .pipe(map(data => {
               
                return {
                    code: data.code || ApiResponseCode.SUCCESS,
                    msg: data.msg || '操作成功',
                    data: data.data || data,
                    time: Date.now(),
                }
            }));
    }
}
