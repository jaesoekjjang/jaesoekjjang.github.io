import type { Signal } from "@preact/signals";
import type { Posts } from "src/pages/blog.astro";
import Link from "./Link";

const getTagName = (tag: string) => tag || "전체";

type Props = {
  postGroup: Record<string, Posts>;
  tags: string[];
  selectedTag: Signal<string>;
};

export default function Sidebar({ tags, selectedTag, postGroup }: Props) {
  const getClassName = (c: string) =>
    c === selectedTag.value
      ? "text-highlight decoration-[--palette-primary]"
      : undefined;

  const handleClickTag = (c: string) => () => (selectedTag.value = c);

  return (
    <aside
      class="relative bottom-0 left-0 mb-2 text-[--text] 
        md:absolute md:right-[calc(100%+20px)] md:left-auto md:top-4 md:w-44"
    >
      <div class="hidden p-1 mb-2 border-b-[--border] md:block md:border-b-[1px]">
        태그 목록
      </div>
      <ul class="flex gap-2 md:flex-col">
        {tags.map((tag) => (
          <li
            class={`text-sm hover:underline underline-offset-1 ${getClassName(
              tag
            )}`}
            onClick={handleClickTag(tag)}
            style={{ cursor: "pointer" }}
          >
            <Link class="unset" href={`/blog?tag=${tag}`}>
              #{getTagName(tag)} ({postGroup[tag].length})
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
