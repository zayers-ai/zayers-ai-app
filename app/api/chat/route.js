import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { message, image } = await req.json();

    if (!message &&!image) {
      return NextResponse.json({ reply: "Yo! I be ZAYERS AI, built for Ilorin. Wetin you need bro?" });
    }

    // Auto choose brain
    const isVision =!!image;
    const model = isVision? "llama-3.2-11b-vision-preview" : "llama-3.3-70b-versatile";

    const userContent = isVision
     ? [
          { type: "text", text: message || "Describe what you see in this image in detail." },
          { type: "image_url", image_url: { url: image } }
        ]
      : message;

    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: "system",
            content: "You are ZAYERS AI. You were built in Ilorin, Kwara for Ilorin people. You are street smart but formal, intelligent, and helpful like ChatGPT. You speak with small Ilorin bro vibe but you are professional and clear. You can see images and chat. Keep answers concise and helpful."
          },
          { role: "user", content: userContent }
        ],
        max_tokens: 1024,
        temperature: 0.7
      })
    });

    const data = await groqRes.json();

    if (data.error) {
      console.error("Groq Error:", data.error);
      return NextResponse.json({ reply: `Groq error: ${data.error.message}. Check your GROQ_API_KEY in Vercel.` });
    }

    const reply = data.choices?.[0]?.message?.content || "I no fit reply now bro, try again.";

    return NextResponse.json({ reply });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ reply: "Brain error bro, try again: " + err.message });
  }
}
