import { Express } from "express-serve-static-core";
import { HealthModule } from "./modules/health/health.module";

export class AppModule {
  private static readonly moduleList = [new HealthModule()];

  static create(server: Express) {
    this.moduleList.forEach((module) => server.use(module.routers));
  }
}
