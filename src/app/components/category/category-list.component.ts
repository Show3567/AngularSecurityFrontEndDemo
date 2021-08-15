import { Component, OnInit } from "@angular/core";
import { AppUserAuth } from "../../shared/interfaces/app-user-auth";
import { Category } from "./category";
import { CategoryService } from "./category.service";
import { SecurityService } from "../../core/services/security.service";

@Component({
  templateUrl: "./category-list.component.html",
})
export class CategoryListComponent implements OnInit {
  categories: Category[];
  securityObject: AppUserAuth = new AppUserAuth();

  constructor(
    private categoryService: CategoryService,
    private securityService: SecurityService
  ) {
    this.securityObject = this.securityService.securityObject;
  }

  ngOnInit() {
    this.getCategories();
  }

  private getCategories(): void {
    this.categoryService
      .getCategories()
      // tslint:disable-next-line: deprecation
      .subscribe((categories) => (this.categories = categories));
  }
}
