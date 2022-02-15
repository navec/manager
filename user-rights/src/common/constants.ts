export const MODULE_METADATA = {
  STRATEGIES: "strategies",
  CONTROLLERS: "controllers",
};

export const HTTP_METADATA = {
  PARAMS: Symbol("__http_params__"),
  BODY: Symbol("__http_body__"),
  QUERY: Symbol("__http_query__"),
  RESPONSE: Symbol("__http_response__"),
  REQUEST: Symbol("__http_request__"),
  NEXT: Symbol("__http_next__"),
};

export const INJECTABLE = "__injectable__";
export const CONTROLLER = "__controller__";
export const MODULE = "__module__";
export const GUARD = "__guard__";
export const CONFIG = "__config__";

export const MODULE_ROUTERS = "module_routers";

export const ROUTER = "router";
export const BASE_PATH = "base_path";
