import { ArgsType, Field } from "@nestjs/graphql";
import { MemberCreateInput } from "./MemberCreateInput";

@ArgsType()
class CreateMemberArgs {
  @Field(() => MemberCreateInput, { nullable: false })
  data!: MemberCreateInput;
}

export { CreateMemberArgs };
