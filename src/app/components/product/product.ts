export class Product {
  public constructor(init?: Partial<Product>) {
    Object.assign(this, init);
  }

  // tslint:disable-next-line: variable-name
  _id: string;
  productName: string;
  introductionDate: Date;
  price: number;
  url: string;
  categoryId: string;
}
