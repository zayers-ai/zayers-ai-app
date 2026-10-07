import Groq from "groq-sdk";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
  const { message, image } = await req.json();

  try {
    let completion;

    if (image) {
      // NEW 2026 VISION MODEL WEY DEY ALIVE BRO
      completion = await groq.chat.completions.create({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: message || "Describe this image bro" },
              { type: "image_url", image_url: { url: image } },
            ],
          },
        ],
        max_tokens: 1000,
      });
    } else {
      // Text only - use best fast model
      completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: message }],
        max_tokens: 1000,
      });
    }

    return Response.json({ reply: completion.choices[0].message.content });

  } catch (e) {
    console.log("First try fail:", e.message);
    // BACKUP EYE if scout fail bro
    try {
      const backup = await groq.chat.completions.create({
        model: "qwen/qwen3-32b",
        messages: image? [
          {
            role: "user",
            content: [
              { type: "text", text: message || "Describe this image" },
              { type: "image_url", image_url: { url: image } },
            ],
          }
        ] : [{ role: "user", content: message }],
      });
      return Response.json({ reply: backup.choices[0].message.content });
    } catch (err) {
      return Response.json({ reply: `Bro Groq error: ${e.message}` });
    }
  }
}
