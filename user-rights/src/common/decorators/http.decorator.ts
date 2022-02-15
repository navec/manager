import { HTTP_METADATA, ROUTER } from "../constants";

function HttpMethodDecorator(method: string, path = ""): MethodDecorator {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>
  ) => {
    const controllerClass = target.constructor;
    const routers = Reflect.getMetadata(ROUTER, controllerClass) || [];
    routers.push({ method, path, handlerName: propertyKey });
    Reflect.defineMetadata(ROUTER, routers, controllerClass);

    const originalFn = descriptor.value;
    descriptor.value = function (data: any) {
      const args = Object.values(HTTP_METADATA)
        .map((item) => Reflect.getMetadata(item, target, propertyKey))
        .filter(Boolean)
        .sort((a: any, b: any) => a.index - b.index)
        .map((item) => data[item.type]);
      return originalFn.call(this, ...args);
    };
  };
}

export const Get = (path = "") => HttpMethodDecorator("get", path);
export const Post = (path = "") => HttpMethodDecorator("post", path);
export const Patch = (path = "") => HttpMethodDecorator("patch", path);
export const Put = (path = "") => HttpMethodDecorator("put", path);
export const Delete = (path = "") => HttpMethodDecorator("delete", path);
