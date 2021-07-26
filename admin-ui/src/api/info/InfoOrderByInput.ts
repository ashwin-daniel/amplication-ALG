import { SortOrder } from "../../util/SortOrder";

export type InfoOrderByInput = {
  createdAt?: SortOrder;
  id?: SortOrder;
  image?: SortOrder;
  message?: SortOrder;
  title?: SortOrder;
  updatedAt?: SortOrder;
};
