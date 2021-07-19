export type MemberCreateInput = {
  ace: string;
  avatar?: string | null;
  dob: Date;
  doj: Date;
  email: string;
  firstName?: string | null;
  gender: "male" | "female";
  lastName?: string | null;
};
