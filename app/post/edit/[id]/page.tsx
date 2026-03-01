"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { FiArrowDown, FiLoader, FiX } from "react-icons/fi";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import toast from "react-hot-toast";
import { authFetch } from "@/lib/authFetch";
import { PostType } from "@/Types/PostTypes";
import { CategoryWithotPostsType } from "@/Types/CategoryType";
import PostPlayer from "../../[id]/PostPlayer";
import { useAuth } from "@/contexts/AuthContext";

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const [post, setPost] = useState<PostType | null>(null);
  const [postData, setPostData] = useState({
    post_title: "",
    description: "",
  });
  const [category, setCategory] = useState<CategoryWithotPostsType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [query, setQuery] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showCategory, setShowCategory] = useState<boolean>(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!isAuthenticated || !user) {
          toast.error("Unauthorized");
          router.push("/login");
          return;
        }

        const res = await authFetch(`/posts/post/${id}`);
        if (!res?.ok) {
          toast.error("Failed to load post");
          router.push("/");
          return;
        }

        const data = await res.json();
        const postData = data as PostType;
        setPost(postData);
        setPostData({
          post_title: postData.post_title || "",
          description: postData.description || "",
        });
        setSelectedCategory(postData.category?.map((c) => c.category_name) || []);

        if (user.id !== postData.authorId) {
          toast.error("You don't have permission to edit this post");
          router.push(`/`);
          return;
        }
      } catch (err) {
        console.error("Error fetching post:", err as Error);
        toast.error("Failed to load post");
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await authFetch("/posts/categories");
        const data = await res?.json();
        setCategory(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

      fetchPost();
      fetchCategories();
  }, [id, router, isAuthenticated, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    const { name, value } = e.target;

    setPostData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!isAuthenticated || !user) {
        toast.error("Unauthorized please re-login");
        return;
      }

      if (!postData.post_title.trim() || selectedCategory.length === 0) {
        toast.error("Please fill the required fields");
        return;
      }

      setIsSubmitting(true);

      const res = await authFetch(`/posts/post/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          post_title: postData.post_title,
          description: postData.description,
          category: selectedCategory,
        }),
      });

      if (res?.ok) {
        toast.success("Post updated successfully!");
        router.push(`/post/${id}`);
      } else {
        const errorData = await res?.json();
        toast.error(errorData?.message || "Failed to update post");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update post");
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryVisible = query || showCategory ? "visible" : "hidden";
  const filteredCategory = category.filter((cat) => {
    return cat.category_name.toLowerCase().includes(query.toLocaleLowerCase());
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-white flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-white/20 border-t-white rounded-full" />
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-white p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Post</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* PREVIEW */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Preview</h2>
            <div className="bg-surface border border-white/5 rounded-[2.5rem] p-6">
              <PostPlayer post_url={post.post_url as string} />
              <div className="mt-4">
                <h3 className="text-lg font-bold mb-2">{postData.post_title || "Post Title"}</h3>
                <p className="text-white/70 mb-4">{postData.description || "Description"}</p>
                <div className="flex gap-2 flex-wrap">
                  {selectedCategory.map((catName) => (
                    <span
                      key={catName}
                      className="bg-white text-black border border-border font-mono rounded-3xl px-3 py-1 text-sm"
                    >
                      #{catName}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Post Title"
                placeholder="Enter post title"
                name="post_title"
                value={postData.post_title}
                onChange={handleChange}
                required
              />

              <div className="w-full">
                <label className="block text-sm font-medium mb-2 text-gray-300">Description</label>
                <textarea
                  name="description"
                  value={postData.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                  rows={4}
                  className="w-full px-4 py-3 bg-dark-light border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <Input
                  className="mb-2"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search or add category"
                />
                <button
                  type="button"
                  className="bg-white text-black w-full h-5 flex justify-center items-center rounded-2xl mb-3 hover:bg-white/90 duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowCategory((prev) => !prev);
                  }}
                >
                  <FiArrowDown />
                </button>

                <div
                  className={`flex gap-5 flex-wrap ${categoryVisible} my-3 bg-surface-muted p-5 rounded-2xl`}
                >
                  {filteredCategory.length <= 0 && query ? (
                    <button
                      type="button"
                      className="bg-white text-black rounded-3xl px-2 hover:bg-white/90 duration-200"
                      onClick={(e) => {
                        e.preventDefault();
                        setCategory((prev) => [
                          ...prev,
                          {
                            id: crypto.randomUUID(),
                            category_name: query,
                          },
                        ]);
                        setSelectedCategory((prev) => [...prev, query]);
                        setQuery("");
                      }}
                    >
                      <p>
                        Add <span className="uppercase font-bold">{query}</span> as a category?
                      </p>
                    </button>
                  ) : (
                    filteredCategory.map((cat) => {
                      return (
                        <div
                          key={cat.id}
                          className={
                            selectedCategory.includes(cat.category_name)
                              ? "flex bg-white border border-border rounded-3xl py-1 px-2 text-black font-mono gap-1 transition-all duration-200"
                              : "flex bg-surface border border-border text-white hover:bg-white/10 rounded-3xl py-1 px-2 font-mono gap-1 transition-all duration-200"
                          }
                        >
                          <label htmlFor={`category-${cat.id}`} className="cursor-pointer">
                            {cat.category_name}
                          </label>

                          <input
                            className="hidden"
                            id={`category-${cat.id}`}
                            type="checkbox"
                            checked={selectedCategory.includes(cat.category_name)}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setSelectedCategory((prev) =>
                                checked
                                  ? [...prev, cat.category_name]
                                  : prev.filter((name) => name !== cat.category_name),
                              );
                            }}
                          />
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={() => router.push(`/post/${id}`)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <FiLoader className="w-5 h-5 animate-spin inline mr-2" />
                      Updating...
                    </>
                  ) : (
                    "Update Post"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
