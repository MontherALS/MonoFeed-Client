"use client";
import { useEffect, useState, useRef } from "react";
import VideoCard from "@/components/VideoCard";
import axios from "axios";
import { PostType, PostTypeWithPages } from "@/Types/PostTypes";
import Pagination from "@/components/Pagination";

export default function ReelsPage() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await axios.get<PostTypeWithPages>(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/posts/all?page=${selectedPage}&limit=8`
        );
        
        const publicPosts = res.data.posts.filter((post) => !post.author?.isPrivate);
        setPosts(publicPosts);
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [selectedPage]);

  useEffect(() => {
    if (scrollContainerRef.current && !loading) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [selectedPage, loading]);

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

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div 
        ref={scrollContainerRef}
        className="h-[calc(100vh-4rem)] overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
      >
        {posts.map((post) => (
          <VideoCard
            key={post.id}
            id={post.id}
            authorId={post.author?.id}
            username={post.author?.user_name || "Unknown"}
            title={post.post_title}
            post_url={post.post_url}
            avatar={post.author?.avatar as string}
          />
        ))}
      </div>
      
      <div className="py-4">
        <Pagination
          totalPages={totalPages}
          currentPage={selectedPage}
          onPageChange={setSelectedPage}
        />
      </div>
    </div>
  );
}
