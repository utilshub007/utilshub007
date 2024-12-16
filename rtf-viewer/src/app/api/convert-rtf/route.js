import { UnRTF } from "node-unrtf";
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Define upload directory
const UPLOAD_DIR = path.join(process.cwd(), "/uploads");

export async function POST(req) {
  try {
    // Ensure the upload directory exists
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    // Retrieve the file stream
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Define file path
    const filePath = path.join(UPLOAD_DIR, file.name);

    // Save the file to the server
    const arrayBuffer = await file.arrayBuffer();
    await fs.writeFile(filePath, Buffer.from(arrayBuffer));

    // Convert RTF to HTML using node-unrtf
    const unRtf = new UnRTF();
    const result = await unRtf.convert(filePath, { outputHtml: true });
    const blob = new Blob([result], { type: "text/html" });
    const blobUrl = URL.createObjectURL(blob);
    // console.log(result);
    return NextResponse.json({
      message: "File uploaded successfully",
      fileName: file.name,
      result: result,
      blob: blobUrl,
    });
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
