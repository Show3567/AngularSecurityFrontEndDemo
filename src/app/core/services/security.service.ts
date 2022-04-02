import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tap } from "rxjs/operators";
import jwt_decode from "jwt-decode";

import { AppUserAuth } from "../../shared/interfaces/app-user-auth";
import { AppUser } from "../../shared/interfaces/app-user";
// import { LOGIN_MOCKS } from './login-mocks';

const API_URL = "http://localhost:4231/api";
const httpOptions = {
  observe: "response" as "body", // check the whole response
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class SecurityService {
  private securityObject: AppUserAuth = new AppUserAuth();

  set securityObj(newObj: AppUserAuth) {
    this.securityObject = newObj;
  }
  get securityObj() {
    return this.securityObject;
  }

  constructor(private http: HttpClient) {}

  login(entity: AppUser) {
    this.resetSecurityObject();

    return this.http
      .post<AppUserAuth>([API_URL, "login"].join("/"), entity, httpOptions)
      .pipe(
        tap((data: any) => {
          Object.assign(this.securityObject, data.body);
          localStorage.setItem("bearerToken", this.securityObject.bearerToken);
        })
      );
  }

  logout(): void {
    this.resetSecurityObject();
    console.log("logout");
  }

  resetSecurityObject(): void {
    this.securityObject = {
      ...this.securityObject,
      userName: "",
      bearerToken: "",
      isAuthenticated: false,
    };

    this.securityObject.claim = {
      ...this.securityObject.claim,
      canAccessProducts: false,
      canAddProducts: false,
      canSaveProduct: false,
      canAccessCategories: false,
      canAddCategory: false,
    };

    localStorage.removeItem("bearerToken");
  }
}
