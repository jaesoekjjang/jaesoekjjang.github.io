import { useState } from "preact/hooks";

export const useParams = <T extends Record<string, unknown>>() => {
  const [state] = useState<T>(() => {
    const urlSearchParams = new URLSearchParams(window?.location.search);
    return Object.fromEntries(urlSearchParams.entries()) as T;
  });

  return state;
};
