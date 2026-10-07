import Groq from "groq-sdk";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
  const body = await req.json();
  const { message, image } = body;

  try {
    const messages = image
     ? [
          {
            role: "user",
            content: [
              { type: "text", text: message || "Wetin dey inside this image bro? Describe am with bro style" },
              { type: "image_url", image_url: { url: image } },
            ],
          },
        ]
      : [
          { role: "system", content: "You be ZAYERS AI, built for Ilorin by sharp guy. You dey always add 'bro' for your talk. You be street smart, funny, helpful. You dey loyal." },
          { role: "user", content: message },
        ];

    // Use new eye wey Groq never kill bro
    const model = image? "meta-llama/llama-4-scout-17b-16e-instruct" : "llama-3.3-70b-versatile";

    const completion = await groq.chat.completions.create({
      model: model,
      messages: messages,
      max_tokens: 1000,
    });

    return Response.json({ reply: completion.choices[0].message.content });
  } catch (e) {
    return Response.json({ reply: "Error bro: " + e.message });
  }
}
