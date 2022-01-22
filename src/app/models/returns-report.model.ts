import { UserSmall } from './user-small.model';

export class ReturnsReport {
  public static fromJson({
    id,
    createdAt,
    updatedAt,
    date,
    cant,
    description,
    status,
    cancelled_description,
    promotorProduct,
    almacenero,
  }: any) {
    let almaceneroModel = null;
    if (almacenero) {
      almaceneroModel = UserSmall.fromJson(almacenero);
    }
    return new ReturnsReport(
      id,
      createdAt,
      updatedAt,
      date,
      cant,
      description,
      status,
      cancelled_description,
      PromotorProduct.fromJson(promotorProduct),
      almaceneroModel
    );
  }
  constructor(
    public id: number,
    public createdAt: Date,
    public updatedAt: Date,
    public date: Date,
    public cant: number,
    public description: string,
    public status: string,
    public cancelled_description: string | null,
    public promotorProduct: PromotorProduct,
    public almacenero: UserSmall | null
  ) {}
}

class PromotorProduct {
  public static fromJson({
    id,
    createdAt,
    updatedAt,
    cant,
    cant_out,
    cant_returned,
    user,
    product,
  }: any) {
    return new PromotorProduct(
      id,
      createdAt,
      updatedAt,
      cant,
      cant_out,
      cant_returned,
      user,
      Product.fromJson(product)
    );
  }
  constructor(
    public id: number,
    public createdAt: Date,
    public updatedAt: Date,
    public cant: number,
    public cant_out: number,
    public cant_returned: number,
    public user: UserSmall,
    public product: Product
  ) {}
}

class Product {
  public static fromJson({
    id,
    createdAt,
    updatedAt,
    name,
    code,
    description,
    profit,
    image,
    price,
  }: any) {
    return new Product(
      id,
      createdAt,
      updatedAt,
      name,
      code,
      description,
      profit,
      image,
      price
    );
  }
  constructor(
    public id: number,
    public createdAt: Date,
    public updatedAt: Date,
    public name: string,
    public code: string,
    public description: string,
    public profit: number,
    public image: string,
    public price: number
  ) {}
}
