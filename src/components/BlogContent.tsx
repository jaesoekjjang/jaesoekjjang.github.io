import Sidebar from "./Sidebar";
import { computed, useSignal } from "@preact/signals";
import { DEFAULT_CATEGORY } from "src/lib/markdoc/frontmatter.schema";
import { formatKorDate, groupBy } from "src/lib/utils";
import type { Posts } from "src/pages/blog.astro";

export default function BlogContent({
  categories,
  posts,
}: {
  categories: string[];
  posts: Posts;
}) {
  const category = useSignal(categories[0]);

  const groupedPosts = computed(() =>
    groupBy(posts)((x) => x.frontmatter.category)
  );

  const filteredPosts = computed(() =>
    category.value === DEFAULT_CATEGORY
      ? posts
      : groupedPosts.value[category.value]
  );

  return (
    <>
      <Sidebar
        categories={categories}
        selectedCategory={category}
        groupedPosts={groupedPosts.value}
      />
      <ul class="flex flex-col gap-2 mt-4 hover:bg-[--]">
        {filteredPosts.value.map(
          ({ frontmatter: { date, title, description }, slug }, index) => {
            const formattedDate = formatKorDate(date);
            return (
              <>
                {index ? <hr class="border-t-[--border]" /> : null}
                <li
                  class="flex justify-between min-h-20 p-2
                truncate overflow-hidden text-ellipsis
                cursor-pointer
                "
                >
                  <a class="unset" href={`/blog/${slug}`}>
                    <div class="prose prose-lg dark:prose-invert">
                      <h3>{title}</h3>
                      <div class="text-sm ">{description}</div>
                      <div class="text-xs">
                        <time datetime={date.toISOString()}>
                          {formattedDate}
                        </time>
                      </div>
                    </div>
                  </a>
                </li>
              </>
            );
          }
        )}
      </ul>
    </>
  );
}
