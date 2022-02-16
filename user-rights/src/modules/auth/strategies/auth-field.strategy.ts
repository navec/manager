import { LocalStrategy } from "../../../common/strategies/local.strategie";

export class AuthFieldStrategy extends LocalStrategy {
  static SIGN_UP_STRATEGY_NAME = "auth_field";

  constructor(name = AuthFieldStrategy.SIGN_UP_STRATEGY_NAME) {
    super({ usernameField: "email", passwordField: "password" });
    AuthFieldStrategy.SIGN_UP_STRATEGY_NAME = name;
    this.name = name;
  }
}
