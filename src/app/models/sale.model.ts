import { UserSmall } from './user-small.model';

export class Sale {
  public static fromJson({
    id,
    createdAt,
    updatedAt,
    date,
    total,
    status,
    client,
    user,
    saleDetails,
  }: any) {
    let details: any[] = [];
    if (saleDetails) {
      const rds = saleDetails as [];
      details = rds.map((r) => SaleDetail.fromJson(r));
    }
    if (!client) {
      return new Sale(
        id,
        createdAt,
        updatedAt,
        date,
        total,
        status,
        UserSmall.fromJson(user),
        null,
        details
      );
    }

    return new Sale(
      id,
      createdAt,
      updatedAt,
      date,
      total,
      status,
      UserSmall.fromJson(user),
      Client.fromJson(client) ?? null,
      details
    );
  }

  constructor(
    public id: number,
    public createdAt: Date,
    public updatedAt: Date,
    public date: number,
    public total: number,
    public status: string,
    public user: UserSmall,
    public client: Client | null,
    public saleDetails: SaleDetail[]
  ) {}
}

class SaleDetail {
  public static fromJson({
    id,
    createdAt,
    updatedAt,
    subtotal,
    cant,
    precio_unitario,
    product,
  }: any) {
    return new SaleDetail(
      id,
      createdAt,
      updatedAt,
      subtotal,
      cant,
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
    public precio_unitario: number,
    public product: Product
  ) {}
}

class Product {
  public static fromJson({
    id,
    name,
    code,
    description,
    image,
    profit,
    price,
    createdAt,
    updatedAt,
  }: any) {
    return new Product(
      id,
      name,
      code,
      description,
      image,
      profit,
      price,
      createdAt,
      updatedAt
    );
  }

  constructor(
    public id: number,
    public name: string,
    public code: string,
    public description: string,
    public image: string,
    public profit: number,
    public price: number,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}

class Client {
  public static fromJson({ id, name, surname, address, phones }: any) {
    return new Client(id, name, surname, address, phones);
  }
  constructor(
    public id: number,
    public name: string,
    public surname: string,
    public address: string,
    public phones: string
  ) {}
}
