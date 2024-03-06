import { useRef } from "preact/hooks";

export const useIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit,
) => {
  const observer = useRef<IntersectionObserver>(
    new IntersectionObserver(callback, options),
  );

  return observer.current;
};
