import { User } from "../dtos/user.dto";
import { IUser } from "../interfaces/user.interface";

export class UserBuilder {
  private user: IUser;

  constructor(user?: User) {
    this.user = user ? user.toJSON() : ({} as IUser);
  }

  email(email: string): UserBuilder {
    this.user.email = email;
    return this;
  }

  password(password: string): UserBuilder {
    this.user.password = password;
    return this;
  }

  build(): User {
    return User.fromJSON(this.user);
  }
}
