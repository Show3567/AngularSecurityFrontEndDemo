import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Product } from "./product";
import { SecurityService } from "../../core/services/security.service";

const API_URL = "http://localhost:4231/api/product/";
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private securityService: SecurityService
  ) {}

  getProducts(): Observable<Product[]> {
    // const httpheader = new HttpHeaders()
    //   .set('Authorization', 'Bearer' + this.securityService.securityObject.bearerToken);
    // // console.log('jwt token: ', httpheader);
    // return this.http.get<Product[]>(API_URL, { headers: httpheader });
    return this.http.get<Product[]>(API_URL);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(API_URL + id);
  }

  addProduct(entity: Product): Observable<Product> {
    return this.http.post<Product>(API_URL, entity, httpOptions);
  }

  updateProduct(entity: Product): Observable<any> {
    return this.http.put(API_URL, entity, httpOptions);
  }

  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(API_URL + id.toString(), httpOptions);
  }
}
