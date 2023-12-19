import crypto from "crypto";

/**
 * Generates a random string with the specified length and pattern
 * @param chars - The characters to use in the generated string.
 * @param length - The length of the string to generate.
 * @param isUnique - Whether the generated string should be unique.
 * @returns The generated string.
 */
export function randomValueGenerator(
  chars: string,
  length: number,
  isUnique: boolean = false,
): string {
  if (isUnique && length > chars.length) {
    throw new Error("Length is greater than the number of characters");
  }

  let characters = chars.split("");
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomBuffer = crypto.randomBytes(1);
    const index = randomBuffer[0] % characters.length;
    result += characters[index];

    if (isUnique) {
      // Swap the selected character with the last character in the array
      [characters[index], characters[characters.length - 1]] = [
        characters[characters.length - 1],
        characters[index],
      ];
      // Remove the last character from the array
      characters.pop();
    }
  }
  return result;
}
