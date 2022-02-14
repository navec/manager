import { Injectable } from "../../../common/decorators";
import { Guard } from "../../../common/guards/guard";
import { SignupStrategy } from "../strategies/signup.strategy";

@Injectable()
export class SignupGuard extends Guard {
  constructor() {
    super(SignupStrategy.SIGN_UP_STRATEGY_NAME);
  }
}
