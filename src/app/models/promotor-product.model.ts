import { Category } from './category.model';

export class PromotorProduct {
  public static fromJson({
    id,
    createdAt,
    updatedAt,
    cant,
    cant_out,
    product,
  }: any) {
    return new PromotorProduct(
      id,
      createdAt,
      updatedAt,
      cant,
      cant_out,
      SoftProduct.fromJson(product)
    );
  }

  constructor(
    public id: number,
    public createdAt: Date,
    public updatedAt: Date,
    public cant: number,
    public cant_out: number,
    public product: SoftProduct
  ) {}
}

class SoftProduct {
  public static fromJson({
    id,
    name,
    code,
    description,
    profit,
    image,
    price,
    category,
  }: any) {
    return new SoftProduct(
      id,
      name,
      code,
      description,
      profit,
      image,
      price,
      Category.fromJson(category)
    );
  }

  constructor(
    public id: string,
    public name: string,
    public code: string,
    public description: string,
    public profit: number,
    public image: string,
    public price: number,
    public category: Category
  ) {}
}
