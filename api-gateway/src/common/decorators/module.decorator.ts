import { Request, Response, Router } from "express";
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
    const controllerFn = controller[handlerName].bind(controller);
    logger.info(`Mapped { ${uri}, ${method.toLocaleUpperCase()} } route`);
    const middleware = wrapControllerFn(controllerFn, method);
    return (expressRouter as any)[method](uri, middleware);
  });
}

type Error = { status: number; message: string }; // create manager error
function wrapControllerFn(controllerFn: Function, method: string) {
  return (req: Request, res: Response) => {
    console.log("in module decorator");
    const { params, body, query } = req;
    try {
      const data = controllerFn({ params, body, query });
      const status = method === "POST" ? 201 : 200; // Create a method to get a default http status by method
      res.status(status).send(data);
    } catch (error) {
      const { status, message } = error as Error;
      res.status(status).send(message);
    }
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
