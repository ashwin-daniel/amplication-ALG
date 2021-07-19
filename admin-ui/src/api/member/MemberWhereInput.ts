import { StringFilter } from "../../util/StringFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { DateTimeFilter } from "../../util/DateTimeFilter";

export type MemberWhereInput = {
  ace?: StringFilter;
  avatar?: StringNullableFilter;
  dob?: DateTimeFilter;
  doj?: DateTimeFilter;
  email?: StringFilter;
  firstName?: StringNullableFilter;
  gender?: "male" | "female";
  id?: StringFilter;
  lastName?: StringNullableFilter;
};
