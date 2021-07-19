import { ArgsType, Field } from "@nestjs/graphql";
import { MemberWhereUniqueInput } from "./MemberWhereUniqueInput";

@ArgsType()
class MemberFindUniqueArgs {
  @Field(() => MemberWhereUniqueInput, { nullable: false })
  where!: MemberWhereUniqueInput;
}

export { MemberFindUniqueArgs };
