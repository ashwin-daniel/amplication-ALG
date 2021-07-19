import { registerEnumType } from "@nestjs/graphql";

export enum EnumMemberGender {
  Male = "male",
  Female = "female",
}

registerEnumType(EnumMemberGender, {
  name: "EnumMemberGender",
});
