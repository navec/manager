import { Injectable } from "../../../common/decorators";
import { Guard } from "../../../common/guards/guard";
import { AuthJwtStrategy } from "../strategies/auth-jwt.strategy";

@Injectable()
export class AuthJwtGuard extends Guard {
  constructor() {
    super(AuthJwtStrategy.JWT_STRATEGY_NAME);
  }
}
