"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { PostType, PostTypeWithPages } from "@/Types/PostTypes";
import { CategoryType } from "@/Types/CategoryType";
import Pagination from "@/components/Pagination";
import PostsGrid from "@/components/PostsGrid";

export default function Home() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages,setTotalPages] = useState<number>()
  const [selectedPage , setSelectedPage] = useState<number>(1)
 
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get<PostTypeWithPages>(`http://localhost:5000/posts/all?page=${selectedPage}`) 
        console.log(res.data.posts)
       setTotalPages(res.data.totalPages);
        setPosts(res.data.posts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [selectedPage]);

  if (loading) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center bg-background">
        <div className="text-primary animate-pulse font-bold">Loading...</div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center bg-background">
        <div className="text-foreground font-semibold">No posts yet</div>
      </div>
    );
  }

  const publicPosts = posts.filter((post) => !post.author?.isPrivate);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <PostsGrid posts={publicPosts} />
        <Pagination
          totalPages={Number(totalPages) || 0}
          currentPage={selectedPage}
          onPageChange={setSelectedPage}
        />
      </div>
    </div>
  );
}
