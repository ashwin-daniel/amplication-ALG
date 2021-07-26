import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { InfoWhereInput } from "./InfoWhereInput";
import { Type } from "class-transformer";
import { InfoOrderByInput } from "./InfoOrderByInput";

@ArgsType()
class InfoFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => InfoWhereInput,
  })
  @Field(() => InfoWhereInput, { nullable: true })
  @Type(() => InfoWhereInput)
  where?: InfoWhereInput;

  @ApiProperty({
    required: false,
    type: InfoOrderByInput,
  })
  @Field(() => InfoOrderByInput, { nullable: true })
  @Type(() => InfoOrderByInput)
  orderBy?: InfoOrderByInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { InfoFindManyArgs };
