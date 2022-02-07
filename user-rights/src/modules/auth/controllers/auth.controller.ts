import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Controller, POST } from "../../../common/decorators";

class User {
  email: string;
  passport: string;
  constructor(email: string, passport: string) {
    this.email = email;
    this.passport = passport;
  }
}
@Controller("/auth")
export class AuthController {
  constructor() {}

  @POST("/signup")
  signup(): Record<string, string> {
    passport.use(
      new LocalStrategy(
        {
          usernameField: "email",
          passwordField: "passport",
        },
        (email, passport, done) => {
          try {
            const user = new User(email, passport);
            done(null, user);
          } catch (error) {
            done(error);
          }
        }
      )
    );
    return { test: "running" };
  }
}
