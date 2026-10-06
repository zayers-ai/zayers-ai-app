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
}catch{setChat(c=>[...c,{role:"ai",content:"Network error Boss"}]);}
setLoading(false);
}
return(
<div style={{minHeight:"100vh",background:"#070709",color:"#fff",display:"flex",flexDirection:"column",fontFamily:"sans-serif"}}>
<div style={{padding:16,borderBottom:"1px solid #222",display:"flex",justifyContent:"space-between",background:"#000",position:"sticky",top:0}}>
<div style={{display:"flex",gap:8,alignItems:"center"}}><div style={{width:32,height:32,borderRadius:16,background:"linear-gradient(135deg,#FFD700,#FF8C00)",color:"#000",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900}}>Z</div><b style={{letterSpacing:2}}>ZAYERS AI</b><span style={{fontSize:10,background:"#FFD70033",color:"#FFD700",padding:"4px 8px",borderRadius:10}}>PRO</span></div>
<span style={{fontSize:10,opacity:0.4}}>zayers-ai-app.vercel.app</span>
</div>

<div style={{flex:1,overflow:"auto",padding:16,maxWidth:700,width:"100%",margin:"0 auto",display:"flex",flexDirection:"column",gap:12}}>
{chat.map((m,i)=><div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}><div style={{background:m.role==="user"?"#fff":"#15151a",color:m.role==="user"?"#000":"#fff",padding:"12px 16px",borderRadius:20,borderBottomRightRadius:m.role==="user"?4:20,borderBottomLeftRadius:m.role==="user"?20:4,maxWidth:"85%",border:m.role==="user"?"none":"1px solid #FFD70022",fontSize:14}}>{m.content}</div></div>)}
{loading&&<div style={{color:"#FFD700",fontSize:13}}>ZAYERS is thinking...</div>}
<div ref={ref}/>
</div>

<div style={{maxWidth:700,width:"100%",margin:"0 auto",padding:"0 16px 8px",display:"flex",gap:8,overflowX:"auto"}}>
{["Build website","Viral script","Make me rich","Roast ACE_X"].map(q=><button key={q} onClick={()=>send(q)} style={{whiteSpace:"nowrap",fontSize:12,padding:"8px 14px",borderRadius:20,background:"#1a1a20",border:"1px solid #333",color:"#fff"}}>{q}</button>)}
</div>

<div style={{padding:12,borderTop:"1px solid #222",background:"#000",position:"sticky",bottom:0}}>
<div style={{maxWidth:700,margin:"0 auto",display:"flex",gap:8,background:"#1a1a20",borderRadius:30,padding:8,border:"1px solid #333"}}>
<input value={msg} onChange={e=>setMsg(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask ZAYERS anything..." style={{flex:1,background:"transparent",border:"none",outline:"none",padding:"0 12px",color:"#fff"}}/>
<button onClick={()=>send()} style={{width:40,height:40,borderRadius:20,background:"linear-gradient(135deg,#FFD700,#FF8C00)",color:"#000",border:"none",fontWeight:900}}>↑</button>
</div>
<p style={{textAlign:"center",fontSize:9,opacity:0.3,marginTop:8}}>Built by ZAYERS • Ilorin, Kwara • Better than ACE_X</p>
</div>
</div>
)}
