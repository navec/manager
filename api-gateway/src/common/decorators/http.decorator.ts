import { IRoute } from "../../types";
import { ROUTER } from "../constants";

export function GET(path = ""): MethodDecorator {
  return <T>(target: Object, propertyKey: string | symbol) => {
    const controllerClass = target.constructor;
    const routers: IRoute[] =
      Reflect.getMetadata(ROUTER, controllerClass) || [];
    routers.push({ method: "get", path, handlerName: propertyKey });
    Reflect.defineMetadata(ROUTER, routers, controllerClass);
  };
}
