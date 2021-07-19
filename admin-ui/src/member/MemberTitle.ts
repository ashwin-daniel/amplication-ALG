import { Member as TMember } from "../api/member/Member";

export const MEMBER_TITLE_FIELD = "firstName";

export const MemberTitle = (record: TMember) => {
  return record.firstName;
};
