import { Category } from './category.model';
import { UserSmall } from './user-small.model';

export class PromotorProduct {
  public static fromJson({
    id,
    createdAt,
    updatedAt,
    cant,
    cant_out,
    cant_returned,
    product,
    user,
  }: any) {
    let usermodel: UserSmall | null = null;
    if (user) {
      usermodel = UserSmall.fromJson(user);
    }
    return new PromotorProduct(
      id,
      createdAt,
      updatedAt,
      cant,
      cant_out,
      cant_returned,
      SoftProduct.fromJson(product),
      usermodel
    );
  }

  constructor(
    public id: number,
    public createdAt: Date,
    public updatedAt: Date,
    public cant: number,
    public cant_out: number,
    public cant_returned: number,
    public product: SoftProduct,
    public user: UserSmall | null
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
