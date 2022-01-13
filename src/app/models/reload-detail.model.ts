import { Product } from './product.model';

export class ReloadDetail {
  public static fromJson({
    id,
    createdAt,
    updatedAt,
    subtotal,
    precio_unitario,
    cant,
    cant_sold,
    product,
  }: any) {
    return new ReloadDetail(
      id,
      createdAt,
      updatedAt,
      subtotal,
      precio_unitario,
      cant,
      cant_sold,
      Product.fromJson(product)
    );
  }

  constructor(
    public id: number,
    public createdAt: Date,
    public updatedAt: Date,
    public subtotal: number,
    public precio_unitario: number,
    public cant: number,
    public cant_sold: number,
    public product: Product
  ) {}
}
