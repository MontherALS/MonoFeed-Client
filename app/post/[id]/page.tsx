"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FiHeart, FiShare2, FiUser, FiCalendar, FiLoader } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { PostType } from "@/Types/PostTypes";
import { authFetch } from "@/lib/authFetch";
import PostPlayer from "./PostPlayer";

export default function VideoPage() {
  const { id } = useParams();
  const [post, setPost] = useState<PostType>();
  const [authorId, setAuthorId] = useState<string>("");
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState<boolean>(false);
  const [isFollowLoading, setIsFollowLoading] = useState<boolean>(false);

  useEffect(() => {
    try {
      const authorId = localStorage.getItem("id") as string;
      setAuthorId(authorId);

      const getVideo = async () => {
        try {
          const res = await authFetch(`/posts/post/${id}`);
          const data = await res?.json();
          const post = data as PostType;
          setPost(post);
          const checkIsFavorite = post.favorited_by?.some((arr) => arr.id == authorId);
          const checkIsFollow = post.author.followers?.some((f) => f.followerId === authorId) || false;
          setIsFollowing(checkIsFollow as boolean);
          setIsFavorite(checkIsFavorite as boolean);
        } catch (err) {
          console.error(err);
        }
      };
      getVideo();
    } catch (err) {
      console.log("Error happend ", err);
    }
  }, [id]);
  if (post?.author?.isPrivate && authorId !== post?.authorId) return <p>This account is private</p>;

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-20 items-start">
          {/* USER AND POST DATA CARDS - match video height */}
          <div className="lg:col-span-3 flex flex-col gap-8 lg:sticky lg:top-8 lg:min-h-[72vh]">
            <div className="bg-surface border border-border p-8 sm:p-10 rounded-[2.5rem] flex flex-col items-center text-center shadow-md">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-white/20 to-white/10 p-[2px] mb-6">
                <div className="w-full h-full rounded-full bg-dark-card flex items-center justify-center overflow-hidden">
                  <Link href={`/profile/${post?.authorId}`}>
                    {post?.author?.avatar ? (
                      <Image
                        src={post?.author.avatar as string}
                        width={128}
                        height={128}
                        alt="avatar"
                        className="w-full h-full rounded-full object-cover hover:scale-110 duration-700 transition-transform"
                      />
                    ) : (
                      <FiUser className="w-10 h-10 text-white" />
                    )}
                  </Link>
                </div>
              </div>
              <Link href={`/profile/${post?.authorId}`}>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 hover:text-white/80 hover:underline duration-300 transition-colors text-foreground">
                  @{post?.author?.user_name || "Creator"}
                </h3>
              </Link>

              <p className="text-muted text-xs sm:text-sm mb-8 line-clamp-1 px-6">
                {post?.author?.about || "Digital Creator"}
              </p>
              {authorId !== post?.authorId && (
                <button
                  onClick={async () => {
                    setIsFollowLoading(true);
                    try {
                      const endpoint = isFollowing
                        ? `/profiles/${post?.authorId}/unfollow`
                        : `/profiles/${post?.authorId}/follow`;
                      const res = await authFetch(endpoint, { method: "POST" });
                      if (res?.ok) setIsFollowing((p) => !p);
                    } finally {
                      setIsFollowLoading(false);
                    }
                  }}
                  disabled={isFollowLoading}
                  className={`px-8 py-3 sm:px-10 sm:py-3.5 rounded-full font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                    ${
                      isFollowing
                        ? "bg-white text-black hover:bg-white/90 font-bold"
                        : "bg-surface border border-border text-white hover:bg-white/10 font-semibold"
                    }`}
                >
                  {isFollowLoading ? (
                    <>
                      <FiLoader className="w-4 h-4 animate-spin inline mr-2" />
                      Loading...
                    </>
                  ) : (
                    isFollowing ? "Unfollow" : "Follow"
                  )}
                </button>
              )}
            </div>

            <div className="bg-surface border border-border p-8 sm:p-10 rounded-[2.5rem] flex-1 min-h-0 flex flex-col shadow-md">
              <div className="flex flex-col flex-1 min-h-0 justify-between">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black mb-6 leading-tight text-foreground">
                    {post?.post_title || "post_title"}
                  </h1>
                  <h3 className="text-foreground mb-4 text-sm sm:text-base">{post?.description}</h3>
                  <div className="space-y-3 text-muted text-xs font-bold tracking-tighter mb-6">
                    <div className="flex items-center gap-2">
                      <FiCalendar size={14} className="text-muted" />
                      {post?.createdAt && new Date(post.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-6">
                    {post?.category &&
                      post.category.map((c) => {
                        return (
                          <Link
                            key={c.id}
                            href={`/categories/${c.category_name}`}
                            className="bg-white/10 hover:bg-white/20 text-white border border-border rounded-3xl px-3 py-1.5 duration-300 transition-all font-semibold"
                          >
                            #{c?.category_name}
                          </Link>
                        );
                      })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-10 pt-8 border-t border-border">
                  <button
                    className="flex flex-col items-center justify-center gap-2 py-5 bg-dark-card border border-border rounded-3xl hover:bg-surface transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-dark-card"
                    onClick={async () => {
                      setIsFavoriteLoading(true);
                      try {
                        const res = await authFetch(`/posts/favorites/${id}`, { method: "POST" });
                        if (!res?.ok) return;
                        setIsFavorite((prev) => !prev);
                      } finally {
                        setIsFavoriteLoading(false);
                      }
                    }}
                    disabled={isFavoriteLoading}
                  >
                    {isFavoriteLoading ? (
                      <FiLoader size={20} className="text-white animate-spin" />
                    ) : isFavorite ? (
                      <FaHeart size={20} className="text-white duration-300" />
                    ) : (
                      <FiHeart size={20} className="group-hover:text-white duration-300 text-muted" />
                    )}
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
                      {post?.favorited_by?.length || 0}
                    </span>
                  </button>
                  <button className="flex flex-col items-center justify-center gap-2 py-5 bg-dark-card border border-border rounded-3xl hover:bg-surface transition-all duration-300 group">
                    <FiShare2 size={20} className="group-hover:text-white duration-300 text-muted" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-9 flex flex-col gap-8">
            <div className="w-full">
              <PostPlayer post_url={post?.post_url as string} />
            </div>
          </div>
        </div>
        {/* Video Grid */}
        <div className="border-t border-border pt-16 mt-20">
          <div className="flex items-center text-center justify-center gap-4 mb-14 px-4">
            <h2 className="text-2xl sm:text-3xl font-sans tracking-tighter neon-text">
              More from <span className="font-bold neon-text-blue">@{post?.author?.user_name}</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8 lg:gap-10 px-2">
            {post?.author?.Uploaded_Posts?.map((item: any) => (
              <Link href={`/post/${item.id}`} key={item.id} className="group flex flex-col gap-4">
                <div className="relative aspect-[3/4] bg-dark-light rounded-[2rem] overflow-hidden border border-border transition-all duration-500 group-hover:-translate-y-2">
                  {item.post_url.match(/\.(mp4|webm|mov)/i) ? (
                    <video
                      src={item.post_url}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                    />
                  ) : (
                    <Image
                      src={item.post_url}
                      alt={item.post_title}
                      fill
                      className="object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                    />
                  )}
                </div>

                <div className="px-1 pb-2">
                  <h4 className="text-sm font-bold text-foreground/80 group-hover:text-white transition-colors truncate lowercase tracking-tight">
                    {item.post_title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
