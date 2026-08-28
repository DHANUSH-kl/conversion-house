import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const SENDER_EMAIL = process.env.QUOTE_FROM_EMAIL || "hello@conversionhouse.in";
const SENDER_NAME = process.env.OTP_FROM_NAME || "ConversionHouse";
const SENDER_HEADER = `${SENDER_NAME} <${SENDER_EMAIL}>`;

export async function sendOtpEmail(toEmail: string, otpCode: string): Promise<{ success: boolean; message?: string }> {
  const subject = "Verify your email — ConversionHouse";
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Verify your email</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #ffffff; color: #000000; margin: 0; padding: 40px 20px;">
        <div style="max-width: 480px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 16px; padding: 36px; background-color: #ffffff;">
          <div style="font-size: 20px; font-weight: 700; font-family: monospace; color: #000000; margin-bottom: 24px;">
            ConversionHouse<span style="color: #ff4500;">.</span>
          </div>

          <h1 style="font-size: 22px; font-weight: 700; color: #000000; margin: 0 0 12px 0; letter-spacing: -0.02em;">
            Verify your email
          </h1>

          <p style="font-size: 14px; color: #555555; line-height: 1.6; margin: 0 0 24px 0;">
            Use the 6-digit verification code below to continue:
          </p>

          <div style="background-color: #f7f7f7; border: 1px solid #eaeaea; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 24px;">
            <span style="font-family: monospace; font-size: 34px; font-weight: 700; letter-spacing: 8px; color: #ff4500;">
              ${otpCode}
            </span>
          </div>

          <p style="font-size: 13px; color: #777777; line-height: 1.5; margin: 0 0 16px 0;">
            This code expires in 10 minutes.
          </p>

          <p style="font-size: 12px; color: #999999; line-height: 1.5; margin: 0; border-top: 1px solid #f0f0f0; padding-top: 20px;">
            If you didn't request an estimate from ConversionHouse, you can ignore this email.
          </p>
        </div>
      </body>
    </html>
  `;

  if (resend) {
    try {
      const result = await resend.emails.send({
        from: SENDER_HEADER,
        to: [toEmail],
        replyTo: SENDER_EMAIL,
        subject,
        html: htmlContent,
      });

      if (result.error) {
        console.error("[Resend OTP Error]:", result.error);
        return { success: false, message: result.error.message };
      }
      return { success: true };
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      console.error("[Resend OTP Exception]:", errMsg);
      return { success: false, message: errMsg };
    }
  } else {
    console.error("[Resend Error] RESEND_API_KEY is missing from environment variables.");
    return { success: false, message: "Email service unconfigured." };
  }
}

export async function sendLeadNotificationEmail(payload: {
  quoteId: string;
  name: string;
  email: string;
  phone: string;
  industry: string;
  goal: string;
  timeline: string;
  selectedServices: string[];
  projectContext?: string;
  budget?: string;
  estimatedRange: string;
  submittedAt: string;
}, pdfBuffer?: Buffer): Promise<boolean> {
  const targetRecipient = process.env.QUOTE_NOTIFICATION_EMAIL || "dhanush@conversionhouse.in";
  const subject = `New Quote Request — ${payload.name} — ConversionHouse`;
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New ConversionHouse Quote Lead</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8f8f8; color: #000000; margin: 0; padding: 30px 15px;">
        <div style="max-width: 560px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 16px; padding: 32px; background-color: #ffffff;">
          
          <div style="font-size: 11px; font-family: monospace; color: #ff4500; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px;">
            [ NEW CONVERSIONHOUSE QUOTE LEAD ]
          </div>
          
          <h2 style="font-size: 22px; font-weight: 700; color: #000000; margin: 0 0 20px 0; letter-spacing: -0.5px;">
            ${payload.name} requested an estimate
          </h2>

          <!-- Client Details Box -->
          <div style="background-color: #fafafa; border: 1px solid #eaeaea; border-radius: 12px; padding: 18px; margin-bottom: 20px;">
            <div style="font-size: 10px; font-family: monospace; color: #888888; text-transform: uppercase; margin-bottom: 10px; font-weight: 700;">
              CLIENT INFORMATION
            </div>
            <table style="width: 100%; font-size: 13px; border-collapse: collapse;">
              <tr>
                <td style="padding: 4px 0; color: #666666; width: 30%;">Name:</td>
                <td style="padding: 4px 0; color: #000000; font-weight: 600;">${payload.name}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; color: #666666;">Email:</td>
                <td style="padding: 4px 0; color: #000000; font-weight: 600;">
                  <a href="mailto:${payload.email}" style="color: #ff4500; text-decoration: none;">${payload.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 4px 0; color: #666666;">Phone:</td>
                <td style="padding: 4px 0; color: #000000; font-weight: 600;">${payload.phone}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; color: #666666;">Quote ID:</td>
                <td style="padding: 4px 0; color: #ff4500; font-family: monospace; font-weight: 700;">${payload.quoteId}</td>
              </tr>
            </table>
          </div>

          <!-- Project Snapshot -->
          <div style="background-color: #fafafa; border: 1px solid #eaeaea; border-radius: 12px; padding: 18px; margin-bottom: 20px;">
            <div style="font-size: 10px; font-family: monospace; color: #888888; text-transform: uppercase; margin-bottom: 10px; font-weight: 700;">
              PROJECT SNAPSHOT
            </div>
            <table style="width: 100%; font-size: 13px; border-collapse: collapse;">
              <tr>
                <td style="padding: 4px 0; color: #666666; width: 30%;">Industry:</td>
                <td style="padding: 4px 0; color: #000000; font-weight: 600;">${payload.industry || "Not specified"}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; color: #666666;">Goal:</td>
                <td style="padding: 4px 0; color: #000000; font-weight: 600;">${payload.goal || "Not specified"}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; color: #666666;">Timeline:</td>
                <td style="padding: 4px 0; color: #000000; font-weight: 600;">${payload.timeline || "Not specified"}</td>
              </tr>
            </table>
          </div>

          <!-- Selected Services -->
          <div style="margin-bottom: 20px;">
            <div style="font-size: 10px; font-family: monospace; color: #888888; text-transform: uppercase; margin-bottom: 8px; font-weight: 700;">
              SELECTED SERVICES (${payload.selectedServices?.length || 0})
            </div>
            <ul style="margin: 0; padding-left: 18px; font-size: 13px; color: #222222; line-height: 1.6;">
              ${payload.selectedServices?.map((s) => `<li>${s}</li>`).join("") || "<li>None selected</li>"}
            </ul>
          </div>

          <!-- Project Notes -->
          ${payload.projectContext ? `
            <div style="background-color: #fafafa; border: 1px solid #eaeaea; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
              <div style="font-size: 10px; font-family: monospace; color: #888888; text-transform: uppercase; margin-bottom: 6px; font-weight: 700;">
                PROJECT CONTEXT & NOTES
              </div>
              <p style="font-size: 13px; color: #444444; margin: 0; line-height: 1.5;">${payload.projectContext}</p>
            </div>
          ` : ""}

          <!-- Estimate Range Banner -->
          <div style="background-color: #111111; color: #ffffff; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 24px;">
            <span style="font-size: 10px; font-family: monospace; color: #888888; letter-spacing: 1px; display: block; margin-bottom: 4px;">CALCULATED ESTIMATED RANGE</span>
            <span style="font-size: 28px; font-weight: 700; color: #ff4500;">${payload.estimatedRange}</span>
          </div>

          <div style="border-top: 1px solid #f0f0f0; padding-top: 16px; font-size: 11px; color: #888888; font-family: monospace; text-align: center;">
            Submitted on ${new Date(payload.submittedAt).toLocaleString("en-US", { timeZone: "Asia/Kolkata" })} IST • Reply directly to this email to contact ${payload.name}.
          </div>

        </div>
      </body>
    </html>
  `;

  const attachments = pdfBuffer
    ? [{ filename: `conversionhouse-estimate-${payload.quoteId}.pdf`, content: pdfBuffer }]
    : [];

  if (resend) {
    try {
      console.log(`[Internal Lead Email] Sending directly to verified recipient: ${targetRecipient} from ${SENDER_HEADER}`);

      const result = await resend.emails.send({
        from: SENDER_HEADER,
        to: [targetRecipient],
        replyTo: payload.email,
        subject,
        html: htmlContent,
        attachments,
      });

      if (result.error) {
        console.error(`[Resend Internal Lead Email Error] Quote ID: ${payload.quoteId} | Target: ${targetRecipient} | Resend Error:`, result.error);
        return false;
      }

      console.log(`[Resend Internal Lead Email SUCCESS] Successfully sent to ${targetRecipient} for Quote ID: ${payload.quoteId}`);
      return true;
    } catch (err) {
      console.error(`[Internal Lead Email Exception] Quote ID: ${payload.quoteId} | Target: ${targetRecipient} | Exception:`, err);
      return false;
    }
  } else {
    console.error("[Resend Error] RESEND_API_KEY is missing from environment variables.");
    return false;
  }
}

