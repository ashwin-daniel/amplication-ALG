import { Event } from "./Event";
import { registerEnumType } from "@nestjs/graphql";

export enum EnumEventType {
  Birthday = "Birthday",
  Workiversary = "Workiversary",
  Event = "Event",
}

registerEnumType(EnumEventType, {
  name: "EnumEventType",
});
