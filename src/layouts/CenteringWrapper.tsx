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

export default function CenteringWrapper({ children }: { children: VNode }) {
  return (
    <div
      style={{
        maxWidth: "60ch",
        margin: "auto",
      }}
    >
      {children}
    </div>
  );
}
