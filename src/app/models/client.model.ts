import { UserSmall } from './user-small.model';

export class Client {
  public static fromJson(json: any) {
    const {
      id,
      createdAt,
      updatedAt,
      name,
      surname,
      address,
      phones,
      identification_number,
      image,
      coords,
      user,
    } = json;
    return new Client(
      id,
      createdAt,
      updatedAt,
      name,
      surname,
      address,
      phones,
      identification_number,
      image,
      coords,
      UserSmall.fromJson(user)
    );
  }
  constructor(
    public id: number,
    public createdAt: Date,
    public updatedAt: Date,
    public name: string,
    public surname: string,
    public address: string,
    public phones: string,
    public identification_number: string,
    public image: string,
    public coords: string,
    public user: UserSmall
  ) {}
}
