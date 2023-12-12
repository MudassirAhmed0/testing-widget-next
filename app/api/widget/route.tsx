import { readFileSync } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
const authorizedDomains = [
  "https://testing-widget.vercel.app/",
  "https://testing-widget.vercel.app",
  "testing-widget.vercel.app",
  "testing-widget",
  "testing-widget.vercel",
  "testing-widget.vercel.app/",
  "testing-widget-next.vercel.app",
  "localhost:3001",
  "localhost:3000",
  "http://localhost:5500/",
  "https://projects.brackets-tech.com/labeeb_widget/",
  "https://projects.brackets-tech.com/",
  "projects.brackets-tech.com/labeeb_widget",
  "projects.brackets-tech.com",
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const apiKey = searchParams.get("apiKey");
  const origin = request.headers.get("referer");
  if (validateApiKey(apiKey) && validateDomain(origin)) {
    console.log(NextResponse.toString);
    const filePath = path.join(process.cwd(), "public", "index.js");
    const scriptContent = readFileSync(filePath, "utf8");
    // Serve the widget script
    return new Response(scriptContent);

    // res.sendFile(__dirname + "/index.js");
  } else {
    // Unauthorized access
    return NextResponse.json("Access Denied", { status: 403 });
  }
}

function validateApiKey(apiKey: string | null) {
  // Implement logic to validate the API key against your database or storage
  return apiKey === "yourApiKey"; // Replace with your actual validation logic
}

function validateDomain(requestedDomain: string | null) {
  // Implement logic to validate the requesting domain against your list of authorized domains
  if (requestedDomain) {
    console.log(authorizedDomains, requestedDomain.toString());
    console.log(authorizedDomains.includes(requestedDomain));
    return authorizedDomains.includes(requestedDomain);
  }
  return;
}
