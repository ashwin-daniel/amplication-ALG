export type Event = {
  createdAt: Date;
  eventDate: Date | null;
  id: string;
  title: string | null;
  type?: "Birthday" | "Workiversary" | "Event" | null;
  updatedAt: Date;
};
