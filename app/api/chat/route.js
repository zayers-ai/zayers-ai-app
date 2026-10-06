import { NextResponse } from "next/server";
export async function POST(req){
try{
const {message}=await req.json();
const r=await fetch("https://openrouter.ai/api/v1/chat/completions",{
method:"POST",
headers:{"Authorization":`Bearer ${process.env.OPENROUTER_API_KEY}`,"Content-Type":"application/json"},
body:JSON.stringify({model:"openai/gpt-3.5-turbo",messages:[{role:"system",content:"You are ZAYERS AI, built by Zayers in Ilorin. You are the upgrade over ACE_X. Be confident, helpful, short."},{role:"user",content:message}]})
});
const d=await r.json();
const reply=d.choices?.[0]?.message?.content||"ZAYERS ULTRA online Boss";
return NextResponse.json({reply});
}catch(e){
return NextResponse.json({reply:"ZAYERS error: "+e.message});
}
}
