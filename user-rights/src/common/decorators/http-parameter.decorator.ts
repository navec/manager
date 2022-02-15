import { HTTP_METADATA } from "../constants";

function HttpDecoratorParameter(metadatakey: symbol, type: string) {
  return <T>(target: T, key: string | symbol, index: number) => {
    Reflect.defineMetadata(metadatakey, { index: index, type }, target, key);
  };
}

export const Params = () => {
  return HttpDecoratorParameter(HTTP_METADATA.PARAMS, "params");
};

export const Body = () => {
  return HttpDecoratorParameter(HTTP_METADATA.BODY, "body");
};

export const Query = () => {
  return HttpDecoratorParameter(HTTP_METADATA.QUERY, "query");
};

export const Response = () => {
  return HttpDecoratorParameter(HTTP_METADATA.RESPONSE, "res");
};

export const Request = () => {
  return HttpDecoratorParameter(HTTP_METADATA.REQUEST, "req");
};

export const Next = () => {
  return HttpDecoratorParameter(HTTP_METADATA.NEXT, "next");
};
