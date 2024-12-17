"use client";
import { useState } from "react";
import { convertNumberToWords } from "./utils/convertNumberToWords";

export default function NumberToWords() {
  const [number, setNumber] = useState<string>("");
  const [words, setWords] = useState<string>("");

  const handleConvert = (): void => {
    const num = parseFloat(number);
    if (!isNaN(num)) {
      setWords(convertNumberToWords(num));
    } else {
      setWords("Please enter a valid number");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const input = e.target.value;
    if (/^\d*$/.test(input)) {
      setNumber(input);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Convert Number to Words</h1>
      <input
        type="text"
        placeholder="Enter a number"
        value={number}
        onChange={handleInputChange}
        style={{ marginRight: "1rem", padding: "0.5rem", fontSize: "1rem" }}
      />
      <button
        onClick={handleConvert}
        style={{ padding: "0.5rem", fontSize: "1rem" }}
      >
        Convert
      </button>
      <div style={{ marginTop: "1rem", fontSize: "1.2rem" }}>
        <strong>Words:</strong> {words || "Enter a number to see the result"}
      </div>
    </div>
  );
}
