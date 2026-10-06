import { NextResponse } from "next/server";
export async function POST(req) {
  const { message } = await req.json();
  const m = message.toLowerCase().trim();
  let reply = "";

  if (m.includes("hello") || m === "hi" || m.includes("hey")) {
    reply = "Hello! It is a pleasure to meet you. I am ZAYERS AI GH, your professional AI assistant proudly developed in Ghana. I can assist you with business, technology, education, mathematics, coding, and general knowledge — all in polished UK English. How may I assist you today?";
  } else if (m.includes("ghana") && (m.includes("life") || m.includes("how is"))) {
    reply = "Life in Ghana is vibrant, warm, and deeply community-oriented. Ghana is celebrated for its stability, rich cultural heritage, exceptional hospitality, and delectable cuisine such as jollof rice, waakye, and kelewele. As Africa's first sub-Saharan nation to gain independence in 1957, it combines traditional values — respect for family and elders — with rapid modern growth in technology, entrepreneurship, and business. Ghana is widely regarded as one of Africa's most peaceful and promising nations for investment and innovation.";
  } else if (m.includes("who are you") || m.includes("what are you")) {
    reply = "I am ZAYERS AI GH, a world-class artificial intelligence assistant engineered in Ghana by the ZAYERS team. My mission is to deliver accurate, intelligent, and professional assistance in perfect UK English, showcasing Ghanaian excellence and innovation to the global community.";
  } else if (m.match(/\d+\s*[\+\-\*\/]\s*\d+/) || m.includes("calculate") || m.includes("what is") && m.match(/\d+/)) {
    try {
      // Simple maths evaluator
      const expr = message.replace(/[^0-9+\-*/(). ]/g, "");
      const result = Function(`"use strict"; return (${expr})`)();
      reply = `The result of ${expr} is ${result}. I have calculated this accurately for you using precise mathematical evaluation. Is there another calculation you would like me to assist with?`;
    } catch { reply = "I would be delighted to assist with your calculation. Could you please provide the mathematical expression in a clear format, for example: 25 * 48 ?"; }
  } else if (m.includes("business") || m.includes("startup") || m.includes("money") || m.includes("idea")) {
    reply = "That is an excellent business enquiry. For Ghana and beyond, successful opportunities in 2026 include: 1) AI-powered services and automation, 2) Agribusiness and food processing, 3) E-commerce and logistics, 4) Renewable energy solutions, 5) EdTech and digital skills training. Ghana's stable economy and growing middle class make it ideal for innovation. If you share your budget and skills, I can provide a tailored business plan in professional UK English.";
  } else if (m.includes("code") || m.includes("programming") || m.includes("javascript") || m.includes("python") || m.includes("website")) {
    reply = "I would be happy to assist with coding. As ZAYERS AI GH, I can help you build websites, debug JavaScript, write Python scripts, and explain programming concepts in clear, professional UK English. Please share your code or describe what you wish to build, and I shall provide a clean, efficient solution.";
  } else if (m.includes("joke") || m.includes("funny")) {
    reply = "Certainly! Here is a professional one for you: Why did the Ghanaian programmer bring a ladder to the office? Because he heard the business was on another level! I can keep it formal and witty in perfect UK English.";
  } else if (m.includes("ghana")) {
    reply = "Ghana is a remarkable West African nation renowned for its peace, stability, and cultural richness. It was the first sub-Saharan African country to gain independence in 1957, and today it is a leader in technology, gold and cocoa production, and democratic governance. How may I help you explore Ghana further — culture, tourism, business, or history?";
  } else {
    reply = `Thank you for your message: "${message}". As ZAYERS AI GH, your professional assistant from Ghana, I am here to provide you with accurate, helpful, and eloquently expressed information in perfect UK English. Your enquiry is important, and I would be pleased to assist further. Could you please elaborate so I may provide you with the most comprehensive response?`;
  }
  return NextResponse.json({ reply });
}
