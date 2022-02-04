import { Given, Then, When } from "@cucumber/cucumber";
import assert from "assert";
import request from "supertest";
import { context } from "./common.step";

Given("an average user", function (dataTable) {
  // Write code here that turns the phrase above into concrete actions
  // return "pending";
});

When("he calls {string}", async function (endpoint: string) {
  const server = context.app?.getHttpServer();
  const { body, status } = await request(server).get(endpoint);
  context.response = { body, status };
});

Then("the status is {int}", function (expectedStatus: number) {
  assert.strictEqual(context.response?.status, expectedStatus);
});

Then("the body response is {string}", function (body: string) {
  const expected = JSON.parse(body);
  assert.deepStrictEqual(context.response?.body, expected);
});
