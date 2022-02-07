import { Request, Response, Router } from "express";
import "reflect-metadata";
import { logger } from "../../config/logger.config";
import { IRoute } from "../../types/route.interface";
import { GUARD } from "../constants";
import { Injector } from "../injectors/injector";

type Error = { status: number; message: string }; // create manager error
export class MiddlewareHelper {
  private static readonly expressRouter = Router();

  static buildExpressRouters(options: {
    routerList: IRoute[];
    basePath: string;
    controller: any;
  }): Router[] {
    const { routerList: getRouters, basePath, controller } = options;
    const ctrlInstance = Injector.resolve<any>(controller);
    const hasGuard = Reflect.getMetadata(GUARD, controller);
    return getRouters.map(({ method, path, handlerName }) => {
      const uri = `${basePath}${path}`;
      const controllerFn = ctrlInstance[handlerName].bind(ctrlInstance);
      const middleware = this._wrapControllerFn(controllerFn, method);

      logger.info(`Mapped { ${uri}, ${method.toLocaleUpperCase()} } route`);
      const router = (this.expressRouter as any)[method](uri, middleware);
      if (hasGuard) {
        // Should return router with auth middleware ('uri', authMiddleware, middleware)
      }
      return router;
    });
  }

  private static _wrapControllerFn(controllerFn: Function, method: string) {
    return (req: Request, res: Response) => {
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
}
