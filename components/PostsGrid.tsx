"use client";

import Link from "next/link";
import Image from "next/image";
import { FiPlay, FiUser } from "react-icons/fi";
import { PostType } from "@/Types/PostTypes";

interface PostsGridProps {
  posts: PostType[];
  emptyMessage?: string;
}

export default function PostsGrid({ posts, emptyMessage = "No posts available yet" }: PostsGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {posts.map((post) => {
        const isVideo = post.post_url?.match(/\.(mp4|webm|mov|avi|mkv)$/i);

        return (
          <Link href={`/post/${post.id}`} key={post.id} className="group flex flex-col gap-3">
            <div className="relative w-full aspect-video bg-dark-light rounded-xl overflow-hidden border border-border transition-all duration-300">
              {isVideo ? (
                <>
                  <video
                    src={post.post_url}
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
                <Image src={post.post_url || ""} alt={post.post_title} fill className="object-cover" />
              )}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <FiPlay className="w-16 h-16 text-white opacity-90" />
              </div>
            </div>

            <div className="flex gap-3">
              {post.author && (
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-neon-purple/20 flex items-center justify-center overflow-hidden ring-2 ring-neon-purple/30">
                    {post.author.avatar ? (
                      <Image
                        src={post.author.avatar as string}
                        width={40}
                        height={40}
                        alt={post.author.user_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FiUser className="w-5 h-5 text-neon-purple" />
                    )}
                  </div>
                </div>
              )}

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-white group-hover:text-neon-cyan transition-colors line-clamp-2 mb-1">
                  {post.post_title}
                </h4>
                {post.author && <p className="text-xs text-gray-400 truncate">{post.author.user_name}</p>}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
