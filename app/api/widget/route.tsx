import { readFileSync } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
const authorizedDomains = ["jjj.com"];

export async function GET(request: NextRequest) {
  console.log(request);
  const { searchParams } = new URL(request.url);
  const apiKey = searchParams.get("apiKey");
  console.log(apiKey);

  if (validateApiKey(apiKey)) {
    console.log(NextResponse.toString);
    const filePath = path.join(process.cwd(), "public", "index.js");
    const scriptContent = readFileSync(filePath, "utf8");
    console.log(scriptContent);
    // const host = request.headers.get("Host");
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

function validateDomain(requestedDomain: string) {
  // Implement logic to validate the requesting domain against your list of authorized domains
  return authorizedDomains.includes(requestedDomain);
}
