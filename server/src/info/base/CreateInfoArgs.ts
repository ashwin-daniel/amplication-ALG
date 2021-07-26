import { ArgsType, Field } from "@nestjs/graphql";
import { InfoCreateInput } from "./InfoCreateInput";

@ArgsType()
class CreateInfoArgs {
  @Field(() => InfoCreateInput, { nullable: false })
  data!: InfoCreateInput;
}

export { CreateInfoArgs };
