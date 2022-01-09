export class UserSmall {
  public static fromJson({ id, name, email }: any) {
    return new UserSmall(id, name, email);
  }

  constructor(public id: number, public name: string, public email: string) {}
}
