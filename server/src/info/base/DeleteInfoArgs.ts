import { ArgsType, Field } from "@nestjs/graphql";
import { InfoWhereUniqueInput } from "./InfoWhereUniqueInput";

@ArgsType()
class DeleteInfoArgs {
  @Field(() => InfoWhereUniqueInput, { nullable: false })
  where!: InfoWhereUniqueInput;
}

export { DeleteInfoArgs };
