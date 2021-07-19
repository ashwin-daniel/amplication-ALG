import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { MemberWhereInput } from "./MemberWhereInput";
import { Type } from "class-transformer";
import { MemberOrderByInput } from "./MemberOrderByInput";

@ArgsType()
class MemberFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => MemberWhereInput,
  })
  @Field(() => MemberWhereInput, { nullable: true })
  @Type(() => MemberWhereInput)
  where?: MemberWhereInput;

  @ApiProperty({
    required: false,
    type: MemberOrderByInput,
  })
  @Field(() => MemberOrderByInput, { nullable: true })
  @Type(() => MemberOrderByInput)
  orderBy?: MemberOrderByInput;

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

export { MemberFindManyArgs };
