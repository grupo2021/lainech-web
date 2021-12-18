export class Profile {
  public static fromJson(json: any) {
    const {
      id,
      createdAt,
      updatedAt,
      name,
      surname,
      phones,
      address,
      identificationNumber,
      photo,
    } = json;

    return new Profile(
      id,
      createdAt,
      updatedAt,
      name,
      surname,
      phones,
      address,
      identificationNumber,
      photo
    );
  }
  constructor(
    public id: number,
    public createdAt: Date,
    public updatedAt: Date,
    public name: string,
    public surname: string | null,
    public phones: string | null,
    public address: string | null,
    public identificationNumber: string | null,
    public photo: string | null
  ) {}
}
