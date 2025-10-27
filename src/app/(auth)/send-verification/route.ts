import { NextRequest, NextResponse } from "next/server";

// Tymczasowe storage dla kodów (w produkcji użyj bazy danych)
const verificationCodes = new Map();

export async function POST(request: NextRequest) {
  try {
    const { email, firstName } = await request.json();

    if (!email || !firstName) {
      return NextResponse.json(
        { error: "Email and first name are required" },
        { status: 400 }
      );
    }

    // Generuj 6-cyfrowy kod
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Zapisz kod do tymczasowego storage (ważny przez 15 minut)
    verificationCodes.set(email, {
      code: verificationCode,
      expiresAt: Date.now() + 15 * 60 * 1000, // 15 minut
    });

    // ✅ W PRAWDZIWEJ APLIKACJI: WYŚLIJ EMAIL PRZEZ RESEND
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({...});

    // ✅ TYMCZASOWO: LOGUJ KOD W KONSOLI
    console.log("📧 VERIFICATION CODE:", {
      to: email,
      code: verificationCode,
      expires: new Date(Date.now() + 15 * 60 * 1000).toLocaleString(),
    });

    return NextResponse.json({
      success: true,
      message: "Verification code sent successfully",
      // W development pokazujemy kod w konsoli
      debugCode:
        process.env.NODE_ENV === "development" ? verificationCode : undefined,
    });
  } catch (error) {
    console.error("Send verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
