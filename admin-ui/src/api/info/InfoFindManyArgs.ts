import { InfoWhereInput } from "./InfoWhereInput";
import { InfoOrderByInput } from "./InfoOrderByInput";

export type InfoFindManyArgs = {
  where?: InfoWhereInput;
  orderBy?: InfoOrderByInput;
  skip?: number;
  take?: number;
};
