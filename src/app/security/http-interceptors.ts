import { Injectable, NgModule } from "@angular/core";
import { Observable, of } from "rxjs";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse,
} from "@angular/common/http";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { catchError, filter, tap } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(public toasterService: ToastrService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const handleReqRes = (curReq) => {
      return next.handle(curReq).pipe(
        tap((evt) => {
          if (evt instanceof HttpResponse)
            evt.body && evt.body.success
              ? this.toasterService.success(
                  evt.body.success.message,
                  evt.body.success.title,
                  { positionClass: "toast-bottom-center" }
                )
              : console.log("no response");
        }),
        catchError((err: any) => {
          if (err instanceof HttpErrorResponse) {
            try {
              this.toasterService.error(err.error.message, err.error.title, {
                positionClass: "toast-bottom-center",
              });
            } catch (e) {
              this.toasterService.error("An error occurred", "", {
                positionClass: "toast-bottom-center",
              });
            }
          }
          return of(err);
        })
      );
    };

    const token = localStorage.getItem("bearerToken"); // get token from localStorage;

    return token
      ? handleReqRes(
          req.clone({
            headers: req.headers.set("Authorization", "Bearer" + token),
          })
        )
      : handleReqRes(req);
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
