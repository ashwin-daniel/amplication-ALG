import { MemberWhereInput } from "./MemberWhereInput";
import { MemberOrderByInput } from "./MemberOrderByInput";

export type MemberFindManyArgs = {
  where?: MemberWhereInput;
  orderBy?: MemberOrderByInput;
  skip?: number;
  take?: number;
};
