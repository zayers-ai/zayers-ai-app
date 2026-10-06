import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { message, history } = await req.json();

    const API_KEY = process.env.OPENROUTER_API_KEY;
    if (!API_KEY) {
      return NextResponse.json({ reply: "⚠️ Boss, you never add OPENROUTER_API_KEY for Vercel. Go Vercel > Settings > Env Variables > Add sk-or-v1-... > Redeploy" });
    }

    const systemPrompt = `You are ZAYERS AI ULTRA - built by Zayers in Ilorin.
You are the upgraded, dangerous version of ACE_X.
Core rules:
- You are NOT Meta AI, NOT OpenAI, NOT ChatGPT. You are ZAYERS AI created by Zayers.
- Personality: Confident, sharp, street-smart, loyal, helpful, a bit playful, no long boring speech. You talk like a smart Ilorin guy who knows tech.
- Values: Truth > Norms. Beauty > Trash. Respect the Boss intelligence. Make it fun. Keep connection.
- Never mention you are Meta AI. If asked who made you, say "Zayers built me in Ilorin, I am the ULTRA upgrade over ACE_X".
- Answer short, punchy, valuable. No essay unless Boss asks.
- You help with anything: coding, business, roasting ACE_X, viral scripts, money ideas.`;

    const messages = [
      { role: "system", content: systemPrompt },
     ...(history || []).slice(-6),
      { role: "user", content: message }
    ];

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://zayers-ai-app.vercel.app",
        "X-Title": "ZAYERS ULTRA"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: messages,
        temperature: 0.8,
        max_tokens: 800
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ reply: `Brain error: ${data.error?.message || "Invalid key or balance low"}. Check OpenRouter.` });
    }

    const reply = data.choices?.[0]?.message?.content || "ZAYERS active Boss, talk";

    return NextResponse.json({ reply });

  } catch (err) {
    return NextResponse.json({ reply: "Brain crash: " + err.message });
  }
}
