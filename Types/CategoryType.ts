import { PostType } from "./PostTypes";
export type CategoryType = {
  id: string;
  category_name: string;
  posts?: PostType[];
};
export type CategoryWithotPostsType = {
  id: string;
  category_name: string;
};
