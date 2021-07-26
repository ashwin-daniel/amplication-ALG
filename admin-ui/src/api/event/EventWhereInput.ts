import { DateTimeNullableFilter } from "../../util/DateTimeNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";

export type EventWhereInput = {
  eventDate?: DateTimeNullableFilter;
  id?: StringFilter;
  title?: StringNullableFilter;
  type?: "Birthday" | "Workiversary" | "Event";
};
