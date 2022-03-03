import { Injectable } from "../../../common/decorators";
import { User } from "../dtos/user.dto";
import { IUser } from "../interfaces/user.interface";

@Injectable()
export class UsersService {
  private _userList = new Map<string, User>();

  create(user: IUser): { email: string } {
    if (this._userList.has(user.email)) {
      throw new Error("User already exists.");
    }
    this._userList.set(user.email, User.fromIUser(user));
    return { email: user.email };
  }

  findOneByEmail(email: string): User | undefined {
    return this._userList.get(email);
  }
}
