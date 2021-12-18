import { Category } from './category.model';

export class Product {
  public static fromJson(json: any) {
    const {
      id,
      createdAt,
      updatedAt,
      name,
      code,
      description,
      basePrice,
      salePrice,
      stock,
      image,
      category,
    } = json;
    return new Product(
      id,
      createdAt,
      updatedAt,
      name,
      code,
      description,
      basePrice,
      salePrice,
      stock,
      image,
      Category.fromJson(category)
    );
  }
  constructor(
    public id: number,
    public createdAt: Date,
    public updatedAt: Date,
    public name: string,
    public code: string,
    public description: string,
    public basePrice: number,
    public salePrice: number,
    public stock: number,
    public image: string,
    public category: Category
  ) {}
}
