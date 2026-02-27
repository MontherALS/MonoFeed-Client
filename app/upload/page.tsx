"use client";

import { useState, useEffect } from "react";

import { FiUpload, FiX, FiLoader, FiArrowDown } from "react-icons/fi";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import toast from "react-hot-toast";
import { authFetch } from "@/lib/authFetch";
import axios from "axios";
import { CategoryWithotPostsType } from "@/Types/CategoryType";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [postData, setPostData] = useState({
    post_title: "",
    description: "",
  });
  const [category, setCategory] = useState<CategoryWithotPostsType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [query, setQuery] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCategory, setShowCategory] = useState<boolean>(false);

  useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Unauthorized");
        return;
      }
      const getcategories = async () => {
        try { 
        const res = await authFetch("/posts/categories");
          const data = await res?.json();
          setCategory(data);
        } catch (err) {
          console.log("error happend ", err);
        }
      };
      getcategories();
  }, []);
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile); //!

      const reader = new FileReader(); //!

      reader.onloadend = () => {
        //!
        setPreview(reader.result as string); //!
      };
      reader.readAsDataURL(selectedFile); //!
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Unathorized please re-login");
        return;
      }
      if (!file || !postData.post_title.trim()) {
        toast.error("Please fill the inputs");
        return;
      }

      const MAX_SIZE = 500 * 1024 * 1024;
      if (file.size > MAX_SIZE)
        return alert(`File size must be < 500MB\nYour file size: ${(file.size / 1024 / 1024).toFixed(2)}MB`);

      setIsSubmitting(true);

      const presignRes = await authFetch("/posts/presign", {
        method: "POST",
        body: JSON.stringify({
          mimeType: file.type,
          postSize: file.size,
        }),
      });

      const { uploadUrl, key } = await presignRes?.json();

      const uploadRes = await axios.put(uploadUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      if (uploadRes.status === 200) {
        const postRes = await authFetch("/posts/upload", {
          method: "POST",
          body: JSON.stringify({
            key,
            post_title: postData.post_title,
            description: postData.description,
            category: selectedCategory,
          }),
        });

        if (postRes?.status == 201) {
          toast.success("Post Uploaded");

          setFile(null);
          setPreview(null);
          setPostData({ post_title: "", description: "" });
          setSelectedCategory([]);
          return;
        }
      } else {
        toast.error("Upload failed");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Upload failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryVisible = query || showCategory ? "visible" : "hidden";
  const filteredCategory = category.filter((cat) => {
    return cat.category_name.toLowerCase().includes(query.toLocaleLowerCase());
  });

  return (
      <div className="bg-background py-8 px-4 min-h-[calc(100vh-4rem)]">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold neon-text mb-8 tracking-tight">Upload Video</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">File</label>
            <input
              type="file"
              accept="video/*,image/*"
              onChange={handleFileSelect}
              className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-white file:text-black hover:file:bg-white/90 cursor-pointer transition-all duration-300"
              required
            />
            {preview && (
              <div className="relative mt-4 rounded-xl overflow-hidden border border-neon-cyan/30">
                {file?.type.startsWith("image/") ? (
                  <img src={preview} alt="Preview" className="w-full h-auto rounded-lg max-h-96 object-cover" />
                ) : (
                  <video src={preview} className="w-full h-auto rounded-lg max-h-96 object-cover" controls />
                )}
                <button
                  type="button"
                  onClick={() => {
                    setFile(null);
                    setPreview(null);
                  }}
                  className="absolute top-2 right-2 p-2 bg-surface/90 backdrop-blur-sm border border-border rounded-full text-white hover:bg-white/10 transition-all duration-300"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          <Input label="Post Title" placeholder="Enter video name" name="post_title" onChange={handleChange} required />
          <Input
            label="description"
            placeholder="Enter video description"
            name="description"
            onChange={handleChange}
            
          />
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
            <Input className="mb-5" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search or add category" />
            <button
              type="button"
              className="bg-neon-cyan/20 border border-neon-cyan/40 w-full h-10 flex justify-center items-center rounded-2xl hover:bg-neon-cyan/30 hover:shadow-glow-cyan transition-all duration-300"
              onClick={(e) => {
                e.preventDefault();
                setShowCategory((prev) => !prev);
              }}
            >
              <FiArrowDown className="text-neon-cyan" />
            </button>

            <div className={`flex gap-5 flex-wrap visible ${categoryVisible} my-3 bg-surface-muted p-5 rounded-2xl border border-neon-purple/25`}>
              {filteredCategory.length <= 0 ? (
                <button
                  type="button"
                  className="bg-white text-black rounded-3xl px-4 py-2 hover:bg-white/90 duration-200 transition-all font-bold"
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
                    Add <span className="uppercase font-bold">{query}</span> as a category ?
                  </p>
                </button>
              ) : (
                filteredCategory.map((category) => {
                  return (
                    <div
                      key={category.id}
                      className={
                        selectedCategory.includes(category.category_name)
                          ? "flex bg-white text-black border border-border rounded-3xl py-1 px-3 font-mono gap-1 transition-all duration-200 hover:scale-105"
                          : "flex bg-surface border border-border text-white rounded-3xl py-1 px-3 font-mono gap-1 transition-all duration-200 hover:bg-white/10 hover:scale-105"
                      }
                    >
                      <label htmlFor={`category-${category.id}`} className="cursor-pointer">
                        {category.category_name}
                      </label>

                      <input
                        className="hidden"
                        id={`category-${category.id}`}
                        type="checkbox"
                        checked={selectedCategory.includes(category.category_name)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setSelectedCategory((prev) =>
                            checked
                              ? [...prev, category.category_name]
                              : prev.filter((id) => id !== category.category_name),
                          );
                        }}
                      />
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <FiLoader className="w-5 h-5 animate-spin inline mr-2" />
                Uploading...
              </>
            ) : (
              <>
                <FiUpload className="w-5 h-5 inline mr-2" />
                Upload
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
