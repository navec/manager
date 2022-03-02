import { Strategy, StrategyOptions, VerifiedCallback } from "passport-jwt";

export class JwtStrategy extends Strategy {
  constructor(opt: StrategyOptions) {
    super(opt, (payload: any, done: VerifiedCallback) => done(null, payload));
  }
}
