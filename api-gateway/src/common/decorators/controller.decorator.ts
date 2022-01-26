export function Controller(): ClassDecorator {
  return (target: object) => {
    Reflect.defineMetadata("__controller__", true, target);
  };
}
