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
    c === selectedCategory.value ? "text-highlight" : undefined;

  const handleClickCategory = (c: string) => () => (selectedCategory.value = c);

  return (
    <aside>
      <ul>
        {categories.map((cat) => (
          <li
            class={getClassName(cat)}
            onClick={handleClickCategory(cat)}
            style={{ cursor: "pointer" }}
          >
            #{getCatName(cat)} ({groupedPosts[cat].length})
          </li>
        ))}
      </ul>
    </aside>
  );
}
