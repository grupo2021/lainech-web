export class Lote {
  public static fromJson(json: any) {
    const {
      id,
      createdAt,
      updatedAt,
      code,
      cant,
      cant_out,
      price,
      register,
      expiry,
    } = json;

    return new Lote(
      id,
      createdAt,
      updatedAt,
      code,
      cant,
      cant_out,
      price,
      register,
      expiry
    );
  }

  constructor(
    public id: number,
    public createdAt: Date,
    public updatedAt: Date,
    public code: string,
    public cant: number,
    public cant_out: number,
    public price: number,
    public register: Date,
    public expiry: Date
  ) {}
}
