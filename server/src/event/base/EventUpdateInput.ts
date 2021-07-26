import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsOptional, IsString, IsEnum } from "class-validator";
import { Type } from "class-transformer";
import { EnumEventType } from "./EnumEventType";
@InputType()
class EventUpdateInput {
  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  eventDate?: Date | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  title?: string | null;

  @ApiProperty({
    required: false,
    enum: EnumEventType,
  })
  @IsEnum(EnumEventType)
  @IsOptional()
  @Field(() => EnumEventType, {
    nullable: true,
  })
  type?: "Birthday" | "Workiversary" | "Event" | null;
}
export { EventUpdateInput };
