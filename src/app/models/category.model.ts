export class Category {
  public static fromJson(json: any) {
    const { id, createdAt, updatedAt, name, code, description } = json;
    return new Category(id, createdAt, updatedAt, name, code, description);
  }
  constructor(
    public id: number,
    public createdAt: Date,
    public updatedAt: Date,
    public name: string,
    public code: string,
    public description: string
  ) {}
}
