import { Client } from './client.model';
import { Detail } from './detail.model';
import { UserSmall } from './user-small.model';

export class SaleReport {
  public static fromJson({
    id,
    createdAt,
    updatedAt,
    date,
    total,
    status,
    user,
    client,
    details,
  }: any) {
    let clientModel = null;
    if (client) {
      clientModel = Client.fromJson(client);
    }
    return new SaleReport(
      id,
      createdAt,
      updatedAt,
      date,
      total,
      status,
      UserSmall.fromJson(user),
      clientModel,
      Detail.fromArrJson(details)
    );
  }

  constructor(
    public id: number,
    public createdAt: Date,
    public updatedAt: Date,
    public date: Date,
    public total: number,
    public status: string,
    public user: UserSmall,
    public client: Client | null,
    public details: Detail[]
  ) {}
}
