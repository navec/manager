import { Injectable } from "../../../common/decorators";
import { Guard } from "../../../common/guards/guard";
import { AuthFieldStrategy } from "../strategies/auth-field.strategy";

@Injectable()
export class AuthFieldGuard extends Guard {
  constructor() {
    super(AuthFieldStrategy.SIGN_UP_STRATEGY_NAME);
  }
}
