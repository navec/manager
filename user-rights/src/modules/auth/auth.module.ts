import { Router } from "express";
import { MODULE_ROUTERS } from "../../common/constants";
import { Module } from "../../common/decorators";
import { IModule } from "../../types";
import { AuthController } from "./controllers/auth.controller";
import { AuthFieldStrategy } from "./strategies/auth-field.strategy";

@Module({ controllers: [AuthController], strategies: [AuthFieldStrategy] })
export class AuthModule implements IModule {
  private _routers: Router[];

  constructor() {
    this._routers = Reflect.getMetadata(MODULE_ROUTERS, AuthModule);
  }

  get routes(): Router[] {
    return this._routers;
  }
}
