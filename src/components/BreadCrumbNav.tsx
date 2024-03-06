import { useEffect, useRef, useState } from "preact/hooks";
import type { MarkdownHeading } from "astro";

type Props = {
  headings: MarkdownHeading[];
};

const marginByDepth: Record<number, string> = {
  1: "ml-0",
  2: "ml-0",
  3: "ml-4",
  4: "ml-8",
};

const headingNameSet = new Set(["H2", "H3", "H4", "H5", "H6"]);

export default function BreadCrumbNav({ headings }: Props) {
  const [currentHeading, setCurrentHeading] = useState("");

  // TODO: 리팩터링
  useEffect(() => {
    /**
     * 거리 기준
     * 1. bottom < 기준 좌표: target이 기준 좌표 위에 있는 경우
     * 2. top > 기준 좌표: target이 기준 좌표 아래에 있는 경우
     * 3. 걸쳐 있는 경우: 가까운 쪽을 선택
     */
    const items = document.querySelectorAll("article > *");
    const getDisanceFrom = (el: Element, baseY: number) => {
      const { top, bottom } = el.getBoundingClientRect();
      const center = (top + bottom) / 2;

      if (bottom < baseY) return baseY - bottom;
      if (top > baseY) return top - baseY;

      return center > baseY ? baseY - center : center - baseY;
    };

    const ob2 = new IntersectionObserver(
      () => {
        const nearestElementFromTop = [...items].reduce(
          ([nearest, distance], target): [Element | null, number] => {
            const distanceFromTop = getDisanceFrom(target, 60);
            if (distanceFromTop <= distance) {
              return [target, distanceFromTop];
            }

            return [nearest, distance];
          },
          [null, Infinity] as [Element | null, number],
        );

        // prev 또는 next 중 가장 가까운 heading을 찾는다
        const findNearestHeading = (
          [prev, next]: [
            Element | undefined | null,
            Element | undefined | null,
          ],
          target: Element,
        ): Element | undefined | null => {
          const isPrevHeading = headingNameSet.has(prev?.tagName || "");
          const isNextHeading = headingNameSet.has(next?.tagName || "");

          /**
           * 스크롤 방향에 따라 내리는 경우는 next, 올리는 경우는 prev를 반환
           */
          if (isPrevHeading && isNextHeading) {
            prev?.getBoundingClientRect().bottom! -
              target?.getBoundingClientRect().top >
            next?.getBoundingClientRect().top! -
              target.getBoundingClientRect().bottom
              ? next
              : prev;
          }

          if (isPrevHeading) {
            return prev;
          }

          if (isNextHeading) {
            return next;
          }

          return findNearestHeading(
            [prev?.previousElementSibling, next?.nextElementSibling],
            target,
          );
        };

        const nearestHeading = headingNameSet.has(
          nearestElementFromTop[0]?.tagName || "",
        )
          ? nearestElementFromTop[0]?.id
          : findNearestHeading(
              [
                nearestElementFromTop[0]?.previousElementSibling,
                nearestElementFromTop[0]?.nextElementSibling,
              ],
              nearestElementFromTop[0] as Element,
            )?.id;

        setCurrentHeading(nearestHeading || "");
      },
      {
        threshold: 0.5,
      },
    );
    items.forEach((el) => {
      ob2.observe(el);
    });
  }, []);

  return (
    <nav class="heading-nav pt-3 w-60 px-5">
      <ul class="text-gray-600">
        {headings.map(({ depth, slug, text }) => (
          <li class={`py-[6px] pl-4 text-sm ${marginByDepth[depth]}`}>
            <a
              data-slug={slug}
              class={`unset ${slug === currentHeading ? "text-gray-900 font-semibold" : "text-gray-600"}`}
              href={`#${slug}`}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
