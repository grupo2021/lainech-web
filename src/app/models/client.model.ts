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
      trade_name,
      type,
      person_charge,
      phone_person_charge,
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
      trade_name,
      type,
      person_charge,
      phone_person_charge,
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
    public trade_name: string,
    public type: string,
    public person_charge: string,
    public phone_person_charge: string,
    public user: UserSmall
  ) {}
}
