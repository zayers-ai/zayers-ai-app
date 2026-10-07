import { NextResponse } from "next/server";

export async function POST(req){
 try{
  const { message, image } = await req.json();

  const messages = [
   { role:"system", content:"You are ZAYERS AI, built in Ilorin. You are helpful, formal, intelligent like ChatGPT. If user sends image, you MUST describe what you see in detail and answer questions about it. You have vision." }
  ];

  if(image){
    messages.push({
      role:"user",
      content:[
        { type:"text", text: message || "Describe this image in detail and answer about it." },
        { type:"image_url", image_url:{ url: image } }
      ]
    });
  } else {
    messages.push({ role:"user", content: message });
  }

  const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      messages,
      max_tokens: 800
    })
  });

  const data = await groqRes.json();
  const reply = data.choices?.[0]?.message?.content || "I can see your image bro! " + JSON.stringify(data).slice(0,200);

  return NextResponse.json({ reply });
 }catch(e){
  console.log(e);
  return NextResponse.json({ reply:"Error from brain: " + e.message });
 }
}
