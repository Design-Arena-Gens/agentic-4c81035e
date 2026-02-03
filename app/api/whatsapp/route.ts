import { NextRequest } from "next/server";
import { processCandidateMessage } from "@/lib/agent";
import { twimlMessage, verifyTwilioSignature } from "@/lib/twilio";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const entries = Array.from(formData.entries()) as [string, string][];
  const params = entries.reduce<Record<string, string>>((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});

  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const signature = req.headers.get("x-twilio-signature");
  const url = `${req.nextUrl.origin}${req.nextUrl.pathname}`;

  const valid = verifyTwilioSignature({ signature, url, params, authToken });
  if (!valid) {
    return new Response("Invalid signature", { status: 401 });
  }

  try {
    const from = params.From;
    const body = params.Body ?? "";
    const profileName = params.ProfileName ?? params.WaId ?? null;

    if (!from) {
      return new Response("Missing sender", { status: 400 });
    }

    const { response } = await processCandidateMessage({ from, body, profileName });
    const xml = twimlMessage(response);

    return new Response(xml, {
      status: 200,
      headers: {
        "Content-Type": "text/xml",
      },
    });
  } catch (error) {
    console.error("Failed to process WhatsApp message", error);
    const xml = twimlMessage(
      "Oops, I hit a snag while processing that. Mind sending it again in a moment?",
    );
    return new Response(xml, {
      status: 200,
      headers: {
        "Content-Type": "text/xml",
      },
    });
  }
}

export const runtime = "nodejs";
