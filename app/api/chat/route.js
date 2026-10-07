// FILE: app/api/chat/route.js - FINAL FIX
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  try {
    const { messages, image } = await req.json();

    // FOR IMAGE - Use Llama 4 Scout (Vision)
    if (image) {
      const res = await groq.chat.completions.create({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: messages[messages.length - 1]?.content || "Describe this image" },
              { type: "image_url", image_url: { url: image } }
            ]
          }
        ],
        max_tokens: 1024,
      });
      return Response.json({ reply: res.choices[0].message.content });
    }

    // FOR TEXT ONLY
    const res = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: messages,
      max_tokens: 1024,
    });

    return Response.json({ reply: res.choices[0].message.content });

  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
