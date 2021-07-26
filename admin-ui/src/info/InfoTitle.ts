import { Info as TInfo } from "../api/info/Info";

export const INFO_TITLE_FIELD = "title";

export const InfoTitle = (record: TInfo) => {
  return record.title;
};
