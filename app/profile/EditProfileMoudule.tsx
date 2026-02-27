"use client";
import { EditProfilePropsType } from "@/Types/PropType";
import { FiLoader } from "react-icons/fi";
export default function EditProfileModule({
  setIsEditModalOpen,
  handleProfileEditChange,
  handleAvatarChange,
  handleProfileEditSubmit,
  editFormData,
  setIsPasswordEdit,
  isPasswordEdit,
  handleAvatarDelete,
  isProfileUpdating = false,
  isAvatarUploading = false,
  isAvatarDeleting = false,
}: EditProfilePropsType) {
  return (
    <form className="p-6 flex flex-col gap-5" onSubmit={handleProfileEditSubmit} noValidate>
      <div className="flex flex-col gap-2">
        <div className="pb-5">
          <label htmlFor="avatar" className="text-sm font-semibold text-white">Avatar: </label>
          <input 
            className="ml-2 text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-white/90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" 
            type="file" 
            accept="image/*" 
            onChange={handleAvatarChange}
            disabled={isAvatarUploading || isProfileUpdating}
          />
          {isAvatarUploading && (
            <span className="ml-2 text-xs text-neon-cyan flex items-center gap-1">
              <FiLoader className="w-3 h-3 animate-spin" />
              Uploading...
            </span>
          )}
          {editFormData.avatar && (
            <button
              onClick={handleAvatarDelete}
              disabled={isAvatarDeleting || isProfileUpdating || isAvatarUploading}
              className="text-xs bg-white text-black hover:bg-white/90 rounded-full px-3 py-1.5 transition-all duration-300 ml-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
            >
              {isAvatarDeleting ? (
                <>
                  <FiLoader className="w-3 h-3 animate-spin inline mr-1" />
                  Deleting...
                </>
              ) : (
                "Clear"
              )}
            </button>
          )}
        </div>
        <label htmlFor="user_name" className="text-sm font-semibold text-white">
          Username
        </label>
        <input
          type="text"
          id="user_name"
          className="w-full px-4 py-3 bg-dark-light border border-neon-purple/25 rounded-lg text-white text-base focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple focus:shadow-glow-purple transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          value={editFormData.user_name}
          onChange={handleProfileEditChange}
          placeholder="Enter your username"
          disabled={isProfileUpdating}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-semibold text-white">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-4 py-3 bg-dark-light border border-neon-purple/25 rounded-lg text-white text-base focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple focus:shadow-glow-purple transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          value={editFormData.email}
          onChange={handleProfileEditChange}
          placeholder="Enter your email"
          disabled={isProfileUpdating}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="bio" className="text-sm font-semibold text-white">
          Bio
        </label>
        <textarea
          id="about"
          className="w-full px-4 py-3 bg-dark-light border border-neon-purple/25 rounded-lg text-white text-base resize-y min-h-[100px] focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple focus:shadow-glow-purple transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          value={editFormData.about}
          onChange={handleProfileEditChange}
          placeholder="Tell us about yourself"
          rows={2}
          disabled={isProfileUpdating}
        />
      </div>
      <div className="flex items-center justify-center">
        <label htmlFor="isPrivate" className="font-semibold text-white">
          Private:
        </label>
        <input
          className="ml-2 w-4 h-4 rounded border-neon-purple/50 bg-dark-light text-neon-purple focus:ring-neon-purple focus:ring-1 disabled:opacity-50 disabled:cursor-not-allowed"
          id="isPrivate"
          type="checkbox"
          checked={editFormData.isPrivate}
          onChange={handleProfileEditChange}
          disabled={isProfileUpdating}
        />
      </div>
      <button
        className="bg-white text-black hover:bg-white/90 duration-300 rounded-2xl py-2 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
        onClick={(e) => {
          e.preventDefault();
          setIsPasswordEdit((prev) => !prev);
        }}
        disabled={isProfileUpdating}
      >
        Change password ↓
      </button>
      <div className={isPasswordEdit ? "flex flex-col gap-2" : " flex-col gap-2 hidden"}>
        <label className="text-sm font-semibold text-white">Current Password</label>
        <input
          type="password"
          id="currentPassword"
          className="w-full px-4 py-3 bg-dark-light border border-neon-purple/25 rounded-lg text-white text-base focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple focus:shadow-glow-purple transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          onChange={handleProfileEditChange}
          placeholder="Enter current password"
          disabled={isProfileUpdating}
        />
        <label htmlFor="email" className="text-sm font-semibold text-white">
          New Password
        </label>
        <input
          type="password"
          id="newPassword"
          onChange={handleProfileEditChange}
          className="w-full px-4 py-3 bg-dark-light border border-neon-purple/25 rounded-lg text-white text-base focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple focus:shadow-glow-purple transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Enter new password"
          disabled={isProfileUpdating}
        />
        <label htmlFor="email" className="text-sm font-semibold text-white">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          onChange={handleProfileEditChange}
          className="w-full px-4 py-3 bg-dark-light border border-neon-purple/25 rounded-lg text-white text-base focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple focus:shadow-glow-purple transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Confirm password"
          disabled={isProfileUpdating}
        />
      </div>
      <div className="flex gap-3 justify-end pt-5 mt-5 border-t border-neon-purple/25">
        <button
          type="button"
          onClick={() => setIsEditModalOpen(false)}
          className="px-5 py-2.5 bg-dark-light border border-gray-600 text-white rounded-lg font-semibold hover:bg-dark-card hover:border-gray-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isProfileUpdating}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2.5 bg-white text-black rounded-lg font-bold hover:bg-white/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white flex items-center justify-center gap-2"
          disabled={isProfileUpdating}
        >
          {isProfileUpdating ? (
            <>
              <FiLoader className="w-4 h-4 animate-spin" />
              Updating...
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </form>
  );
}
