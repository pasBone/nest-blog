import { Response, Request } from 'express';

export function responseMiddleware(req: Request, res: Response, next: Function) {
  console.log('response');
  return next();
}