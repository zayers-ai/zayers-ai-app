import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { message, image } = await req.json();

    const isVision =!!image;
    // Text brain = gpt-oss-20b (no error) bro, Vision brain = llama-3.2-11b (eye) bro
    const model = isVision? "llama-3.2-11b-vision-preview" : "openai/gpt-oss-20b";

    const userContent = isVision
     ? [
          { type: "text", text: message || "Describe this image" },
          { type: "image_url", image_url: { url: image } }
        ]
      : message;

    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: "You are ZAYERS AI, built in Ilorin, Kwara. Helpful, formal and intelligent like ChatGPT but with small Ilorin vibe. You can see images." },
          { role: "user", content: userContent }
        ],
        max_tokens: 1024
      })
    });

    const data = await r.json();

    if (data.error) {
      return NextResponse.json({ reply: "Groq says: " + data.error.message });
    }

    return NextResponse.json({
      reply: data.choices?.[0]?.message?.content || "I no fit reply now bro"
    });

  } catch (e) {
    return NextResponse.json({ reply: "Brain error: " + e.message });
  }
}
