import { UserSmall } from './user-small.model';

export class ReloadReport {
  public static fromJson({
    id,
    createdAt,
    updatedAt,
    date,
    total,
    return_description,
    status,
    user,
    almacenero,
    details,
  }: any) {
    let almaceneroModel = null;
    if (almacenero) {
      almaceneroModel = UserSmall.fromJson(almacenero);
    }
    return new ReloadReport(
      id,
      createdAt,
      updatedAt,
      date,
      total,
      return_description,
      status,
      UserSmall.fromJson(user),
      almaceneroModel,
      Detail.fromArrJson(details)
    );
  }
  constructor(
    public id: number,
    public createdAt: Date,
    public updatedAt: Date,
    public date: Date,
    public total: number,
    public return_description: string | null,
    public status: string,
    public user: UserSmall,
    public almacenero: UserSmall | null,
    public details: Detail[]
  ) {}
}

class Detail {
  public static fromArrJson(arr: any) {
    const jsons = arr as [];
    return jsons.map((j) => this.fromJson(j));
  }

  public static fromJson({
    id,
    createdAt,
    updatedAt,
    subtotal,
    cant,
    cant_sold,
    precio_unitario,
    product,
  }: any) {
    return new Detail(
      id,
      createdAt,
      updatedAt,
      subtotal,
      cant,
      cant_sold,
      precio_unitario,
      Product.fromJson(product)
    );
  }

  constructor(
    public id: number,
    public createdAt: Date,
    public updatedAt: Date,
    public subtotal: number,
    public cant: number,
    public cant_sold: number,
    public precio_unitario: number,
    public product: Product
  ) {}
}

class Product {
  public static fromJson({
    id,
    createdAt,
    updatedAt,
    name,
    code,
    description,
    profit,
    image,
    price,
  }: any) {
    return new Product(
      id,
      createdAt,
      updatedAt,
      name,
      code,
      description,
      profit,
      image,
      price
    );
  }
  constructor(
    public id: number,
    public createdAt: Date,
    public updatedAt: Date,
    public name: string,
    public code: string,
    public description: string,
    public profit: number,
    public image: string,
    public price: number
  ) {}
}
