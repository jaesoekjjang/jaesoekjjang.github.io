type ArrayLike<T> = T | T[];

export const castArray = <T extends unknown>(x: ArrayLike<T>) =>
  Array.isArray(x) ? x : [x];

export const groupBy =
  <T extends Record<string, unknown>, K extends ArrayLike<string>>(arr: T[]) =>
  (key: (i: T) => K) =>
    arr.reduce((groups, item) => {
      const groupNames = castArray(typeof key === "function" ? key(item) : key);
      groupNames.forEach((gn) => (groups[gn] ||= []).push(item));

      return groups;
    }, {} as Record<string, T[]>);

export const formatKorDate = (
  date: Date,
  options?: Intl.DateTimeFormatOptions
) =>
  new Date(date).toLocaleDateString(
    "ko-Kr",
    options ?? {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

export const insertBetween = <T>(arr: T[], separator: T): T[] =>
  arr.reduce((acc, cur) => {
    if (arr.length) acc.push(separator, cur);
    else acc.push(cur);
    return acc;
  }, [] as T[]);
