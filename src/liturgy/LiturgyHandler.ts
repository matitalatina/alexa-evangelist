import { HandlerInput } from "ask-sdk-core";
import { CustomSkillRequestHandler } from "ask-sdk-core/dist/dispatcher/request/handler/CustomSkillRequestHandler";
import { Response } from "ask-sdk-model";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "../di/types";
import { LiturgyClient } from "./LiturgyClient";

@injectable()
export class LiturgyHandler implements CustomSkillRequestHandler {
  private liturgyClient: LiturgyClient;

  constructor(@inject(TYPES.LiturgyClient) liturgyClient: LiturgyClient) {
    this.liturgyClient = liturgyClient;
  }

  public canHandle(input: HandlerInput): boolean | Promise<boolean> {
    const request = input.requestEnvelope.request;
    return request.type === "IntentRequest"
      && request.intent.name === "CurrentGospel";
  }

  public async handle(input: HandlerInput): Promise<Response> {
    const gospel = await this.liturgyClient.getCurrentGospel();

    return input.responseBuilder
      .speak(gospel)
      .withSimpleCard("Catechista", gospel)
      .getResponse();
  }
}
