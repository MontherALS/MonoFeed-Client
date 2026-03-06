import { UserProfileType } from "./UserTypes";
import { ChangeEvent, FormEvent } from "react";
import { EditFormData } from "./UserTypes";
import { PostType } from "./PostTypes";
export type VideoCardPropsType = {
  id: string;
  username: string;
  title: string;
  post_url: string;
  authorId: string;
  avatar: string;
};
export type ProfilePostGridPropType = {
  userData: UserProfileType;
  autherId: string;
  handleDeletePost: (postId: string, postName: string) => void;
  deletingPostId?: string | null;
};
export type PorfileActionPropType = {
  isOwner: boolean;
  isFollowing: boolean;
  id: string;
  setIsFollowing: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export type PostPlayerPropType = {
  post_url: string;
};
export type EditProfilePropsType = {
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleProfileEditChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleProfileEditSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleAvatarDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
  editFormData: EditFormData;
  setIsPasswordEdit: React.Dispatch<React.SetStateAction<boolean>>;
  isPasswordEdit: boolean;
  isProfileUpdating?: boolean;
  isAvatarUploading?: boolean;
  isAvatarDeleting?: boolean;
};
export type PostsGridProps = {
  posts: PostType[];
  emptyMessage?: string;
};
