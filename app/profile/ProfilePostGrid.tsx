"use client";
import Link from "next/link";
import Image from "next/image";
import { FiTrash, FiPlay, FiEdit, FiLoader } from "react-icons/fi";
import { ProfilePostGridPropType } from "@/Types/PropType";

export default function ProfilePostsGrid({ userData, autherId, handleDeletePost, deletingPostId = null }: ProfilePostGridPropType) {
  return (
    <div className="mb-8">
      {userData?.Uploaded_Posts?.length == 0 ? (
        <div>
          <h1 className="text-2xl font-bold neon-text mb-6">No Posts yet</h1>
        </div>
      ) : (
        <h2 className="text-2xl font-semibold text-center neon-text mb-6">{userData.user_name} Posts</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {userData?.Uploaded_Posts?.map((post, id) => {
          const isVideo = /\.(mp4|mov|avi|webm|mkv)$/i.test(post.key);

          const thumbnailUrl =
            post.post_url ||
            `https://via.placeholder.com/400x600/6366f1/ffffff?text=${encodeURIComponent(post.post_title || "Post")}`;

          return (
            <div
              key={post.key}
              className="group flex flex-col gap-3"
            >
              <div className="relative w-full aspect-[4/3] bg-dark-light rounded-xl overflow-hidden border border-neon-purple/25 transition-all duration-300 group-hover:border-neon-purple group-hover:shadow-glow-purple">
                {isVideo ? (
                  <>
                    <video
                      src={thumbnailUrl}
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                      preload="metadata"
                      onLoadedMetadata={(e) => {
                        const video = e.currentTarget;
                        video.currentTime = 0.5;
                        video.pause();
                      }}
                    />
                    <div className="absolute top-2 right-2 bg-black/80 rounded-full p-2 z-10 backdrop-blur-sm">
                      <FiPlay className="w-4 h-4 text-white" />
                    </div>
                  </>
                ) : (
                  <Image
                    src={thumbnailUrl}
                    alt={post.post_title}
                    fill
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  {userData.id == autherId && (
                    <div className="absolute top-2 left-2 z-20 flex items-center gap-2">
                      <button
                        className="p-2 rounded-full bg-surface/90 backdrop-blur-sm border border-border hover:bg-white/10 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-surface/90"
                        aria-label="Delete post"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDeletePost(post.id, post.post_title);
                        }}
                        disabled={deletingPostId === post.id}
                      >
                        {deletingPostId === post.id ? (
                          <FiLoader className="w-5 h-5 text-red-500 animate-spin" />
                        ) : (
                          <FiTrash className="w-5 h-5 text-red-500" />
                        )}
                      </button>
                      <Link
                        href={`/post/edit/${post.id}`}
                        className="p-2 rounded-full bg-surface/90 backdrop-blur-sm border border-border hover:bg-white/10 transition-all duration-300 hover:scale-110"
                        aria-label="Edit post"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiEdit className="w-5 h-5 text-neon-cyan" />
                      </Link>
                    </div>
                  )}
                  <Link
                    href={`/post/${post.id}`}
                    className="flex items-center justify-center"
                    onClick={(e) => {
                      if (userData.id == autherId && (e.target as HTMLElement).closest('button, a[href*="/edit"]')) {
                        e.stopPropagation();
                      }
                    }}
                  >
                    <FiPlay className="w-16 h-16 text-white opacity-90" />
                  </Link>
                </div>
              </div>

              <div className="bg-dark-light/50 border border-neon-purple/10 rounded-lg p-3 space-y-2.5">
                <h4 className="text-lg font-bold text-white text-center group-hover:text-neon-cyan transition-colors line-clamp-2 leading-snug">
                  {post.post_title}
                </h4>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
