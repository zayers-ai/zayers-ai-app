import { NextResponse } from "next/server";
export async function POST(req) {
  const { message } = await req.json();
  const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-20b",
      messages: [
        { role: "system", content: "You are ZAYERS AI GH, professional AI assistant built in Ghana 2026. Answer in perfect UK English." },
        { role: "user", content: message }
      ]
    })
  });
  const data = await r.json();
  return NextResponse.json({ reply: data.choices?.[0]?.message?.content || `ERROR: ${JSON.stringify(data)}` });
}