export async function sendClientEstimateEmail(payload: {
  quoteId: string;
  name: string;
  email: string;
  estimatedRange: string;
}, pdfBuffer?: Buffer): Promise<boolean> {
  const firstName = payload.name.split(" ")[0] || payload.name;
  const subject = `Your ConversionHouse Estimate — ${payload.name}`;
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || "https://conversionhouse.in/contact";

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Your ConversionHouse Estimate</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #ffffff; color: #000000; margin: 0; padding: 40px 20px;">
        <div style="max-width: 520px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 16px; padding: 40px; background-color: #ffffff;">
          <div style="font-size: 20px; font-weight: 700; font-family: monospace; color: #000000; margin-bottom: 24px;">
            ConversionHouse<span style="color: #ff4500;">.</span>
          </div>

          <p style="font-size: 16px; font-weight: 600; color: #000000; margin: 0 0 16px 0;">
            Hi ${firstName},
          </p>

          <p style="font-size: 14px; color: #444444; line-height: 1.6; margin: 0 0 20px 0;">
            Your project estimate is ready. Based on the requirements you selected, we've prepared an estimated investment range for your project:
          </p>

          <div style="background-color: #fafafa; border: 1px solid #eaeaea; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
            <span style="font-size: 11px; font-family: monospace; color: #888888; letter-spacing: 1px; display: block; margin-bottom: 6px;">ESTIMATED INVESTMENT</span>
            <span style="font-size: 32px; font-weight: 700; color: #ff4500; letter-spacing: -0.5px;">
              ${payload.estimatedRange}
            </span>
          </div>

          <p style="font-size: 13px; color: #555555; line-height: 1.6; margin: 0 0 24px 0;">
            We've attached your personalized project estimate PDF with the full scope you selected.
          </p>

          <p style="font-size: 13px; color: #555555; line-height: 1.6; margin: 0 0 28px 0;">
            The next step is a short 20-minute conversation where we can understand the project in more detail, refine the scope and confirm the final quote.
          </p>

          <div style="text-align: center; margin-bottom: 32px;">
            <a href="${bookingUrl}" target="_blank" style="background-color: #ff4500; color: #ffffff; font-size: 12px; font-weight: 700; font-family: monospace; text-transform: uppercase; letter-spacing: 1px; padding: 14px 28px; border-radius: 30px; text-decoration: none; display: inline-block;">
              Book a 20-minute call &rarr;
            </a>
          </div>

          <div style="border-top: 1px solid #f0f0f0; padding-top: 20px; font-size: 12px; color: #888888; font-family: monospace;">
            Best,<br>
            <strong>ConversionHouse.</strong><br>
            <span style="color: #aaaaaa;">Branding • Technology • Growth</span>
          </div>
        </div>
      </body>
    </html>
  `;

  const attachments = pdfBuffer
    ? [{ filename: `conversionhouse-estimate-${payload.quoteId}.pdf`, content: pdfBuffer }]
    : [];

  if (resend) {
    try {
      const result = await resend.emails.send({
        from: SENDER_HEADER,
        to: [payload.email],
        replyTo: SENDER_EMAIL,
        subject,
        html: htmlContent,
        attachments,
      });

      if (result.error) {
        console.error(`[Resend Client Email Error] Quote ID: ${payload.quoteId} | Target: ${payload.email} | Error:`, result.error);
        return false;
      }

      return true;
    } catch (err) {
      console.error(`[Client Estimate Email Exception] Quote ID: ${payload.quoteId} | Target: ${payload.email} | Exception:`, err);
      return false;
    }
  }
  return false;
}
