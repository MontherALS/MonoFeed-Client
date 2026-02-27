"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { PostType } from "@/Types/PostTypes";
import { authFetch } from "@/lib/authFetch";
import { toast } from "react-hot-toast";
import { PostTypeWithPages } from "@/Types/PostTypes";
import Pagination from "@/components/Pagination";
import PostsGrid from "@/components/PostsGrid";

export default function CategoryPostsPage() {
  const { categoryName } = useParams() as { categoryName: string };
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedPage, setSelectedPage] = useState<number>(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const encodedCategoryName = encodeURIComponent(categoryName);
        const res = await authFetch(`/categories/${encodedCategoryName}/posts?page=${selectedPage}`);
        if (!res?.ok) {
          toast.error("Failed to load posts");
          return;
        }
        const data = await res?.json() as PostTypeWithPages;
        const publicPosts = data.posts.filter((post: PostType) => !post.author?.isPrivate);
        setPosts(publicPosts);
        setTotalPages(data.totalPages || 1);
        setError(null);
      } catch (err) {
        console.error("Error fetching category posts:", err);
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [categoryName, selectedPage]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-8 px-4 flex items-center justify-center">
        <div className="text-primary animate-pulse font-bold text-xl">Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background py-8 px-4 flex items-center justify-center">
        <div className="text-red-400 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-neon-cyan hover:text-neon-cyan-light transition-colors mb-4"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span>Back to Categories</span>
          </Link>
          <h1 className="text-4xl font-bold neon-text mb-2 capitalize">{categoryName}</h1>
          <p className="text-gray-400 text-lg">
            {posts.length} {posts.length === 1 ? "post" : "posts"} in this category
          </p>
        </div>

        <PostsGrid posts={posts} emptyMessage="No posts available in this category yet" />
        
        <Pagination
          totalPages={totalPages}
          currentPage={selectedPage}
          onPageChange={setSelectedPage}
        />
      </div>
    </div>
  );
}
