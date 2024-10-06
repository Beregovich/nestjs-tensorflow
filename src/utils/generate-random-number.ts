/**Generate random number between min(inclusive) and max(exclusive) parameters
 * @param min left border of range default(1)
 * @param max right border of range default(10)
 * */

export function generateRandomNumber(min = 1, max = 10): number {
  if (!min || !max) {
    console.error(
      `Undefined parameter: min=${min}, max=${max}`,
      'generateRandomNumber',
    );
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
}
