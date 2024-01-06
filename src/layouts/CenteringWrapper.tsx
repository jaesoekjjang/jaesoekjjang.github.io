import type { VNode } from "preact";

{
  /* <div class="inner">
  <slot />
</div>
<style>
  .inner {
    max-width: 60ch;
    margin: auto;
  }
</style> */
}

export default function CenteringWrapper({
  children,
}: {
  children: VNode | VNode[];
}) {
  return <div class="max-w-[60ch] m-auto w-[100%]">{children}</div>;
}
