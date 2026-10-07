// FILE: app/api/chat/route.js - WORKING VERSION
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const messages = body.messages;
    const image = body.image;

    if (image) {
      const response = await groq.chat.completions.create({
        model: "qwen/qwen3-32b",
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

    const response = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: messages,
      max_tokens: 1024,
    });

    return Response.json({ reply: response.choices[0].message.content });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
