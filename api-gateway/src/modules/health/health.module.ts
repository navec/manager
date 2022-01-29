import { Router } from "express";
import { MODULE_ROUTERS } from "../../common/constants";
import { Module } from "../../common/decorators";
import { HealthController } from "./controllers/health.controller";

@Module({ controllers: [HealthController] })
export class HealthModule {
  private _routers: Router[] = [];

  constructor() {
    this._routers = Reflect.getMetadata(MODULE_ROUTERS, HealthModule);
  }

  get routers(): Router[] {
    return this._routers;
  }
}
