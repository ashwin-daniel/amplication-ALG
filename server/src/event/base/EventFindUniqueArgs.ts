import { ArgsType, Field } from "@nestjs/graphql";
import { EventWhereUniqueInput } from "./EventWhereUniqueInput";

@ArgsType()
class EventFindUniqueArgs {
  @Field(() => EventWhereUniqueInput, { nullable: false })
  where!: EventWhereUniqueInput;
}

export { EventFindUniqueArgs };
