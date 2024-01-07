import type { JSXInternal } from "node_modules/preact/src/jsx";
import { useCallback } from "preact/hooks";

type Props = {
  href: string;
} & JSXInternal.HTMLAttributes<HTMLAnchorElement>;

export default function Link({ children, href, onClick, ...rest }: Props) {
  const handleClick = useCallback<
    JSXInternal.MouseEventHandler<HTMLAnchorElement>
  >(
    (e) => {
      e.preventDefault();
      onClick?.(e);
      window.history.pushState({}, "", href);
    },
    [onClick]
  );
  return (
    <a class="unset" onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
