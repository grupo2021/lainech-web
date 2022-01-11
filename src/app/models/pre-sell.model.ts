import { Product } from './product.model';
import { PromotorProduct } from './promotor-product.model';

export class PreSell {
  public static fromPromotorProduct(product: PromotorProduct, cant: number) {
    return new PreSell(
      product.id,
      product.product.name,
      product.product.image,
      product.product.price,
      product.product.price * cant,
      cant
    );
  }

  constructor(
    public id: number,
    public name: string,
    public image: string,
    public price: number,
    public subtotal: number,
    public cant: number
  ) {}
}
