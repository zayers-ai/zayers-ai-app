import { NextResponse } from "next/server";
export async function POST(req) {
  const { message } = await req.json();
  try {
    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${process.env.GROQ_API_KEY}` },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: "You are ZAYERS AI GH, professional AI assistant from Ghana. Answer in perfect UK English with full knowledge." },
          { role: "user", content: message }
        ]
      })
    });
    const data = await r.json();
    return NextResponse.json({ reply: data.choices[0].message.content });
  } catch (e) {
    return NextResponse.json({ reply: e.message });
  }
}
