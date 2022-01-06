import { Category } from './category.model';
import { Lote } from './lote.model';

export class Product {
  public static fromJson(json: any) {
    const {
      id,
      createdAt,
      updatedAt,
      name,
      code,
      price,
      description,
      profit,
      image,
      category,
      lotes,
    } = json;

    let newLotes: any[] = [];
    if (lotes) {
      const lo = lotes as [];
      newLotes = lo.map((l) => Lote.fromJson(l));
    }
    return new Product(
      id,
      createdAt,
      updatedAt,
      name,
      code,
      price,
      description,
      profit,
      image,
      Category.fromJson(category),
      newLotes
    );
  }
  constructor(
    public id: number,
    public createdAt: Date,
    public updatedAt: Date,
    public name: string,
    public code: string,
    public price: number,
    public description: string,
    public profit: number,
    public image: string,
    public category: Category,
    public lotes: Lote[]
  ) {}
}
