import { ReloadDetail } from './reload-detail.model';
import { UserSmall } from './user-small.model';

export class Reload {
  public static fromJson({
    id,
    createdAt,
    updatedAt,
    date,
    total,
    status,
    user,
    reloadDetails,
  }: any) {
    let details: any[] = [];
    if (reloadDetails) {
      const rds = reloadDetails as [];
      details = rds.map((r) => ReloadDetail.fromJson(r));
    }

    return new Reload(
      id,
      createdAt,
      updatedAt,
      date,
      total,
      status,
      UserSmall.fromJson(user),
      details
    );
  }

  constructor(
    public id: number,
    public createdAt: Date,
    public updatedAt: Date,
    public date: number,
    public total: number,
    public status: ReloadStatus,
    public user: UserSmall,
    public reloadDetails: ReloadDetail[]
  ) {}
}

export enum ReloadStatus {
  ANULADO = 'ANULADO',
  PENDIENTE = 'PENDIENTE',
  APROBADO = 'APROBADO',
}
