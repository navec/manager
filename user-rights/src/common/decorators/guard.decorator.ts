import { GUARD } from "../constants";

export function UseGuards(guardClass: Function): MethodDecorator {
  return (target: any, propertyKey: string | symbol) => {
    if (!guardClass) {
      throw new Error("invalid decorator");
    }

    Reflect.defineMetadata(GUARD, guardClass, target.constructor, propertyKey);
  };
}
