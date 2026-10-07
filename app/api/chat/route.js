// FILE: app/api/chat/route.ts
// PASTE THIS - FINAL FIX FOR ZAYERS

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { messages, image } = await req.json();

    // 1. IF USER SENDS IMAGE - Use Vision Model (Worldwide stable)
    if (image) {
      const response = await groq.chat.completions.create({
        model: "qwen/qwen3-32b", // NEW - replaces dead llama-3.2-11b-vision
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: messages[messages.length - 1].content },
              { type: "image_url", image_url: { url: image } }
            ]
          }
        ],
        max_tokens: 1024,
      });
      return Response.json({ reply: response.choices[0].message.content });
    }

    // 2. IF TEXT ONLY - Use Fast Text Model
    const response = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b", // NEW - replaces dead llama-3.3-70b
      messages: messages,
      temperature: 0.7,
      max_tokens: 1024,
    });

    return Response.json({ reply: response.choices[0].message.content });

  } catch (error: any) {
    console.error("ZAYERS Error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
