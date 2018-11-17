import { instance, mock, when } from "ts-mockito";
import { LiturgyClient } from "./LiturgyClient";
import { LiturgyHandler } from "./LiturgyHandler";

describe("LiturgyHandler", () => {
  const mockLiturgyClient: LiturgyClient = mock(LiturgyClient);
  const handler: LiturgyHandler = new LiturgyHandler(instance(mockLiturgyClient));

  it("should handle CurrentGospel intent", () => {
    const handlerInput: any = {
      requestEnvelope: { request: { type: "IntentRequest", intent: { name: "CurrentGospel" } } },
    };
    expect(handler.canHandle(handlerInput))
      .toBe(true);
  });

  it("should retrieve current gospel", () => {
    when(mockLiturgyClient.getCurrentGospel()).thenReturn(Promise.resolve("gospel"));
    const handlerInput: any = {
      responseBuilder: new FakeResponseBuilder(),
    };
    handler.handle(handlerInput);
  });
});

class FakeResponseBuilder {
  public speak(message: string) {
    expect(message).toEqual("gospel");
    return this;
  }
  public withSimpleCard(name: string, fact: string) {
    return this;
  }

  public getResponse(): any {
    return null;
  }
}
