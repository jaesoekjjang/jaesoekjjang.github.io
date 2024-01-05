import CenteringWrapper from "@layouts/CenteringWrapper.tsx";
import Sidebar from "./Sidebar";
import ExternalLinkIcon from "@components/ui/icons/external-link";
import type { Posts } from "src/pages/blog.astro";
import { useState } from "preact/hooks";

type ArrayLike<T> = T | T[];
const castArray = <T extends unknown>(x: ArrayLike<T>) =>
  Array.isArray(x) ? x : [x];

const groupBy =
  <T extends Record<string, unknown>, K extends ArrayLike<string>>(arr: T[]) =>
  (key: (i: T) => K) =>
    arr.reduce((groups, item) => {
      const groupNames = castArray(typeof key === "function" ? key(item) : key);
      groupNames.forEach((gn) => (groups[gn] ||= []).push(item));

      return groups;
    }, {} as Record<string, T[]>);

export default function BlogContent({
  categories,
  posts,
}: {
  categories: string[];
  posts: Posts;
}) {
  const [category, setCategory] = useState(categories[0]);

  const groupedPosts = groupBy(posts)((x) => x.frontmatter.category || "");
  const filteredPosts = posts.filter(({ frontmatter }) =>
    castArray(frontmatter.category || "").includes(category)
  );

  return (
    <>
      <Sidebar
        categories={categories}
        groupedPosts={groupedPosts}
        value={category}
        onChange={setCategory}
      />
      <ul>
        {filteredPosts.map((post) => {
          const formattedDate = new Date(
            post.frontmatter.date
          ).toLocaleDateString("en-us", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
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
