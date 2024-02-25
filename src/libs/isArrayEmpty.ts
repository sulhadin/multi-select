/**
 * Checks if an array is empty or undefined.
 *
 * @template T - The type of elements in the array.
 * @param {Array<T> | undefined} array - The array to be checked.
 * @returns {boolean} - `true` if the array is empty or undefined, `false` otherwise.
 *
 * @example
 * isArrayEmpty(undefined) // true
 * isArrayEmpty([]) // true
 * isArrayEmpty([1, 2]) // false
 * isArrayEmpty([undefined]) // false
 */
export function isArrayEmpty<T>(array?: Array<T>): boolean {
  if (!array || typeof array !== 'object') {
    return true;
  }

  return array.length === 0;
}
