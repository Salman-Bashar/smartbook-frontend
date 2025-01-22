/**
 * This file will contain useful helper functions used
 * throughout the project
 */

/**
 * Checks if a given key is a valid key of the provided object.
 *
 * @template T - The type of the object.
 * @param {T} obj - The object to check against.
 * @param {string} key - The key to check.
 * @returns {key is keyof T} - `true` if the key is a valid key of the object, `false` otherwise.
 *
 * @example
 * const myObject = { key1: 'value1', key2: 'value2' };
 * const potentialKey = 'key2';
 *
 * if (isKeyOfObject(myObject, potentialKey)) {
 *   NOTE: TypeScript now understands that potentialKey is a valid key of myObject
 *   const value = myObject[potentialKey];
 *   console.log(value);
 * } else {
 *   console.log(`${potentialKey} is not a valid key of myObject`);
 * }
 */
export function isKeyOfObject(
  obj: object,
  key: string
): key is keyof typeof obj {
  return key in obj;
}
