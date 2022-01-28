export class BestProductReport {
  public static fromJson({ product, cant_acum, total_acum }: any) {
    return new BestProductReport(product, cant_acum, total_acum);
  }
  constructor(
    public product: string,
    public cant_acum: number,
    public total_acum: number
  ) {}
}
