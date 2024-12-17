// utils/convertNumberToWords.ts
import numWords from "num-words";

export const convertNumberToWords = (number: number): string => {
  try {
    if (typeof number !== "number" || isNaN(number)) {
      throw new Error("Input must be a valid number");
    }

    // Define a safe range for the num-words library
    const MAX_SAFE_NUMBER = 1e15; // Adjust as needed
    const MIN_SAFE_NUMBER = -1e15;

    if (number > MAX_SAFE_NUMBER || number < MIN_SAFE_NUMBER) {
      throw new Error(
        `Number out of supported range. Please use a number between ${MIN_SAFE_NUMBER} and ${MAX_SAFE_NUMBER}.`
      );
    }

    return numWords(number);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error converting number to words:", error.message);
      return `Error: ${error.message}`;
    }
    console.error("Unexpected error:", error);
    return "An unexpected error occurred";
  }
};
