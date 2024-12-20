export const toCapitalized = (word: string): string => {
  if (word) {
    return word?.charAt(0)?.toUpperCase() + word.slice(1);
  } else {
    return "";
  }
};