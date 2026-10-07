import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
  try {
    const { messages, image } = await req.json();

    // IF IMAGE UPLOADED - SEE AND ANSWER
    if (image) {
      const lastUserMessage = messages[messages.length - 1]?.content || "What do you see in this image? Explain and work with it.";

      const completion = await groq.chat.completions.create({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: lastUserMessage },
              { type: "image_url", image_url: { url: image } }
            ]
          }
        ],
        max_tokens: 1500,
      });

      return NextResponse.json({ reply: completion.choices[0].message.content });
    }

    // TEXT ONLY
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: messages,
      max_tokens: 1024,
    });

    return NextResponse.json({ reply: completion.choices[0].message.content });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
