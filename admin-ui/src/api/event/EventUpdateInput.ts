export type EventUpdateInput = {
  eventDate?: Date | null;
  title?: string | null;
  type?: "Birthday" | "Workiversary" | "Event" | null;
};
