export interface IRoute {
  method: string;
  path: string;
  handlerName: string | symbol;
}
