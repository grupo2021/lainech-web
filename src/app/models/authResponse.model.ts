import { User } from './user.model';

export class AuthResponse {
  public static fromJson(json: any) {
    const { data, access_token } = json;
    return new AuthResponse(User.fromJson(data), access_token);
  }
  constructor(public user: User, public accessToken: string) {}
}
