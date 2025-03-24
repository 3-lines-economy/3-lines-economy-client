import { atom } from "recoil";
import { CategoryMap, CategoryType } from "../types/category";

export const activeCategoryState = atom({
  key: "activeCategoryState",
  default: CategoryMap[CategoryType.ALL],
});
