import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";


export interface Response<T> {
  data: T;
  statusCode: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next
      .handle()
      .pipe(
        map(data => ({
          data: data == undefined ? "" : data,
          statusCode: context.switchToHttp().getResponse().statusCode
        }))
      );
  }
}