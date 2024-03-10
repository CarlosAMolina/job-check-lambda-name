import { describe, expect, it } from "@jest/globals";

import { exportedForTesting } from "../src/check-name.js";

describe("Check function showStringAnalysis", function () {
  it("Check runs without error", function () {
    expect(exportedForTesting.showStringAnalysis("foo"));
  });
});

describe("Check function getStringModifiedByDeployPipe", function () {
  it("Check expected value", function () {
    expect(exportedForTesting.getStringModifiedByDeployPipe("foo")).toBe(
      "Deploy-foo-dev",
    );
  });
});

describe("Check function hasAllowedSize", function () {
  it("Check is true", function () {
    const string = "a".repeat(86);
    expect(exportedForTesting.hasAllowedSize(string)).toBe(true);
  });
  it("Check is false", function () {
    const string = "a".repeat(87);
    expect(exportedForTesting.hasAllowedSize(string)).toBe(false);
  });
});
