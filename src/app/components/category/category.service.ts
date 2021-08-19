import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/';
import { HttpClient } from '@angular/common/http';

import { Category } from './category';

const API_URL = 'http://localhost:4231/api/category/';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(API_URL);
  }
}
