import { Injectable, NgModule } from "@angular/core";
import { Observable, of } from "rxjs";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { catchError } from "rxjs/operators";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // get token from localStorage;
    const token = localStorage.getItem("bearerToken");

    if (token) {
      const newReq = req.clone({
        headers: req.headers.set("Authorization", "Bearer" + token),
      });
      // console.log("newReq: ", newReq);
      return next.handle(newReq).pipe(
        catchError((err) => {
          console.log("from interceptor: ", err.error);
          return of(null);
        })
      );
    } else {
      return next.handle(req).pipe(
        catchError((err) => {
          console.log("from interceptor: ", err.error);
          return of(null);
        })
      );
    }
  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
  ],
})
export class HttpInterceptorModule {}
