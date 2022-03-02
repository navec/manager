import { ExtractJwt } from "passport-jwt";
import { JwtStrategy } from "../../../common/strategies/jwt.strategy";

export class AuthJwtStrategy extends JwtStrategy {
  static JWT_STRATEGY_NAME = "auth_jwt";

  constructor(name = AuthJwtStrategy.JWT_STRATEGY_NAME) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "secret",
    });
    AuthJwtStrategy.JWT_STRATEGY_NAME = name;
    this.name = name;
  }
}
