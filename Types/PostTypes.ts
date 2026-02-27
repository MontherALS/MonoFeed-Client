import { UserProfileType } from "./UserTypes";
import { CategoryType } from "./CategoryType";
export type PostUserFavoriteData = {
  id: string;
  user_name: string;
};
export type PostType = {
  id: string;
  post_title: string;
  description: string;
  key: string;
  post_url: string;
  authorId: string;
  author: UserProfileType;
  favorited_by?: PostUserFavoriteData[];
  category?: CategoryType[];
  createdAt: string | Date;
  updatedAt: string | Date;
};
export type PostTypeWithPages = {
  posts: PostType[],
  totalPages:number
}