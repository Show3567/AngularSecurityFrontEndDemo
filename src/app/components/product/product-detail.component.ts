import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";

import { ProductService } from "./product.service";
import { Product } from "./product";
import { Category } from "../category/category";
import { CategoryService } from "../category/category.service";
import { AppUserAuth } from "../../shared/interfaces/app-user-auth";
import { SecurityService } from "../../core/services/security.service";

@Component({
  templateUrl: "./product-detail.component.html",
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  originalProduct: Product;
  categories: Category[];
  securityObject: AppUserAuth = new AppUserAuth();

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private location: Location,
    private securityService: SecurityService
  ) {
    this.securityObject = this.securityService.securityObject;
  }

  ngOnInit() {
    this.getCategories();
    // Get the passed in product id
    const id = this.route.snapshot.paramMap.get("id");

    // Create or load a product
    this.createOrLoadProduct(id);
  }

  private createOrLoadProduct(id: string) {
    if (!id || +id === -1) {
      // Create new product object
      this.initProduct();
    } else {
      // Get a product from product service
      this.productService
        .getProduct(id)
        // tslint:disable-next-line: deprecation
        .subscribe((product) => {
          this.product = product;
          this.originalProduct = Object.assign({}, this.product);
        });
    }
  }

  private initProduct(): void {
    // Add a new product
    this.product = new Product({
      introductionDate: new Date(),
      price: 1,
      url: "www.fairwaytech.com",
    });
    this.originalProduct = Object.assign({}, this.product);
  }

  private getCategories(): void {
    this.categoryService
      .getCategories()
      // tslint:disable-next-line: deprecation
      .subscribe((categories) => (this.categories = categories));
  }

  saveData(): void {
    if (this.product._id) {
      // Update product
      this.productService
        .updateProduct(this.product)
        // tslint:disable-next-line: deprecation
        .subscribe(
          (product) => {
            this.product = product;
          },
          () => null,
          () => this.dataSaved()
        );
    } else {
      console.log("product-detail.ts: ", this.product);
      // Add a product
      this.productService
        .addProduct(this.product)
        // tslint:disable-next-line: deprecation
        .subscribe(
          (product) => {
            this.product = product;
          },
          () => null,
          () => this.dataSaved()
        );
    }
  }

  private dataSaved(): void {
    // Redirect back to list
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }

  cancel(): void {
    this.goBack();
  }
}
