import { Component, OnInit } from "@angular/core";
import { AppUser } from "../../shared/interfaces/app-user";
import { AppUserAuth } from "../../shared/interfaces/app-user-auth";
import { SecurityService } from "../../core/services/security.service";
import { Router, ActivatedRoute } from "@angular/router";
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { Observable, of, timer } from "rxjs/";
import { catchError, map, switchMap, tap } from "rxjs/operators";

@Component({
  selector: "ptc-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  hide = true;

  user: AppUser = new AppUser();
  securityObj: AppUserAuth = null;
  returnUrl: string;

  form: any;

  constructor(
    private securityService: SecurityService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group(
      {
        username: ["", [Validators.required], []],
        password: ["", [Validators.required]],
      },
      {
        asyncValidator: this.validateUserIsAuthenticated(),
      }
    );
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
  }

  onSubmit() {
    this.user = {
      userName: this.form.value.username,
      password: this.form.value.password,
    };
    this.securityService.login(this.user).subscribe(
      (userInfo) => {
        this.securityObj = userInfo.body;
        if (this.returnUrl) {
          this.router.navigateByUrl(this.returnUrl);
        }
      },
      (err) => {
        this.securityObj = new AppUserAuth();
      }
    );
  }

  validateUserIsAuthenticated(): AsyncValidatorFn {
    return (group: AbstractControl): Observable<ValidationErrors | null> => {
      const obj = {
        userName: group.value.username,
        password: group.value.password,
      };

      return timer(500).pipe(
        switchMap(() => {
          return this.securityService.login(obj).pipe(
            tap((data) => console.log("data in validater: ", data)),
            map(() => null),
            catchError((err: any) => {
              return of({ errormessage: err.error });
            })
          );
        })
      );
    };
  }
}
