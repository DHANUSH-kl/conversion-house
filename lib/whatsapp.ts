export interface WhatsAppLeadPayload {
  name: string;
  email: string;
  phone: string;
  industry: string;
  goal: string;
  timeline: string;
  selectedServices: string[];
  projectContext?: string;
  estimatedRange: string;
}

export async function sendWhatsAppNotification(payload: WhatsAppLeadPayload): Promise<{ success: boolean; configured: boolean }> {
  const accountSid = process.env.WHATSAPP_ACCOUNT_SID;
  const authToken = process.env.WHATSAPP_AUTH_TOKEN;
  const fromPhone = process.env.WHATSAPP_PHONE_NUMBER;
  const toPhone = (process.env.WHATSAPP_RECIPIENT || process.env.WHATSAPP_TO_NUMBER || "919900447762").replace(/\+/g, "");
  const callmebotApiKey = process.env.WHATSAPP_API_KEY || process.env.CALLMEBOT_API_KEY;

  const messageText = `
NEW CONVERSIONHOUSE LEAD

Name: ${payload.name}
Phone: ${payload.phone}
Email: ${payload.email}

Industry: ${payload.industry || "Not specified"}
Goal: ${payload.goal || "Not specified"}
Timeline: ${payload.timeline || "Not specified"}

Services:
${payload.selectedServices?.map((s) => `• ${s}`).join("\n") || "None selected"}

Estimated Range:
${payload.estimatedRange}

Context:
${payload.projectContext || "None"}

Email Verified: YES
`;

  // 1. Check if CallMeBot API Key is provided
  if (callmebotApiKey) {
    try {
      const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(toPhone)}&text=${encodeURIComponent(messageText)}&apikey=${encodeURIComponent(callmebotApiKey)}`;
      const res = await fetch(url);
      if (res.ok) {
        console.log(`[WhatsApp CallMeBot] Successfully delivered message to ${toPhone}`);
        return { success: true, configured: true };
      }
    } catch (err) {
      console.error("[WhatsApp CallMeBot Exception]:", err);
    }
  }

  // 2. Check if Twilio / Meta WhatsApp API is configured
  if (accountSid && authToken && fromPhone) {
    try {
      const endpoint = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
      const params = new URLSearchParams();
      params.append("From", `whatsapp:${fromPhone}`);
      params.append("To", `whatsapp:+${toPhone}`);
      params.append("Body", messageText);

      const authHeader = "Basic " + Buffer.from(`${accountSid}:${authToken}`).toString("base64");

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      if (res.ok) {
        console.log(`[WhatsApp Twilio] Successfully delivered message to +${toPhone}`);
        return { success: true, configured: true };
      } else {
        const errData = await res.text();
        console.error("[WhatsApp Twilio Error]:", errData);
        return { success: false, configured: true };
      }
    } catch (err) {
      console.error("[WhatsApp Twilio Exception]:", err);
      return { success: false, configured: true };
    }
  }

  // Log payload safely if provider is not configured
  console.log(`[WhatsApp Notification] Provider API Key not set. Lead details logged for +${toPhone}:`);
  console.log(messageText);
  return { success: false, configured: false };
}
