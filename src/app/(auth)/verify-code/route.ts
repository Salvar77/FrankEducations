import { NextRequest, NextResponse } from "next/server";

const verificationCodes = new Map();

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: "Email and code are required" },
        { status: 400 }
      );
    }

    // Sprawdź czy kod istnieje i jest ważny
    const storedData = verificationCodes.get(email);

    if (!storedData) {
      return NextResponse.json(
        { error: "No verification code found for this email" },
        { status: 400 }
      );
    }

    // Sprawdź czy kod nie wygasł
    if (Date.now() > storedData.expiresAt) {
      verificationCodes.delete(email);
      return NextResponse.json(
        { error: "Verification code has expired" },
        { status: 400 }
      );
    }

    // Sprawdź czy kod się zgadza
    if (storedData.code !== code) {
      return NextResponse.json(
        { error: "Invalid verification code" },
        { status: 400 }
      );
    }

    // ✅ KOD POPRAWNY - USUŃ Z STORAGE I AKTYWUJ KONTO
    verificationCodes.delete(email);

    // Tutaj w prawdziwej aplikacji:
    // 1. Aktywuj konto użytkownika w bazie danych
    // 2. Zapisz verified: true
    // 3. Utwórz sesję/użytkownika

    console.log(`✅ ACCOUNT VERIFIED: ${email}`);

    return NextResponse.json({
      success: true,
      message: "Account verified successfully",
    });
  } catch (error) {
    console.error("Verify code error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
