import { Controller, Post, UseGuards } from "../../../common/decorators";
import { SignupGuard } from "../guards/signup.guard";

// export class User {
//   email: string;
//   passport: string;
//   constructor(email: string, passport: string) {
//     this.email = email;
//     this.passport = passport;
//   }
// }

// passport.use(
//   "login",
//   new LocalStrategy(
//     {
//       usernameField: "email",
//       passwordField: "passport",
//     },
//     (email: string, passport: string, done: Function) => {
//       try {
//         // Find user
//         const user = new User(email, passport);
//         // user.isValidPassword(password)
//         const isValide = true;
//         if (!isValide) {
//           return done(null, false, { message: "Wrong Password" });
//         }
//         return done(null, user, { message: "Logged in Successfully" });
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );

export const TEST_PARAM_KEY = Symbol("testParamKey");
function DecoratedParameter() {
  return <T>(target: T, key: string | symbol, paramIndex: number) => {
    console.log({ target, key, paramIndex, name });
    Reflect.defineMetadata(TEST_PARAM_KEY, paramIndex, target, key);
    const params = Reflect.getOwnMetadata(TEST_PARAM_KEY, target, key) || [];

    console.log(params);
  };
}
@Controller("/auth")
export class AuthController {
  // constructor(private readonly _authService: AuthService) {}

  @UseGuards(SignupGuard)
  @Post("/signup")
  signup(@DecoratedParameter() { req }: any): any {
    const { user } = req;
    return user;
    // return this._authService.createUser(user);
  }

  // @Post("/login")
  // login(): void {}
}
