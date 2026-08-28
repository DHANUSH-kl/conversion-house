import { NextResponse } from "next/server";
import { getOtpChallenge, hashOtp, incrementOtpAttempts, deleteOtpChallenge, createVerificationToken } from "@/lib/otpStore";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, otp } = body;

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and verification code are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const cleanOtp = otp.trim();

    if (cleanOtp.length !== 6 || !/^\d{6}$/.test(cleanOtp)) {
      return NextResponse.json(
        { error: "Verification code must be 6 digits." },
        { status: 400 }
      );
    }

    const challenge = await getOtpChallenge(normalizedEmail);

    if (!challenge) {
      return NextResponse.json(
        { error: "Verification code has expired or is invalid. Please request a new code." },
        { status: 400 }
      );
    }

    if (challenge.attempts >= 5) {
      await deleteOtpChallenge(normalizedEmail);
      return NextResponse.json(
        { error: "Maximum verification attempts exceeded. Please request a new code." },
        { status: 400 }
      );
    }

    // Verify HMAC hash
    const expectedHash = hashOtp(normalizedEmail, cleanOtp);
    if (challenge.hashedOtp !== expectedHash) {
      const attempts = await incrementOtpAttempts(normalizedEmail);
      const remaining = 5 - attempts;
      return NextResponse.json(
        { error: `Invalid verification code. ${remaining} attempts remaining.` },
        { status: 400 }
      );
    }

    // On successful match: delete OTP challenge and issue signed verification token
    await deleteOtpChallenge(normalizedEmail);
    const verificationToken = createVerificationToken(normalizedEmail);

    return NextResponse.json({
      success: true,
      message: "Email verified successfully.",
      verificationToken,
    });
  } catch (err) {
    console.error("[Verify OTP API Error]:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred during verification." },
      { status: 500 }
    );
  }
}
