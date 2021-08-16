import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, tap } from "rxjs/operators";
import jwt_decode from "jwt-decode";

import { AppUserAuth } from "../../shared/interfaces/app-user-auth";
import { AppUser } from "../../shared/interfaces/app-user";
// import { LOGIN_MOCKS } from './login-mocks';

const API_URL = "http://localhost:4231/api/";
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
  securityObject: AppUserAuth = new AppUserAuth();

  constructor(private http: HttpClient) {}

  login(entity: AppUser) {
    this.resetSecurityObject();

    return this.http
      .post<AppUserAuth>(API_URL + "login", entity, { observe: "response" })
      .pipe(
        tap((data: any) => {
          // get jwt from response headers
          console.log(data.headers.get("bearerToken"));

          // get data from jwt
          const decoded = jwt_decode(data.body.bearerToken);
          console.log("decoded info: ", decoded);

          // update shared object
          Object.assign(this.securityObject, data.body);

          // store jwt into localstorage
          localStorage.setItem("bearerToken", this.securityObject.bearerToken);
        })
      );

    // Object.assign(
    //   this.securityObject,
    //   LOGIN_MOCKS.find(user =>
    //     user.userName.toLowerCase() === entity.userName.toLowerCase())
    // );
    // if (this.securityObject.userName !== '')
    //   localStorage.setItem('bearerToken', this.securityObject.bearerToken);
    // return of<AppUserAuth>(this.securityObject);
  }

  logout(): void {
    this.resetSecurityObject();
    console.log("logout");
  }

  resetSecurityObject(): void {
    // this.securityObject = new AppUserAuth();
    this.securityObject.userName = "";
    this.securityObject.bearerToken = "";
    this.securityObject.isAuthenticated = false;

    this.securityObject.claim = {
      canAccessProducts: false,
      canAddProducts: false,
      canSaveProduct: false,
      canAccessCategories: false,
      canAddCategory: false,
    };

    localStorage.removeItem("bearerToken");
  }
}
