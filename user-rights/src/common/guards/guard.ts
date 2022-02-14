import { NextFunction, Request, Response } from "express";
import passport from "passport";
import {
  AuthController,
  TEST_PARAM_KEY,
} from "../../modules/auth/controllers/auth.controller";

export class Guard {
  private readonly _name: string;

  constructor(name: string) {
    this._name = name;
  }

  validate(...args: any[]): any {
    const [err, user, info] = args;
    if (err) throw err;
    if (info || !user) {
      throw new Error("Forbidden");
    }
    return user;
  }

  check(req: Request, res: Response, next: NextFunction) {
    const toto = new AuthController();
    console.log("debug", Reflect.getMetadata(TEST_PARAM_KEY, toto, "signup"));
    passport.authenticate(this._name, { session: false }, (err, user, info) => {
      const data = this.validate(err, user, info);
      req.user = data;
      next();
    })(req, res, next);
  }
}
