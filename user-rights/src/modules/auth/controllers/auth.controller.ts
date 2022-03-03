import { Request as Req } from "express";
import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
} from "../../../common/decorators";
import { AuthFieldGuard } from "../../common/guards/auth-fied.guard";
import { AuthJwtGuard } from "../../common/guards/auth-jwt.guard";
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
  logins(@Body() user: { email: string; password: string }): { token: string } {
    return this._authService.generateToken(user);
  }

  @UseGuards(AuthJwtGuard)
  @Post("/profile")
  profile(@Request() { user }: Req) {
    return { user };
  }
}
