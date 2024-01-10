import { useParams } from "src/hooks/useParams";
import Sidebar from "./Sidebar";
import { computed, useSignal } from "@preact/signals";
import { DEFAULT_TAG } from "src/lib/markdoc/frontmatter.schema";
import { formatKorDate, groupBy } from "src/lib/utils";
import type { Posts } from "src/pages/blog.astro";

export default function BlogContent({
  tags,
  posts,
}: {
  tags: string[];
  posts: Posts;
}) {
  const params = useParams<{ tag: string }>();
  const tag = useSignal(params?.tag || tags[0]);

  const postGroup = computed(() => groupBy(posts)((x) => x.frontmatter.tag));

  const filteredPosts = computed(() =>
    tag.value === DEFAULT_TAG ? posts : postGroup.value[tag.value]
  );

  return (
    <div class="relative max-w-3xl m-auto">
      <Sidebar
        tags={tags}
        selectedTag={tag}
        postGroup={postGroup.value}
        posts={posts}
      />
      <div class="mt-5">
        <ul class="flex flex-col gap-2 hover:bg-[--]">
          {filteredPosts.value.map(
            (
              { frontmatter: { date, title, description, coverImage }, slug },
              index
            ) => {
              const formattedDate = formatKorDate(date);
              return (
                <>
                  {index ? <hr class="border-t-[--border]" /> : null}
                  <li
                    class="flex justify-between py-4
                  truncate overflow-hidden text-ellipsis
                  cursor-pointer
                  "
                  >
                    <a class="unset w-[100%]" href={`/blog/${slug}`}>
                      <div class="prose prose-lg dark:prose-invert">
                        <div class="  flex justify-between min-h-24">
                          <div class="flex flex-col justify-between truncate gap-2">
                            <div>
                              <h3 class="my-0 whitespace-normal">{title}</h3>
                              <div class="prose mb-2 truncate overflow-ellipsis">
                                {description}
                              </div>
                            </div>
                            <div class="text-xs">
                              <time datetime={date.toISOString()}>
                                {formattedDate}
                              </time>
                            </div>
                          </div>
                          <div class="m-0 h-28 aspect-square bg-[--code-background]">
                            {coverImage ? (
                              <img
                                src={`/images/${coverImage}`}
                                class="h-[100%] object-contain my-auto"
                                alt={`${title}-cover-image`}
                              />
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                </>
              );
            }
          )}
        </ul>
      </div>
    </div>
  );
}
