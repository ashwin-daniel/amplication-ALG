export type Member = {
  ace: string;
  avatar: string | null;
  createdAt: Date;
  dob: Date;
  doj: Date;
  email: string;
  firstName: string | null;
  gender?: "male" | "female";
  id: string;
  lastName: string | null;
  updatedAt: Date;
};
