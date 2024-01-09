import type { VNode } from "preact";

export const Switch = <T extends Record<string, VNode>, K extends keyof T>({
  cases,
  value,
  props,
}: {
  cases: T;
  value: K;
  props: T[K] extends VNode<infer P> ? P : never;
}) => {
  return cases[value];
};
