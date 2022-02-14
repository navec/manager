import { Router } from "express";
import passport from "passport";
import { logger } from "../../config/logger.config";
import {
  BASE_PATH,
  MODULE,
  MODULE_METADATA,
  MODULE_ROUTERS,
  ROUTER,
} from "../constants";
import { MiddlewareHelper } from "../helpers/middleware.helper";
import { Injector } from "../injectors/injector";

export function Module(options: any) {
  return function <T extends Function>(target: T) {
    checkAllowedModuleKeys(target.name, Object.keys(options));
    Reflect.defineMetadata(MODULE, true, target);

    logger.info(`${target.name} is loaded`);

    (options.strategies || []).forEach((item: any) => {
      const strategy = Injector.resolve(item);
      passport.use(strategy);
    });

    const allRouters = options.controllers.reduce(
      (acc: Router[], controller: Function) => {
        const basePath = Reflect.getMetadata(BASE_PATH, controller);
        const routerList = Reflect.getMetadata(ROUTER, controller);
        const options = { routerList, basePath, controller };
        const routers = MiddlewareHelper.buildExpressRouters(options);
        return [...acc, ...routers];
      },
      []
    ) as Router[];
    Reflect.defineMetadata(MODULE_ROUTERS, allRouters, target);
  };
}

function checkAllowedModuleKeys(moduleName: string, keys: string[]): void {
  const allowedKeys = Object.values(MODULE_METADATA);
  const unexpectedKeys = keys.filter((key) => !allowedKeys.includes(key));

  if (unexpectedKeys.length > 0) {
    const newLocal = unexpectedKeys.join(",");
    const message = `${moduleName} bad configuration. [${newLocal}] keys are not authorized`;
    throw new Error(message);
  }
}
