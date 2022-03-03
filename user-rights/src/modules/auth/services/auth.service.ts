import jwt from "jsonwebtoken";
import { Injectable } from "../../../common/decorators";
import { UsersService } from "../../users/services/users.service";
import { IToken } from "../interfaces/token.interface";

@Injectable()
export class AuthService {
  constructor(private readonly _usersService: UsersService) {}

  createUser(user: { email: string; password: string }): {
    email: string;
  } {
    return this._usersService.create(user);
  }

  generateToken(user: { email: string; password: string }): IToken {
    const currentUser = this._usersService.findOneByEmail(user.email);

    if (!currentUser || !currentUser.isValidPassword(user.password)) {
      throw new Error("email or password is not valid.");
    }

    const { password, ...payload } = user;
    return { token: jwt.sign(payload, "secret") };
  }
}
