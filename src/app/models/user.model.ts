import { Profile } from './profile.model';

export class User {
  public static fromJson(json: any) {
    const { id, createdAt, updatedAt, name, email, profile, role } = json;

    return new User(
      id,
      createdAt,
      updatedAt,
      name,
      email,
      Profile.fromJson(profile),
      role
    );
  }

  constructor(
    public id: number,
    public createdAt: Date,
    public updatedAt: Date,
    public name: string,
    public email: string,
    public profile: Profile,
    public role: string
  ) {}
}
