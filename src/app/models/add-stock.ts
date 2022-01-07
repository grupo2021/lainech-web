import { Product } from './product.model';

export class ProductStock {
  public static fromProduct(product: Product, cant: number) {
    return new ProductStock(
      product.id,
      product.name,
      product.price,
      product.image,
      cant,
      cant * product.price
    );
  }
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public image: string,
    public cant: number,
    public subtotal: number
  ) {}
}
