import { Router } from "express";
import { MODULE_ROUTERS } from "../../common/constants";
import { Module } from "../../common/decorators";
import { IModule } from "../../types";
import { AuthJwtStrategy } from "../common/strategies/auth-jwt.strategy";
import { HealthController } from "./controllers/health.controller";

@Module({ controllers: [HealthController], strategies: [AuthJwtStrategy] })
export class HealthModule implements IModule {
  private _routers: Router[];

  constructor() {
    this._routers = Reflect.getMetadata(MODULE_ROUTERS, HealthModule);
  }

  get routes(): Router[] {
    return this._routers;
  }
}
