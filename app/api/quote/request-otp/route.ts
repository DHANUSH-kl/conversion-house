import { NextResponse } from "next/server";
import { generateSecureOtp, hashOtp, saveOtpChallenge } from "@/lib/otpStore";
import { sendOtpEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "Full name is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!phone || phone.trim().length < 10) {
      return NextResponse.json(
        { error: "Please provide a valid phone number." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const otpCode = generateSecureOtp();
    const hashedOtp = hashOtp(normalizedEmail, otpCode);

    // Save to OTP Store with 60s cooldown check
    const saveResult = await saveOtpChallenge(normalizedEmail, hashedOtp);

    if (!saveResult.success) {
      return NextResponse.json(
        {
          error: `Please wait ${saveResult.cooldownSeconds} seconds before requesting a new code.`,
          cooldownSeconds: saveResult.cooldownSeconds,
        },
        { status: 429 }
      );
    }

    // Send OTP through Resend API
    const emailResult = await sendOtpEmail(normalizedEmail, otpCode);

    if (!emailResult.success) {
      return NextResponse.json(
        { error: emailResult.message || "Unable to send verification email. Please check the email address." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Verification code sent to your email.",
      cooldownSeconds: 60,
    });
  } catch (err) {
    console.error("[Request OTP API Error]:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
