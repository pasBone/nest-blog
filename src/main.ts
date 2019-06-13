/*
 * @Author: xiaojun.xiong 
 * @Date: 2019-05-24 10:14:46 
 * @Last Modified by:   xiaojun.xiong 
 * @Last Modified time: 2019-05-24 10:14:46 
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptor/http-response.Interceptor';
import { ApiParamsValidationPipe } from './common/pipes/api-params-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(new ApiParamsValidationPipe());
  await app.listen(8081);
}
bootstrap();
