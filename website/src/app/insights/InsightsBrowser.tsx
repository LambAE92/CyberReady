"use client";

import { useState } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import type { Article } from "./articles";
import { categoryColors, categories } from "./articles";

type InsightsBrowserProps = {
  articles: Article[];
};

export default function InsightsBrowser({ articles }: InsightsBrowserProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof categories)[number]>("All");

  const filteredArticles =
    selectedCategory === "All"
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  return (
    <>
      <section className="border-b border-slate-200 bg-white sticky top-16 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3 -mb-px">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  cat === selectedCategory
                    ? "bg-navy-900 text-white"
                    : "text-slate-600 hover:text-navy-900 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <Card key={article.slug} hover>
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                        categoryColors[article.category]
                      }`}
                    >
                      {article.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-navy-900 leading-snug mb-3">
                    {article.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-1">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <time className="text-xs text-slate-400 font-medium">
                      {article.date}
                    </time>
                    <Link
                      href={`/insights/${article.slug}`}
                      className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      Read Insight
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
