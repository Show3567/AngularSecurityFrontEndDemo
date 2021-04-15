import { Injectable } from '@angular/core';
import { AppUserAuth } from './app-user-auth';
import { AppUser } from './app-user';
import { LOGIN_MOCKS } from './login-mocks';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

const API_URL = 'http://localhost:4231/api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  securityObject: AppUserAuth = new AppUserAuth();

  constructor(
    private http: HttpClient
  ) { }

  login(entity: AppUser): Observable<AppUserAuth> {
    this.resetSecurityObject();
    console.log('entity: ', entity);

    return this.http.post<AppUserAuth>(API_URL + 'login', entity, httpOptions).pipe(
      tap(data => {
        console.log('get data from back end: ', data);
        Object.assign(this.securityObject, data);
        localStorage.setItem('bearerToken', this.securityObject.bearerToken);
      })
    );

    // Object.assign(
    //   this.securityObject,
    //   LOGIN_MOCKS.find(user =>
    //     user.userName.toLowerCase() === entity.userName.toLowerCase())
    // );
    // if (this.securityObject.userName !== '') {
    //   console.log(111);
    //   localStorage.setItem('bearerToken', this.securityObject.bearerToken);
    // }

    // return of<AppUserAuth>(this.securityObject);
  }

  logout(): void {
    this.resetSecurityObject();
  }

  resetSecurityObject(): void {
    this.securityObject.userName = '';
    this.securityObject.bearerToken = '';
    this.securityObject.isAuthenticated = false;

    this.securityObject.canAccessProducts = false;
    this.securityObject.canAddProducts = false;
    this.securityObject.canSaveProduct = false;
    this.securityObject.canAccessCategories = false;
    this.securityObject.canAddCategory = false;

    localStorage.removeItem('bearerToken');
  }

}
