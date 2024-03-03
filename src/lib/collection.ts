import {
  getCollection,
  type CollectionKey,
  type CollectionEntry,
} from "astro:content";

export const getCollectionByDate = async <K extends CollectionKey>(
  collection: K,
  filter?: (entry: CollectionEntry<K>) => boolean,
) => {
  return (await getCollection(collection, filter)).sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
  );
};
