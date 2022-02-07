import { INJECTABLE } from "../constants";

export function Injectable(): ClassDecorator {
  return function <T extends Function>(target: T) {
    Reflect.defineMetadata(INJECTABLE, true, target);
  };
}
