import { BASE_PATH, CONTROLLER } from "../constants";

export function Controller(basePath = ""): ClassDecorator {
  return <T extends Function>(target: T) => {
    Reflect.defineMetadata(BASE_PATH, basePath, target);
    Reflect.defineMetadata(CONTROLLER, true, target);
  };
}
