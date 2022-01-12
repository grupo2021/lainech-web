export class DataReport {
  public static fromJson({ id, name, email, report }: any) {
    let reports: any[] = [];
    if (report) {
      const re = report as [];
      reports = re.map((r) => Report.fromJson(r));
    }
    return new DataReport(id, name, email, reports);
  }

  constructor(
    public id: number,
    public name: string,
    public email: string,
    public reports: Report[]
  ) {}
}
class Report {
  public static fromJson({
    id,
    createdAt,
    updatedAt,
    date,
    total,
    status,
    details,
  }: any) {
    let detailsTransform: any[] = [];
    if (details) {
      const rds = details as [];
      detailsTransform = rds.map((r) => Detail.fromJson(r));
    }

    return new Report(
      id,
      createdAt,
      updatedAt,
      date,
      total,
      status,
      detailsTransform
    );
  }

  constructor(
    public id: number,
    public createdAt: Date,
    public updatedAt: Date,
    public date: number,
    public total: number,
    public status: string,
    public details: Detail[]
  ) {}
}

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
