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
      <ul>
        {filteredPosts.value.map((post) => {
          const formattedDate = formatKorDate(post.frontmatter.date);
          return (
            <li class="post">
              <div class="title">
                <a href={`/blog/article/${post.slug}`}>
                  {post.frontmatter.title}
                </a>
              </div>
              <div class="publish-date">
                <time datetime={post.frontmatter.date.toISOString()}>
                  {formattedDate}
                </time>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
