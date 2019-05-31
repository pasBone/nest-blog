import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { IResponse } from './../../interface/response.interface'
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('Before...');
        console.log(next);
        // IResponse
        // const response:IResponse = {
        //     code: next.code || 200,
        // }

        return next
            .handle()
            .pipe();
    }
}
