import type { Posts } from "src/pages/blog.astro";

const getCatName = (cat: string) => cat || "전체";

export default function Sidebar({
  groupedPosts,
  categories,
  value,
  onChange,
}: {
  groupedPosts: Record<string, Posts>;
  categories: string[];
  value: string;
  onChange: (cat: string) => void;
}) {
  const getClassName = (c: string) =>
    c === value ? "text-highlight" : undefined;

  return (
    <aside>
      <ul>
        {categories.map((cat) => (
          <li
            className={getClassName(cat)}
            onClick={() => onChange(cat)}
            style={{ cursor: "pointer" }}
          >
            #{getCatName(cat)} ({groupedPosts[cat].length})
          </li>
        ))}
      </ul>
    </aside>
  );
}
