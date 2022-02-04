import express, { Express } from "express";
import "reflect-metadata";
import { logger } from "./config/logger.config";
import { HealthModule, IModule } from "./modules/health/health.module";

export class Application {
  private static app: Application;
  private static server: Express;
  private modules: IModule[] = [];

  private constructor() {
    Application.server = express();
  }

  static createServer(): Application {
    if (!this.app) {
      this.app = new Application();
    }
    return this.app;
  }

  addModules(modules: IModule | IModule[]): Application {
    const modulesToAdd = Array.isArray(modules)
      ? modules.filter((module) => !this.modules.includes(module))
      : [modules];
    this.modules = [...this.modules, ...modulesToAdd];
    return this;
  }

  start(port = 3000): Application {
    const modules = !!this.modules.length ? this.modules : [new HealthModule()];
    modules.forEach((module) => Application.server.use(module.routes));
    Application.server.listen(port, () => {
      logger.info(`Api gatewait listening at http://localhost:${port}`);
    });
    return this;
  }

  getHttpServer(): express.Express {
    return Application.server;
  }
}

Application.createServer().addModules(new HealthModule()).start();
