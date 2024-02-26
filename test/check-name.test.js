import { describe, expect, it } from "@jest/globals";

import { exportedForTesting } from "../src/check-name.js";

describe("Check function sum_1", function () {
  it("Check expected result", function () {
    expect(exportedForTesting.sum_1(1)).toBe(2);
  });
});
