import { UserSmall } from './user-small.model';

export class BestSaleReport {
  public static fromJson({ id, name, user, total, cant, best_product }: any) {
    return new BestSaleReport(
      id,
      name,
      UserSmall.fromJson(user),
      total,
      cant,
      BestProduct.fromJson(best_product)
    );
  }

  constructor(
    public id: number,
    public name: string,
    public user: UserSmall,
    public total: number,
    public cant: number,
    public best_product: BestProduct
  ) {}
}

export class BestProduct {
  public static fromJson({ id, product, code, subtotal, cant }: any) {
    return new BestProduct(id, product, code, subtotal, cant);
  }
  constructor(
    public id: number,
    public product: string,
    public code: string,
    public subtotal: number,
    public cant: number
  ) {}
}
