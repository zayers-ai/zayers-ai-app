import { NextResponse } from "next/server";
export async function POST(req) {
  const { message } = await req.json();
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ reply: "ERROR: GROQ_API_KEY missing in Vercel Settings!" });
  }
  try {
    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: "You are ZAYERS AI GH, a professional AI assistant from Ghana with full world knowledge. Answer in perfect UK English." },
          { role: "user", content: message }
        ],
        max_tokens: 1000
      })
    });
    const data = await r.json();
    if (!r.ok) return NextResponse.json({ reply: `GROQ ERROR: ${JSON.stringify(data)}` });
    return NextResponse.json({ reply: data.choices[0].message.content });
  } catch (e) {
    return NextResponse.json({ reply: `SERVER ERROR: ${e.message}` });
  }
}
