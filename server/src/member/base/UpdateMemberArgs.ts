import { ArgsType, Field } from "@nestjs/graphql";
import { MemberWhereUniqueInput } from "./MemberWhereUniqueInput";
import { MemberUpdateInput } from "./MemberUpdateInput";

@ArgsType()
class UpdateMemberArgs {
  @Field(() => MemberWhereUniqueInput, { nullable: false })
  where!: MemberWhereUniqueInput;
  @Field(() => MemberUpdateInput, { nullable: false })
  data!: MemberUpdateInput;
}

export { UpdateMemberArgs };
