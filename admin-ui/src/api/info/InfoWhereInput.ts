import { StringFilter } from "../../util/StringFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";

export type InfoWhereInput = {
  id?: StringFilter;
  image?: StringNullableFilter;
  message?: StringNullableFilter;
  title?: StringNullableFilter;
};
