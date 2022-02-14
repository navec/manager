import { LocalStrategy } from "../../../common/strategies/local.strategie";

export class SignupStrategy extends LocalStrategy {
  static SIGN_UP_STRATEGY_NAME = "signup";

  constructor(name = "signup") {
    super({ usernameField: "email", passwordField: "passport" });
    SignupStrategy.SIGN_UP_STRATEGY_NAME = name;
    this.name = name;
  }
}
