import type { Signal } from "@preact/signals";
import type { Posts } from "src/pages/blog.astro";
import Link from "./Link";

const getTagName = (tag: string) => tag || "전체";

type Props = {
  postGroup: Record<string, Posts>;
  tags: string[];
  selectedTag: Signal<string>;
  posts: Posts;
};

export default function Sidebar({
  tags,
  selectedTag,
  postGroup,
  posts,
}: Props) {
  const getClassName = (c: string) =>
    c === selectedTag.value
      ? "text-highlight decoration-[--palette-primary]"
      : undefined;

  const handleClickTag = (c: string) => () => (selectedTag.value = c);

  return (
    <aside
      class="relative bottom-0 left-0 mb-2 text-[--text] 
        xl:absolute xl:-left-52 xl:top-4 xl:w-40"
    >
      <div class="hidden p-1 mb-2 border-b-[--border] xl:block xl:border-b-[1px]">
        태그 목록
      </div>
      <ul class="flex gap-2 px-4 pt-4 xl:flex-col xl:p-0">
        {tags.map((tag) => (
          <li
            class={`text-sm hover:underline underline-offset-1 ${getClassName(
              tag
            )}`}
            onClick={handleClickTag(tag)}
            style={{ cursor: "pointer" }}
          >
            <Link class="unset" href={`/blog?tag=${tag}`}>
              #{getTagName(tag)} ({tag ? postGroup[tag].length : posts.length})
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
