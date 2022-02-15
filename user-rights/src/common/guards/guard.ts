import { NextFunction, Request, Response } from "express";
import passport from "passport";

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
    passport.authenticate(this._name, { session: false }, (err, user, info) => {
      const data = this.validate(err, user, info);
      req.user = data;
      next();
    })(req, res, next);
  }
}
