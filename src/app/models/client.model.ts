export class Client {
  public static fromJson(json: any) {
    const { id, createdAt, updatedAt, name, surname, address, phones } = json;
    return new Client(id, createdAt, updatedAt, name, surname, address, phones);
  }
  constructor(
    public id: number,
    public createdAt: Date,
    public updatedAt: Date,
    public name: string,
    public surname: string,
    public address: string,
    public phones: string
  ) {}
}
