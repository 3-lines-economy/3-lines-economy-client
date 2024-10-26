import { atom } from "recoil";
import { Post } from "@/types/post";

export const selectedArticleState = atom<Post | null>({
  key: "selectedArticleState",
  default: null,
});
