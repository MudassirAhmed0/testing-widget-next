import { readFileSync } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
const authorizedDomains = [
  "https://testing-widget.vercel.app/",
  "https://testing-widget.vercel.app",
  "testing-widget.vercel.app",
  "testing-widget.vercel.app/",
];

export async function GET(request: NextRequest) {
  console.log(request);
  const { searchParams } = new URL(request.url);
  const apiKey = searchParams.get("apiKey");
  const host = request.headers.get("Host");

  if (validateApiKey(apiKey) && validateDomain(host)) {
    console.log(NextResponse.toString);
    const filePath = path.join(process.cwd(), "public", "index.js");
    const scriptContent = readFileSync(filePath, "utf8");
    console.log(scriptContent);
    // Serve the widget script
    return new Response(scriptContent);

    // res.sendFile(__dirname + "/index.js");
  } else {
    // Unauthorized access
    return NextResponse.json("Access deniend", { status: 403 });
  }
}

function validateApiKey(apiKey: string | null) {
  // Implement logic to validate the API key against your database or storage
  return apiKey === "yourApiKey"; // Replace with your actual validation logic
}

function validateDomain(requestedDomain: string | null) {
  // Implement logic to validate the requesting domain against your list of authorized domains
  if (requestedDomain) {
    return authorizedDomains.includes(requestedDomain);
  }
  return;
}
