"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EmptyState } from "@/components/common/empty-state";
import { SegmentedControl } from "@/components/common/segmented-control";
import { ArticleCard } from "@/components/common/news/article-card";
import type { Article } from "@/components/common/news/types";

type NewsBrowserProps = {
  items: { article: Article; href: string }[];
  categories: string[];
  /** Show the search box (portal) or only the category tabs (public site) */
  withSearch?: boolean;
  /** How many cards to show (undefined = all) */
  limit?: number;
};

const ALL = "__all__";

/** Article grid with category tabs and optional text search. */
export function NewsBrowser({ items, categories, withSearch = true, limit }: NewsBrowserProps) {
  const [category, setCategory] = useState(ALL);
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const visible = items
    .filter(({ article }) => category === ALL || article.category === category)
    .filter(
      ({ article }) =>
        !q || article.title.toLowerCase().includes(q) || article.summary.toLowerCase().includes(q),
    )
    .slice(0, limit);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <SegmentedControl
          label="Filtrar por categoria"
          value={category}
          onValueChange={setCategory}
          options={[{ value: ALL, label: "Todas" }, ...categories.map((c) => ({ value: c, label: c }))]}
        />
        {withSearch && (
          <div className="relative w-full lg:w-80">
            <Label htmlFor="news-search" className="sr-only">
              Pesquisar notícias
            </Label>
            <Search
              aria-hidden="true"
              className="text-muted-foreground absolute top-1/2 left-4 size-4 -translate-y-1/2"
            />
            <Input
              id="news-search"
              type="search"
              placeholder="Pesquisar comunicados, artigos…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-card h-11 pl-10"
            />
          </div>
        )}
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? "notícia encontrada" : "notícias encontradas"}
      </p>

      {visible.length === 0 ? (
        <EmptyState
          title="Nenhuma notícia encontrada"
          description="Experimente outra categoria ou outra pesquisa."
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map(({ article, href }) => (
            <ArticleCard key={article.slug} article={article} href={href} />
          ))}
        </div>
      )}
    </div>
  );
}
