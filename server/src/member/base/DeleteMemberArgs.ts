import { ArgsType, Field } from "@nestjs/graphql";
import { MemberWhereUniqueInput } from "./MemberWhereUniqueInput";

@ArgsType()
class DeleteMemberArgs {
  @Field(() => MemberWhereUniqueInput, { nullable: false })
  where!: MemberWhereUniqueInput;
}

export { DeleteMemberArgs };
