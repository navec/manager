import { Body, Controller, Post, UseGuards } from "../../../common/decorators";
import { SignupGuard } from "../guards/signup.guard";
import { AuthService } from "../services/auth.service";

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

@Controller("/auth")
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @UseGuards(SignupGuard)
  @Post("/signup")
  signup(@Body() user: { email: string; passport: string }): { email: string } {
    return this._authService.createUser(user);
  }

  // @Post("/login")
  // login(): void {}
}
