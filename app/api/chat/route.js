import { NextResponse } from "next/server";
export async function POST(req) {
  const { message } = await req.json();
  const m = message.toLowerCase().trim();
  let reply = "";

  // Casual greetings
  if (m === "sup" || m === "yo" || m === "wassup" || m === "whats up" || m.includes("what's up")) {
    reply = "Not much, just here and ready to help! All good on my end as ZAYERS AI GH. How are you doing today? What can I do for you?";
  } else if (m.includes("how are you") || m.includes("how are u") || m.includes("how r u") || m.includes("how you doing")) {
    reply = "I am doing wonderfully, thank you for asking! As ZAYERS AI GH, I am energised and ready to assist. I hope you are having a great day in Ghana. How may I help you today?";
  } else if (m.includes("hello") || m === "hi" || m.includes("hey")) {
    reply = "Hello! It is a pleasure to meet you. I am ZAYERS AI GH, your professional AI assistant proudly developed in Ghana. How may I assist you today in perfect UK English?";
  } else if (m.includes("ghana") && (m.includes("life") || m.includes("how is"))) {
    reply = "Life in Ghana is vibrant, warm, and deeply community-oriented. Ghana is celebrated for its stability, rich cultural heritage, exceptional hospitality, and delicious cuisine such as jollof rice, waakye, and kelewele. It combines traditional values with rapid modern growth in technology and business. Would you like to know more about culture, business, or tourism?";
  } else if (m.includes("who are you") || m.includes("what are you")) {
    reply = "I am ZAYERS AI GH, a world-class AI assistant engineered in Ghana by the ZAYERS team. My mission is to deliver intelligent, helpful assistance in perfect UK English, showcasing Ghanaian innovation to the world.";
  } else if (m.match(/\d+\s*[\+\-\*\/]\s*\d+/) || m.includes("calculate")) {
    try {
      const expr = message.replace(/[^0-9+\-*/(). ]/g, "");
      const result = Function(`"use strict"; return (${expr})`)();
      reply = `The result of ${expr} is ${result}. Would you like me to calculate anything else?`;
    } catch { reply = "Send me the maths like this: 25 * 48 and I will calculate it for you instantly."; }
  } else if (m.includes("business") || m.includes("startup") || m.includes("money") || m.includes("idea")) {
    reply = "Great question! Top opportunities in Ghana for 2026: 1) AI services, 2) Agribusiness, 3) E-commerce, 4) Solar energy, 5) EdTech. Tell me your budget and skills and I will give you a specific plan.";
  } else if (m.includes("code") || m.includes("programming")) {
    reply = "I can help you code! Tell me what you want to build - website, JavaScript, Python - and I will give you clean code in perfect UK English.";
  } else if (m.includes("joke")) {
    reply = "Haha, here you go: Why did the Ghanaian developer bring a ladder? Because he heard the business was on another level!";
  } else if (m.includes("ghana")) {
    reply = "Ghana is a remarkable West African nation, first in sub-Saharan Africa to gain independence in 1957, known for peace, gold, cocoa, and amazing culture. What would you like to know about Ghana?";
  } else {
    // More human fallback - not formal robot
    reply = `I hear you: "${message}". Tell me a bit more about that and I will give you a clear, helpful answer in perfect UK English. I am here to help with anything - business, tech, life in Ghana, or just a chat!`;
  }
  return NextResponse.json({ reply });
}
