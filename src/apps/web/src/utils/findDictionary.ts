import { Dictionary } from '../constants/dictionary';
import type { DictionaryItem } from '../constants/dictionary';

type DictionaryItemWithFullPath = DictionaryItem & {
  fullPath: string;
};

export const findDictionary = (paths: string[]) => {
  const pathNormalized = paths.length > 2 ? paths.slice(1) : paths;
  const dictiopnary = pathNormalized.reduce(
    (acc, path) => {
      const dictionary = acc.dictionary.find(
        (item) => item.path?.replace('/', '') === path
      );
      if (!dictionary) return acc;

      const parent = acc.find;
      const dictionaryItem = {
        ...dictionary,
        fullPath: `${parent?.path ?? ''}${dictionary.path ?? ''}`
      } as DictionaryItemWithFullPath;

      return {
        find: dictionaryItem,
        dictionary: dictionaryItem.paths ?? []
      };
    },
    {
      find: null as DictionaryItemWithFullPath | null,
      dictionary: Dictionary
    }
  );

  return dictiopnary.find;
};
