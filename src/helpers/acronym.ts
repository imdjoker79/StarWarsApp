/**
 * acronym for group name avatar
 */

export default function acronym(str: string) {
  const acr = str
    .split(/\s/)
    .reduce((response, word) => (response += word.slice(0, 1)), '');

  return acr.slice(0, 2);
}
