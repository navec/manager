import { GUARD } from "../constants";

export function UseGuards(
  ...guardsClass: Function[]
): ClassDecorator & MethodDecorator {
  return (target: any) => {
    // return (target: any, propertyKey: string | symbol, desc) => {
    if (!guardsClass) {
      throw new Error("invalid decorator");
    }
    // console.log("debug :: ", {
    //   target,
    //   name: propertyKey,
    //   desc: desc.value,
    //   constructor: target.constructor,
    //   guardsClass,
    // });
    const previousValue = Reflect.getMetadata(GUARD, target) || [];
    const value = [...previousValue, ...guardsClass];
    Reflect.defineMetadata(GUARD, value, target.constructor);
  };
}
