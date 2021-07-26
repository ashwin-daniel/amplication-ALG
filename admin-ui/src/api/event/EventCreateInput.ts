export type EventCreateInput = {
  eventDate?: Date | null;
  title?: string | null;
  type?: "Birthday" | "Workiversary" | "Event" | null;
};
