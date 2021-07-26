import { SortOrder } from "../../util/SortOrder";

export type EventOrderByInput = {
  createdAt?: SortOrder;
  eventDate?: SortOrder;
  id?: SortOrder;
  title?: SortOrder;
  type?: SortOrder;
  updatedAt?: SortOrder;
};
