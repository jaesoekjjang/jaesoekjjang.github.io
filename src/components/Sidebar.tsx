import type { Signal } from "@preact/signals";
import type { Posts } from "src/pages/blog.astro";

const getCatName = (cat: string) => cat || "전체";

type Props = {
  groupedPosts: Record<string, Posts>;
  categories: string[];
  selectedCategory: Signal<string>;
};

export default function Sidebar({
  categories,
  selectedCategory,
  groupedPosts,
}: Props) {
  const getClassName = (c: string) =>
    c === selectedCategory.value
      ? "text-highlight decoration-[--palette-primary]"
      : undefined;

  const handleClickCategory = (c: string) => () => (selectedCategory.value = c);

  return (
    <aside
      class="relative bottom-0 left-0 mb-2 text-[--text] 
        md:absolute md:right-[calc(100%+20px)] md:left-auto md:top-4 md:w-44"
    >
      <div class="hidden p-1 mb-2 border-b-[--border] md:block md:border-b-[1px]">
        태그 목록
      </div>
      <ul class="flex gap-2 md:flex-col">
        {categories.map((cat) => (
          <li
            class={`text-sm hover:underline underline-offset-1 ${getClassName(
              cat
            )}`}
            onClick={handleClickCategory(cat)}
            style={{ cursor: "pointer" }}
          >
            <a class="unset" href={`/blog?tag=${cat}`}>
              #{getCatName(cat)} ({groupedPosts[cat].length})
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
