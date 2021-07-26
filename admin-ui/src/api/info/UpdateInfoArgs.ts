import { InfoWhereUniqueInput } from "./InfoWhereUniqueInput";
import { InfoUpdateInput } from "./InfoUpdateInput";

export type UpdateInfoArgs = {
  where: InfoWhereUniqueInput;
  data: InfoUpdateInput;
};
