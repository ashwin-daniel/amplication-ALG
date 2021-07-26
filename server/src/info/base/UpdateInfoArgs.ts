import { ArgsType, Field } from "@nestjs/graphql";
import { InfoWhereUniqueInput } from "./InfoWhereUniqueInput";
import { InfoUpdateInput } from "./InfoUpdateInput";

@ArgsType()
class UpdateInfoArgs {
  @Field(() => InfoWhereUniqueInput, { nullable: false })
  where!: InfoWhereUniqueInput;
  @Field(() => InfoUpdateInput, { nullable: false })
  data!: InfoUpdateInput;
}

export { UpdateInfoArgs };
