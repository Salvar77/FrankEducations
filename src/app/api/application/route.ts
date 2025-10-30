import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Obsługa multipart/form-data (pliki) wymaga dodatkowej biblioteki, np. formidable
  // Na start możesz przyjmować JSON bez plików:
  try {
    const data = await request.json();
    console.log("Received application:", data);

    // Tu: wyślij email, zapisz w bazie, itp.

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
