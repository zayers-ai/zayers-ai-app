import { NextResponse } from "next/server";
export async function POST(req) {
  const { message } = await req.json();
  const key = process.env.GROQ_API_KEY;
  const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${key}`
    },
    body: JSON.stringify({
      model: "llama3-8b-8192",
      messages: [
        { role: "system", content: "You are ZAYERS AI GH, professional assistant from Ghana. Answer in UK English." },
        { role: "user", content: message }
      ]
    })
  });
  const data = await r.json();
  if (data.error) return NextResponse.json({ reply: `GROQ ERROR: ${data.error.message}` });
  return NextResponse.json({ reply: data.choices[0].message.content });
}
