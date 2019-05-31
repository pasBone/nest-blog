/*
 * @Author: xiaojun.xiong 
 * @Date: 2019-05-24 10:14:46 
 * @Last Modified by:   xiaojun.xiong 
 * @Last Modified time: 2019-05-24 10:14:46 
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
// import { responseMiddleware } from './common/middleware/http-response.middleware';
import { ResponseInterceptor } from './common/interceptor/http-response.Interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(responseMiddleware);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(8081);
}
bootstrap();
