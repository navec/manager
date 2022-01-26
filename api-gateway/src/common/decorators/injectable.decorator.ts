export function Injectable(): ClassDecorator {
  return (target: object) => {
    Reflect.defineMetadata("__injectable__", true, target);
  };
}
