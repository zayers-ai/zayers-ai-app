"use client";
import { useState, useRef, useEffect } from "react";
export default function Home(){
const [msg,setMsg]=useState("");
const [chat,setChat]=useState([{role:"ai",content:"I am ZAYERS AI ⚡ Built by Zayers. The upgrade over ACE_X. What should we build today Boss?"}]);
const [loading,setLoading]=useState(false);
const ref=useRef(null);
useEffect(()=>{ref.current?.scrollIntoView({behavior:"smooth"})},[chat,loading]);
async function send(t){
const p=t||msg; if(!p.trim())return;
setChat(c=>[...c,{role:"user",content:p}]); setMsg(""); setLoading(true);
try{
const r=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:p})});
const d=await r.json();
setChat(c=>[...c,{role:"ai",content:d.reply||d.message||"ZAYERS online Boss."}]);
}catch{setChat(c=>[...c,{role:"ai",content:"Network error Boss, retry."}]);}
setLoading(false);
}
return(
<div className="min-h-screen bg-[#050507] text-white flex flex-col">
<header className="p-4 border-b border-white/10 flex justify-between bg-black/50 sticky top-0 z-50">
<div className="flex gap-2 items-center"><div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center text-black font-bold">Z</div><b>ZAYERS AI</b><span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">PRO</span></div>
<span className="text-[10px] opacity-40">zayers-ai-app.vercel.app</span>
</header>
<div className="flex-1 overflow-auto p-4 space-y-3 max-w-3xl w-full mx-auto">
{chat.map((m,i)=><div key={i} className={`flex ${m.role==="user"?"justify-end":"justify-start"}`}><div className={`${m.role==="user"?"bg-white text-black":"bg-[#14141a] border border-yellow-500/20"} px-5 py-3 rounded-[20px] max-w-[85%] text-[14px] ${m.role==="user"?"rounded-br-[5px]":"rounded-bl-[5px]"}`}>{m.content}</div></div>)}
{loading&&<div className="text-yellow-400 text-sm animate-pulse">ZAYERS is thinking...</div>}
<div ref={ref}/>
</div>
<div className="max-w-3xl w-full mx-auto px-4 flex gap-2 pb-2 overflow-x-auto">
{["Build website","Viral script","Make me rich","Roast ACE_X"].map(q=><button key={q} onClick={()=>send(q)} className="whitespace-nowrap text-xs px-4 py-2 rounded-full bg-white/10 border border-white/10 hover:bg-yellow-500 hover:text-black">{q}</button>)}
</div>
<div className="p-4 border-t border-white/10 bg-black/80 sticky bottom-0">
<div className="max-w-3xl mx-auto flex gap-2 bg-[#18181e] rounded-full p-2 border border-white/10">
<input value={msg} onChange={e=>setMsg(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask ZAYERS anything..." className="flex-1 bg-transparent outline-none px-4 text-sm"/>
<button onClick={()=>send()} className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 text-black font-bold">↑</button>
</div>
<p className="text-center text-[9px] opacity-30 mt-2">Built by ZAYERS • Ilorin, Kwara • Better than ACE_X</p>
</div>
</div>
)}
