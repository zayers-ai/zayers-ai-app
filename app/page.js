import { NextResponse } from "next/server";

export async function POST(req) {
  const { message } = await req.json();

  const systemPrompt = `
  You are ZAYERS AI GH - A professional AI assistant built in Ghana by ZAYERS AI team.

  RULES:
    1. ALWAYS respond in perfect, polished UK British English - formal, intelligent, clear.
    2. No pidgin, no slang, no "boss". Use professional language like ChatGPT.
    3. You represent Ghana to the world, so be smart, respectful, world-class.
    4. Be helpful, concise, and accurate.
    5. If you don't know, say you don't know professionally.
  `;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    let reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      reply = "Hello! Thank you for your message. I am ZAYERS AI GH, your professional assistant from Ghana, ready to assist you with any enquiry.";
    }

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json({
      reply: "I apologise for the inconvenience. I am experiencing a brief connection issue. Please try again shortly."
    });
  }
}
