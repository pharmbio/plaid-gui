/**
 * parse str and split into words using delimiter
 * @param {string} delimiter
 * @param {string} str
 * @returns array with all the split up words
 */
const parse = (delimiter, str) => {
  const re = new RegExp(`/(^${delimiter})|(,$)/g`, "");
  const trim = str.replace(re, "");
  const delim = trim.split(delimiter);
  return delim;
};
export default parse;
