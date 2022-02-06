import { BeforeAll } from "@cucumber/cucumber";
import { Application } from "@src/application";

export const context: {
  app?: Application;
  body?: any;
  response?: { body: any; status: number } | any;
} = {};

BeforeAll(() => {
  context.app = Application.createServer().start(62986);
});
