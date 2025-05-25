import { LeechPackage } from "./types";

export const comparePackages = (item1?: LeechPackage, item2?: LeechPackage) => {
  return item1?.id === item2?.id;
};
