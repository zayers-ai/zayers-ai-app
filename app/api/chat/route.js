import { NextResponse } from "next/server";
export async function POST(req) {
  const { message, image } = await req.json();
  const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      messages: [
        { role: "system", content: "You are ZAYERS AI, built in Ilorin. Formal, intelligent, helpful like ChatGPT. You can see and analyze images perfectly." },
        { role: "user", content: image? [
          { type: "text", text: message || "Describe this image" },
          { type: "image_url", image_url: { url: image } }
        ] : message }
      ],
      max_tokens: 1000
    })
  });
  const data = await r.json();
  return NextResponse.json({ reply: data.choices?.[0]?.message?.content || JSON.stringify(data) });
}
