import { ArgsType, Field } from "@nestjs/graphql";
import { InfoWhereUniqueInput } from "./InfoWhereUniqueInput";

@ArgsType()
class InfoFindUniqueArgs {
  @Field(() => InfoWhereUniqueInput, { nullable: false })
  where!: InfoWhereUniqueInput;
}

export { InfoFindUniqueArgs };
