"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [blobUrl, setBlobUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/convert-rtf", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const blob = new Blob([data.result], { type: "text/html" });
        const url = URL.createObjectURL(blob);

        setMessage(data.message || "File uploaded successfully!");
        setBlobUrl(url);
      } else {
        setMessage("Failed to upload file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("An error occurred while uploading the file.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>RTF to HTML Viewer</h1>
      <form onSubmit={handleUpload} style={styles.form}>
        <input
          type="file"
          onChange={handleFileChange}
          style={styles.fileInput}
        />
        <button type="submit" style={styles.button} disabled={isLoading}>
          {isLoading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
      {blobUrl && (
        <div style={styles.resultContainer}>
          <h3 style={styles.subHeader}>Rendered HTML</h3>
          <iframe
            src={blobUrl}
            style={styles.iframe}
            title="Rendered HTML"
          ></iframe>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
    textAlign: "center",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: "24px",
    color: "#333",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  fileInput: {
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
    width: "100%",
    maxWidth: "400px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#005bb5",
  },
  message: {
    marginTop: "20px",
    color: "#0070f3",
    fontWeight: "bold",
  },
  resultContainer: {
    marginTop: "30px",
    textAlign: "left",
  },
  subHeader: {
    fontSize: "20px",
    color: "#333",
    marginBottom: "10px",
  },
  iframe: {
    width: "100%",
    height: "500px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
};
