import { Profile } from './profile.model';

export class User {
  public static fromJson(json: any) {
    const { id, createdAt, updatedAt, name, email, status, profile, role } =
      json;

    return new User(
      id,
      createdAt,
      updatedAt,
      name,
      email,
      status,
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
    public status: string,
    public profile: Profile,
    public role: string
  ) {}
}
