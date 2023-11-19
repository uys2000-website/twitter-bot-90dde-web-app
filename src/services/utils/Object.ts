/**
 * Turns object into vanilla JS object for Firebase. Removes any type declarations from the object.
 * This is needed by Firebase
 * @constructor
 * @param {object} data Any type of object
 * @returns {object} object
 */
export const getFirebaseObject = function (
  data: object,
  result = {} as object
) {
  for (const key in data) {
    const target = data[key as keyof typeof data];
    if (typeof target === typeof {}) {
      result[key as keyof typeof result] = Object.assign({}, target);
      getFirebaseObject(
        data[key as keyof typeof data],
        result[key as keyof typeof result]
      );
    } else result[key as keyof typeof result] = target;
  }
  return result;
};
