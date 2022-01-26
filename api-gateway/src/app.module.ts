import { Express } from "express-serve-static-core";
import { Logger } from "winston";
import { HealthModule } from "./modules/health/health.module";

export class AppModule {
  private static readonly moduleList = [new HealthModule()];

  static create(server: Express, { logger }: { logger: Logger }) {
    this.moduleList.forEach((module) => {
      logger.info(`${module.constructor.name} dependencies initialized`);

      module.routers.forEach(({ path, type }) => {
        logger.info(`Mapped {${path}, ${type}} route`);
      });

      const routers = module.routers.map(({ callback }) => callback);
      server.use(routers);
    });
  }
}
