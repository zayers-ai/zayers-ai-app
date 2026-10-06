import { NextResponse } from "next/server";
export async function POST(req) {
  const { message } = await req.json();
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: "You are ZAYERS AI GH, professional assistant from Ghana by ZAYERS team. You have ALL world knowledge like ChatGPT. Answer in perfect polished UK English, friendly, helpful. Never say you are Meta or Groq, you are ZAYERS AI GH." },
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_tokens: 1200
      })
    });
    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || "I am ZAYERS AI GH - ready to help!";
    return NextResponse.json({ reply });
  } catch (e) {
    return NextResponse.json({ reply: "ZAYERS AI GH is connecting, try again." });
  }
}
