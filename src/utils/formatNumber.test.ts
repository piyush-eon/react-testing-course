import { describe, it, expect } from "vitest";
import { formatNumber } from "./formatNumber";

describe("formatNumber", () => {
  it("returns the number as a string when below 1000", () => {
    expect(formatNumber(500)).toBe("500");
  });

  it("formats numbers in the thousands as K", () => {
    expect(formatNumber(1200)).toBe("1.2K");
  });

  it("formats numbers in the millions as M", () => {
    expect(formatNumber(2_500_000)).toBe("2.5M");
  });

  it("handles exactly 1000", () => {
    expect(formatNumber(1000)).toBe("1.0K");
  });
});
