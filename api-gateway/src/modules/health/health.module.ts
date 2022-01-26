import { Injector } from "../../common/injectors/injector";
import { IRoute } from "../../types";
import { HealthController } from "./controllers/health.controller";

export class HealthModule {
  private readonly healthController: HealthController;

  constructor() {
    this.healthController = Injector.resolve(HealthController);
  }

  get routers(): IRoute[] {
    return this.healthController.routes;
  }
}
