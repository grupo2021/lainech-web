import { PromotorProduct } from './promotor-product.model';

export class Returns {
  public static fromJson({
    id,
    createdAt,
    updatedAt,
    date,
    cant,
    status,
    description,
    cancelled_description,
    promotorProduct,
  }: any) {
    return new Returns(
      id,
      createdAt,
      updatedAt,
      date,
      cant,
      status,
      description,
      cancelled_description,
      promotorProduct
    );
  }
  constructor(
    public id: number,
    public createdAt: Date,
    public updatedAt: Date,
    public date: Date,
    public cant: number,
    public status: string,
    public description: string,
    public cancelled_description: string,
    public promotorProduct: PromotorProduct
  ) {}
}
