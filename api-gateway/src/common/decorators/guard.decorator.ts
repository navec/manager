import { GUARD } from "../constants";

export function Guard(): ClassDecorator {
  return <T extends Function>(target: T) => {
    Reflect.defineMetadata(GUARD, true, target);
  };
}
