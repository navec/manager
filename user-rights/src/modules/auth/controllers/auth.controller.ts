import { Body, Controller, Post, UseGuards } from "../../../common/decorators";
import { AuthFieldGuard } from "../guards/auth-fied.guard";
import { AuthService } from "../services/auth.service";

@Controller("/auth")
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @UseGuards(AuthFieldGuard)
  @Post("/signup")
  signup(@Body() user: { email: string; password: string }): { email: string } {
    return this._authService.createUser(user);
  }

  @UseGuards(AuthFieldGuard)
  @Post("/login")
  login(@Body() user: { email: string; password: string }): { token: string } {
    return this._authService.generateToken(user);
  }
}
