import { Router } from "express";
import { logger } from "../../config/logger.config";
import { IRoute } from "../../types";
import {
  BASE_PATH,
  MODULE,
  MODULE_METADATA,
  MODULE_ROUTERS,
  ROUTER,
} from "../constants";
import { Injector } from "../injectors/injector";

const expressRouter = Router();

export function Module(options: any) {
  return function <T extends Function>(target: T) {
    checkAllowedModuleKeys(target.name, Object.keys(options));
    Reflect.defineMetadata(MODULE, true, target);

    logger.info(`${target.name} is loaded`);

    const allRouters = options.controllers.reduce(
      (acc: Router[], controller: any) => {
        const base = Reflect.getMetadata(BASE_PATH, controller);
        const routers = Reflect.getMetadata(ROUTER, controller);
        const controllerInstance = Injector.resolve(controller);
        const expressRouters = buildRouters(routers, base, controllerInstance);
        return [...acc, ...expressRouters];
      },
      []
    ) as Router[];
    Reflect.defineMetadata(MODULE_ROUTERS, allRouters, target);
  };
}

function buildRouters(
  getRouters: IRoute[],
  basePath: string,
  controller: any
): Router[] {
  return getRouters.map(({ method, path, handlerName }) => {
    const uri = `${basePath}${path}`;
    const middleware = controller[handlerName].bind(controller);
    logger.info(`Mapped { ${uri}, ${method.toLocaleUpperCase()} } route`);
    return (expressRouter as any)[method](uri, middleware);
  });
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
