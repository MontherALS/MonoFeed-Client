import { FiUpload, FiEdit2, FiX } from "react-icons/fi";
import { authFetch } from "@/lib/authFetch";
import Link from "next/link";
import { PorfileActionPropType } from "@/Types/PropType";
export default function ProfileActionPage({
  isOwner,
  isFollowing,
  id,
  setIsFollowing,
  setIsEditModalOpen,
}: PorfileActionPropType) {
  return (
    <div className="flex gap-3 justify-center md:justify-start pt-2">
      {!isOwner ? (
        <button
          onClick={async () => {
            const endpoint = isFollowing ? `/profiles/${id}/unfollow` : `/profiles/${id}/follow`;
            const res = await authFetch(endpoint, { method: "POST" });
            if (res?.ok) setIsFollowing((p) => !p);
          }}
          className={`px-6 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105
                    ${
                      isFollowing
                        ? "bg-surface border border-border text-white hover:bg-white/10 font-bold"
                        : "bg-surface border border-border text-white hover:bg-white/10 font-semibold"
                    }`}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      ) : (
        <>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="px-5 py-2 rounded-full bg-surface border border-border text-white hover:bg-white/10 flex items-center gap-2 transition-all duration-300 hover:scale-105 font-bold"
          >
            <FiEdit2 />
            Edit Profile
          </button>
          <Link
            href="/upload"
            className="px-5 py-2 rounded-full bg-surface border border-border text-white hover:bg-white/10 flex items-center gap-2 transition-all duration-300 hover:scale-105 font-bold"
          >
            <FiUpload />
            Upload
          </Link>
        </>
      )}
    </div>
  );
}
