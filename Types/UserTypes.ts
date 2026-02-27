import { PostType } from "./PostTypes";

export type UserProfileType = {
  id: string;
  avatar: File | string | null;
  user_name: string;
  email: string;
  about: string;
  isPrivate: boolean;
  Uploaded_Posts?: PostType[];
  followers?: { followerId: string }[];
  following?: { followingId: string }[];
};
export type EditFormData = {
  avatar: File | string | null;
  user_name: string;
  email: string;
  about: string;
  isPrivate: boolean;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
