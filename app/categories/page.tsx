"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FiGrid, FiTrendingUp } from "react-icons/fi";
import axios from "axios";

type Category = {
  id: string;
  category_name: string;
  posts: number;
};

type CategoriesResponse = {
  categories: Category[];
  popular: Category[];
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [popular, setPopular] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await axios.get<CategoriesResponse>("http://localhost:5000/categories");
        setCategories(res.data.categories);
        setPopular(res.data.popular);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching categories:", err);
        setError(err?.response?.data?.message || "Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-8 px-4 flex items-center justify-center">
        <div className="text-primary animate-pulse font-bold text-xl">Loading categories...</div>
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
          <h1 className="text-4xl font-bold neon-text mb-2">Categories</h1>
          <p className="text-gray-400 text-lg">Explore videos by category</p>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No categories available yet</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.category_name}`}
                  className="bg-dark-light rounded-xl border border-gray-800 p-6 hover:border-neon-purple/50 transition-colors"
                >
                  <div className="mb-4 w-12 h-12 rounded-lg bg-neon-purple/20 flex items-center justify-center">
                    <FiGrid className="w-6 h-6 text-neon-purple" />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2">
                    {category.category_name}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    {category.posts.toLocaleString()} {category.posts === 1 ? "post" : "posts"}
                  </p>
                </Link>
              ))}
            </div>

            {popular.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <FiTrendingUp className="w-6 h-6 text-neon-purple" />
                  Popular Categories
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                  {popular.map((category) => (
                    <Link
                      key={category.id}
                      href={`/categories/${category.category_name}`}
                      className="bg-dark-light rounded-lg border border-gray-800 p-4 hover:border-neon-purple/50 transition-colors text-center"
                    >
                      <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-neon-purple/20 flex items-center justify-center">
                        <FiGrid className="w-5 h-5 text-neon-purple" />
                      </div>
                      <h3 className="text-white font-semibold text-sm">
                        {category.category_name}
                      </h3>
                      <p className="text-gray-400 text-xs mt-1">
                        {category.posts.toLocaleString()} {category.posts === 1 ? "post" : "posts"}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
