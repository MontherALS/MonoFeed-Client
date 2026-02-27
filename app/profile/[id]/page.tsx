"use client";

import { useState, useEffect, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { FiUser, FiX, FiLoader } from "react-icons/fi";
import { authFetch } from "@/lib/authFetch";
import { UserProfileType, EditFormData } from "@/Types/UserTypes";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import EditProfileModule from "@/app/profile/EditProfileMoudule";
import ProfilePostsGrid from "@/app/profile/ProfilePostGrid";
import ProfileActionPage from "../ProfileAction";

export default function ProfilePage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };

  const [userData, setUserData] = useState<UserProfileType>();
  const [autherId, setAutherId] = useState<string>("");
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editFormData, setEditFormData] = useState<EditFormData>({
    avatar: null as unknown as File,
    user_name: "",
    email: "",
    about: "",
    isPrivate: true,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [isPasswordEdit, setIsPasswordEdit] = useState<boolean>(false);
  const [isProfileUpdating, setIsProfileUpdating] = useState<boolean>(false);
  const [isAvatarUploading, setIsAvatarUploading] = useState<boolean>(false);
  const [isAvatarDeleting, setIsAvatarDeleting] = useState<boolean>(false);
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in");
      router.push("/login");
      return;
    }

    const authId = localStorage.getItem("id") as string;
    setAutherId(authId);

    const getUser = async () => {
      const res = await authFetch(`/profiles/${id}`);
      const data = await res?.json();
      if (!data) return toast.error("Something went wrong");

      const user = data.user as UserProfileType;
      setUserData(user);

      setEditFormData({
        avatar: user.avatar || "",
        user_name: user.user_name || "",
        email: user.email || "",
        about: user.about || "",
        isPrivate: user.isPrivate,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      const checkIsFollow = user.followers?.some((f) => f.followerId === authId) || false;
      console.log(checkIsFollow);
      setIsFollowing(checkIsFollow);
    };

    getUser();
  }, [id, router]);

  const handleDeletePost = async (postId: string, postName: string) => {
    const confirm = window.confirm(`Delete post: ${postName}?`);
    if (!confirm) return;

    setDeletingPostId(postId);
    try {
      const res = await authFetch(`/posts/post/${postId}`, { method: "DELETE" });
      if (!res?.ok) {
        toast.error("Cannot delete post");
        return;
      }

      setUserData((prev) => ({
        ...prev!,
        Uploaded_Posts: prev!.Uploaded_Posts?.filter((p) => p.id !== postId),
      }));

      toast.success("Post deleted");
    } finally {
      setDeletingPostId(null);
    }
  };

  const handleProfileEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type } = e.target as HTMLInputElement;
    setEditFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return toast.error("Select image");

    setIsAvatarUploading(true);
    try {
      const presign = await authFetch(`/profiles/avatar-presign/${autherId}`, {
        method: "POST",
        body: JSON.stringify({ mimeType: file.type }),
      });

      const { avatarKey, uploadUrl } = await presign?.json();
      await axios.put(uploadUrl, file, { headers: { "Content-Type": file.type } });

      const save = await authFetch(`/profiles/avatar/${autherId}`, {
        method: "PUT",
        body: JSON.stringify({ avatarKey }),
      });

      const { avatarUrl, message } = await save?.json();
      setEditFormData((p) => ({ ...p, avatar: avatarUrl }));
      toast.success(message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to upload avatar");
    } finally {
      setIsAvatarUploading(false);
    }
  };

  const handleProfileEditSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsProfileUpdating(true);
    try {
      const res = await authFetch(`/profiles/${id}`, {
        method: "PUT",
        body: JSON.stringify(editFormData),
      });

      if (!res?.ok) {
        const errorData = await res?.json();
        toast.error(errorData?.message);
      } else {
        toast.success("Profile updated");
        setIsEditModalOpen(false);
        router.refresh();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setIsProfileUpdating(false);
    }
  };
  const handleAvatarDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsAvatarDeleting(true);
    try {
      const res = await authFetch(`/profiles/avatar/${id}`, { method: "DELETE" });
      if (!res?.ok) {
        toast.error("Failed to delete the avatar");
        return;
      }
      toast.success("avatar deleted");
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete avatar");
    } finally {
      setIsAvatarDeleting(false);
    }
  };
  if (!userData) return null;

  const isOwner = autherId === userData.id;
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-8 items-center md:items-end">
          <div className="w-36 h-36 rounded-full overflow-hidden shrink-0 ring-2 ring-neon-purple/50 shadow-glow-purple">
            {userData.avatar ? (
              <Image
                src={userData.avatar as string}
                width={128}
                height={128}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-dark-light">
                <FiUser className="w-14 h-14 text-neon-purple" />
              </div>
            )}
          </div>

          <div className="flex-1 text-center md:text-left space-y-3">
            <h1 className="text-3xl font-bold text-white flex gap-3 items-center justify-center md:justify-start">
              {userData.user_name}
              {userData.isPrivate && (
                <span className="text-xs px-2 py-1 rounded-full bg-neon-pink/20 border border-neon-pink/40 text-neon-pink font-semibold">
                  Private
                </span>
              )}
            </h1>

            <p className="text-gray-300 max-w-xl">{userData.about || "No bio yet"}</p>

            <div className="flex gap-6 text-sm text-gray-300 justify-center md:justify-start">
              <span>
                <b className="text-neon-purple neon-text">{userData.Uploaded_Posts?.length}</b> Posts
              </span>
              <span>
                <b className="text-neon-cyan neon-text-blue">{userData.followers?.length || 0}</b> Followers
              </span>
              <span>
                <b className="text-neon-pink neon-text-pink">{userData.following?.length || 0}</b> Following
              </span>
            </div>
            {userData.isPrivate && !isOwner ? (
              <p className=" bg-red-500/20 border border-red-500/40 text-white text-lg text-center mt-4 rounded-lg px-4 py-2">
                This account is private
              </p>
            ) : (
              <ProfileActionPage
                isOwner={isOwner}
                isFollowing={isFollowing}
                id={id}
                setIsFollowing={setIsFollowing}
                setIsEditModalOpen={setIsEditModalOpen}
              />
            )}
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 py-10">
        {userData.isPrivate && !isOwner ? null : (
          <ProfilePostsGrid 
            userData={userData} 
            autherId={autherId} 
            handleDeletePost={handleDeletePost}
            deletingPostId={deletingPostId}
          />
        )}
      </div>
      {isEditModalOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setIsEditModalOpen(false)}
        >
          <div
            className="bg-dark-light border border-neon-purple/30 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-glow-purple"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-neon-purple/20">
              <h2 className="text-xl font-bold neon-text-blue">Edit Profile</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-neon-pink transition-colors"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <EditProfileModule
              setIsEditModalOpen={setIsEditModalOpen}
              handleProfileEditChange={handleProfileEditChange}
              handleAvatarChange={handleAvatarChange}
              handleProfileEditSubmit={handleProfileEditSubmit}
              editFormData={editFormData}
              setIsPasswordEdit={setIsPasswordEdit}
              isPasswordEdit={isPasswordEdit}
              handleAvatarDelete={handleAvatarDelete}
              isProfileUpdating={isProfileUpdating}
              isAvatarUploading={isAvatarUploading}
              isAvatarDeleting={isAvatarDeleting}
            />
          </div>
        </div>
      )}
    </div>
  );
}
