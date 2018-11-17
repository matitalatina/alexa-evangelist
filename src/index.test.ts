import { handler } from "./index";

describe("index", () => {
  it("should export handle correctly", () => {
    expect(handler).toBeInstanceOf(Function);
  });
});
