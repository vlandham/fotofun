/**
 * Create url parameter string from an object
 * @param {Object} params Object to convert.
 * @returns {String} parameter string
 */
export function makeParams(params) {
  let formData = "";
  for (let prop in params) {
    // TODO: remove trailing &
    formData += prop + "=" + encodeURIComponent(params[prop]) + "&";
  }
  return formData;
}

/**
 * Make a list parameter by expanding out
 * the provided list into a set of key=value&
 * that are then concatenated.
 *
 * @param {String} key list key to use
 * @param {Array} list Array of values for key
 * @param {Object} params Additional parameters
 */
export function makeListParams(key, list, params) {
  return (
    String(key) +
    "=" +
    list.join("&" + String(key) + "=") +
    "&" +
    this.makeParams(params)
  );
}

/**
 * Remove front slash, if present.
 *
 * @param {String} aString
 * @returns {String} string with forward slash removed
 */
function trimFrontSlash(aString) {
  return aString[0] === "/" ? aString.slice(1) : aString;
}

/**
 * Remove end slash, if present.
 *
 * @param {String} aString
 * @returns {String} string with end slash removed
 */
function trimEndSlash(aString) {
  return aString[aString.length - 1] === "/" ? aString.slice(0, -1) : aString;
}

/**
 * Remove leading and trailing slashes from a string
 *
 * @param {String} aString string to use.
 * @returns {String} string with starting and
 *  ending '/' removed, if present.
 *
 */
function trimSlashes(aString) {
  let tString = trimFrontSlash(aString);
  tString = trimEndSlash(tString);

  return tString;
}

/**
 * Convert a path or a list of paths to a url.
 * This is done by concatenating them with '/'.
 * Spurious front or end slashes ('/') are removed.
 *
 * Example: toUrl('//base', 'a/path') becomes
 *  '//base/a/path'
 *
 * @param {Array.String} urlPaths Array of paths.
 *  first one in path is treated special - the
 *  front slash (if present) for it will not be
 *  removed.
 * @returns {String} path.
 */
export function toUrl(...urlPaths) {
  let adjustedPaths = urlPaths.map(urlPath => (urlPath ? urlPath : ""));
  adjustedPaths = adjustedPaths.map((urlPath, index) =>
    index === 0 ? trimEndSlash(urlPath) : trimSlashes(urlPath)
  );
  const totalPath = adjustedPaths.join("/");
  return totalPath;
}
