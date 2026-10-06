import { NextResponse } from "next/server";
export async function POST(req) {
  const { message } = await req.json();
  const m = message.toLowerCase();
  let reply = "";
  if (m.includes("hello") || m.includes("hi")) {
    reply = "Hello! It is a pleasure to meet you. I am ZAYERS AI GH, a professional artificial intelligence assistant proudly developed in Ghana. How may I assist you today?";
  } else if (m.includes("ghana") && m.includes("life")) {
    reply = "Life in Ghana is vibrant, warm, and community-oriented. Ghana is known for its rich cultural heritage, diverse traditions, delicious cuisine such as jollof rice and waakye, and exceptionally hospitable people. Daily life balances modern innovation with deep respect for family, elders, and tradition. Ghana is also one of Africa's most peaceful and democratic nations, with a growing technology and entrepreneurial sector. Would you like me to elaborate on culture, business, or tourism in Ghana?";
  } else if (m.includes("who are you") || m.includes("what are you")) {
    reply = "I am ZAYERS AI GH, a professional AI assistant built in Ghana by the ZAYERS team. My purpose is to provide world-class, accurate, and helpful assistance in perfect UK English, demonstrating Ghanaian excellence on the global stage.";
  } else if (m.includes("ghana")) {
    reply = "Ghana is a remarkable West African nation renowned for its stability, cultural richness, and economic growth. As the first sub-Saharan African country to gain independence in 1957, it has a proud history and a bright future in technology, business, and innovation. How may I help you learn more about Ghana?";
  } else {
    reply = `Thank you for your enquiry: "${message}". As ZAYERS AI GH, your professional assistant from Ghana, I am here to provide you with clear, accurate, and helpful information in polished UK English. Could you please provide more detail on how I may assist you with this topic?`;
  }
  return NextResponse.json({ reply });
}
