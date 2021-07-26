import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { DateTimeNullableFilter } from "../../util/DateTimeNullableFilter";
import { Type } from "class-transformer";
import { IsOptional, IsEnum } from "class-validator";
import { StringFilter } from "../../util/StringFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { EnumEventType } from "./EnumEventType";
@InputType()
class EventWhereInput {
  @ApiProperty({
    required: false,
    type: DateTimeNullableFilter,
  })
  @Type(() => DateTimeNullableFilter)
  @IsOptional()
  @Field(() => DateTimeNullableFilter, {
    nullable: true,
  })
  eventDate?: DateTimeNullableFilter;

  @ApiProperty({
    required: false,
    type: StringFilter,
  })
  @Type(() => StringFilter)
  @IsOptional()
  @Field(() => StringFilter, {
    nullable: true,
  })
  id?: StringFilter;

  @ApiProperty({
    required: false,
    type: StringNullableFilter,
  })
  @Type(() => StringNullableFilter)
  @IsOptional()
  @Field(() => StringNullableFilter, {
    nullable: true,
  })
  title?: StringNullableFilter;

  @ApiProperty({
    required: false,
    enum: EnumEventType,
  })
  @IsEnum(EnumEventType)
  @IsOptional()
  @Field(() => EnumEventType, {
    nullable: true,
  })
  type?: "Birthday" | "Workiversary" | "Event";
}
export { EventWhereInput };
