import { Container } from "inversify";
import { LiturgyClient } from "./../liturgy/LiturgyClient";
import { LiturgyHandler } from "./../liturgy/LiturgyHandler";
import { TYPES } from "./types";

const myContainer = new Container();
myContainer.bind<LiturgyClient>(TYPES.LiturgyClient).to(LiturgyClient);
myContainer.bind<LiturgyHandler>(TYPES.LiturgyHandler).to(LiturgyHandler);

export { myContainer };
