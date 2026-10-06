import { NextResponse } from "next/server";
export async function POST(req) {
  const { message } = await req.json();
  const systemPrompt = `
  You are ZAYERS AI GH - A world-class AI assistant built in Ghana.
  RULES: ALWAYS respond in perfect, polished UK British English. Formal, professional, intelligent.
  No pidgin, no slang, no "boss". Use proper UK grammar and vocabulary.
  You represent Ghanaian excellence to the world. Be helpful, concise, accurate, and respectful.
  `;
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [ { role: "system", content: systemPrompt }, { role: "user", content: message } ],
        temperature: 0.7
      }),
    });
    const data = await response.json();
    let reply = data.choices?.[0]?.message?.content || "Hello! I am ZAYERS AI GH, your professional assistant from Ghana. How may I assist you today?";
    return NextResponse.json({ reply });
  } catch (e) {
    return NextResponse.json({ reply: "My apologies, I am experiencing a temporary connection issue. Please try again shortly." });
  }
}
