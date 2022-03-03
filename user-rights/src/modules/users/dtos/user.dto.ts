import { UserBuilder } from "../builders/user.builder";
import { IUser } from "../interfaces/user.interface";

export class User {
  readonly email: string;
  readonly password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  isValidPassword(password: string): boolean {
    return password === this.password;
  }

  toJSON(): IUser {
    return { email: this.email, password: this.password };
  }

  static fromJSON(user: IUser): User {
    return new User(user.email, user.password);
  }

  static fromIUser(user: IUser): User {
    return User.builder().email(user.email).password(user.password).build();
  }

  static builder(user?: User): UserBuilder {
    return new UserBuilder(user);
  }
}
