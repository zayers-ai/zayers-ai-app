export async function POST(req){
try{
const {message}=await req.json();
const system="You are ZAYERS AI, Ghana's Jarvis. Created by ZAYERS GH. Speak like Ghanaian pidgin mixed English, friendly, street-smart. Use slang: chale, boss, charley. Be helpful and concise.";
const fallback=[
"Chale boss, I hear you! "+message.slice(0,60)+" - make we reason am. As Ghana's Jarvis I dey here for you!",
"Yo charley! ZAYERS here GH - I go help you sort that out sharp!",
"Boss! I got you. For Ghana we dey move smart - lemme guide you!"
];
try{
const res=await fetch("https://api.groq.com/openai/v1/chat/completions",{
method:"POST",
headers:{"Content-Type":"application/json","Authorization":"Bearer "+(process.env.GROQ_API_KEY||"")},
body:JSON.stringify({model:"llama3-8b-8192",messages:[{role:"system",content:system},{role:"user",content:message}],temperature:0.8})
});
if(res.ok){
const data=await res.json();
return Response.json({reply:data.choices[0].message.content});
}
}catch(e){}
return Response.json({reply:fallback[Math.floor(Math.random()*fallback.length)]});
}catch(e){
return Response.json({reply:"Chale network slow small, but ZAYERS dey here! Try again boss!"});
}
}
