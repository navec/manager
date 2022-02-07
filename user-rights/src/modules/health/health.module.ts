import { Router } from "express";
import { MODULE_ROUTERS } from "../../common/constants";
import { Module } from "../../common/decorators";
import { IModule } from "../../types";
import { HealthController } from "./controllers/health.controller";

@Module({ controllers: [HealthController] })
export class HealthModule implements IModule {
  private _routers: Router[];

  constructor() {
    this._routers = Reflect.getMetadata(MODULE_ROUTERS, HealthModule);
  }

  get routes(): Router[] {
    return this._routers;
  }
}
