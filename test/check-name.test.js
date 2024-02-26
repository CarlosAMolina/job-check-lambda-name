import { describe, expect, it } from "@jest/globals";

import { exportedForTesting } from "../src/check-name.js";

describe("Check function show_string_analysis", function () {
  it("Check runs without error", function () {
    expect(exportedForTesting.show_string_analysis("foo"));
  });
});

describe("Check function get_string_modified_by_deploy_pipe", function () {
  it("Check expected value", function () {
    expect(exportedForTesting.get_string_modified_by_deploy_pipe("foo")).toBe(
      "Deploy-foo-dev",
    );
  });
});

describe("Check function has_allowed_size", function () {
  it("Check is true", function () {
    const string = "a".repeat(86);
    expect(exportedForTesting.has_allowed_size(string)).toBe(true);
  });
  it("Check is false", function () {
    const string = "a".repeat(87);
    expect(exportedForTesting.has_allowed_size(string)).toBe(false);
  });
});
