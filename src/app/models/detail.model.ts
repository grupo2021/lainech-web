import { Product } from './product.model';

export class Detail {
  public static fromJson({
    id,
    createdAt,
    updatedAt,
    subtotal,
    cant,
    precio_unitario,
    product,
  }: any) {
    return new Detail(
      id,
      createdAt,
      updatedAt,
      subtotal,
      cant,
      precio_unitario,
      Product.fromJson(product)
    );
  }

  public static fromArrJson(arr: any) {
    const jsons = arr as [];
    return jsons.map((j) => this.fromJson(j));
  }

  constructor(
    public id: number,
    public createdAt: Date,
    public updatedAt: Date,
    public subtotal: number,
    public cant: number,
    public precio_unitario: number,
    public product: Product
  ) {}
}
