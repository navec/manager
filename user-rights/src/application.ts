import bodyParser from "body-parser";
import express, { Express } from "express";
import "reflect-metadata";
import { logger } from "./config/logger.config";
import { IModule } from "./types";

export class Application {
  private static app: Application;
  private static server: Express;
  private _modules: IModule[] = [];

  private constructor() {
    Application.server = express();
    Application.server.use(bodyParser.urlencoded({ extended: false }));
    Application.server.use(bodyParser.json({ strict: true }));
  }

  static createServer(): Application {
    if (!this.app) {
      this.app = new Application();
    }
    return this.app;
  }

  addModules(modules: IModule[]): Application {
    this._modules = [...this._modules, ...modules];
    return this;
  }

  start(port: number): Application {
    this._modules.forEach((module) => Application.server.use(module.routes));

    Application.server.listen(port, () => {
      logger.info(`Api gatewait listening at http://localhost:${port}`);
    });
    return this;
  }

  getHttpServer(): express.Express {
    return Application.server;
  }
}
