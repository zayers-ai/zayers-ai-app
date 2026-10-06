"use client";
import { useState } from "react";

export default function Home(){
const [m,setM]=useState("");
const [c,setC]=useState([{r:"ai",t:"I am ZAYERS AI ⚡ Built by Zayers. The upgrade over ACE_X. What should we build today Boss?"}]);
const [l,setL]=useState(false);

async function send(x){
const txt=x||m; if(!txt.trim()) return;
setC(v=>[...v,{r:"u",t:txt}]); setM(""); setL(true);
try{
const res=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:txt})});
const d=await res.json();
setC(v=>[...v,{r:"ai",t:d.reply||"Done Boss"}]);
}catch{
setC(v=>[...v,{r:"ai",t:"Network error Boss, try again"}]);
}
setL(false);
}

return(
<div style={{minHeight:"100vh",background:"#07070b",display:"flex",justifyContent:"center",padding:10}}>
<div style={{width:"100%",maxWidth:400,background:"linear-gradient(180deg,#1a1625,#0a0a12)",borderRadius:28,border:"1px solid #ffffff18",height:"92vh",display:"flex",flexDirection:"column",overflow:"hidden"}}>
<div style={{padding:14,display:"flex",alignItems:"center",gap:10,borderBottom:"1px solid #ffffff12"}}>
<div style={{width:38,height:38,borderRadius:12,background:"#FFD700",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900}}>Z</div>
<div style={{color:"#fff",fontWeight:800}}>ZAYERS AI <span style={{background:"#FFD70033",color:"#FFD700",fontSize:10,padding:"3px 8px",borderRadius:20,marginLeft:6}}>PRO</span></div>
</div>
<div style={{flex:1,overflowY:"auto",padding:14,display:"flex",flexDirection:"column",gap:10}}>
{c.map((x,i)=><div key={i} style={{alignSelf:x.r==="u"?"flex-end":"flex-start",background:x.r==="u"?"#ffffff14":"#ffffff0a",border:"1px solid #ffffff14",color:"#fff",padding:"12px 14px",borderRadius:16,maxWidth:"85%",fontSize:14}}>{x.t}</div>)}
{l&&<div style={{color:"#999",fontSize:12}}>ZAYERS typing...</div>}
</div>
<div style={{padding:10,display:"flex",gap:8,flexWrap:"wrap"}}>
{["Build website","Viral script","Make me rich","Roast ACE_X"].map(t=><button key={t} onClick={()=>send(t)} style={{background:"#ffffff10",border:"1px solid #ffffff15",color:"#fff",borderRadius:20,padding:"6px 12px",fontSize:12}}>{t}</button>)}
</div>
<div style={{padding:10,display:"flex",gap:8}}>
<input value={m} onChange={e=>setM(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask ZAYERS anything..." style={{flex:1,background:"#ffffff10",border:"1px solid #ffffff18",borderRadius:100,padding:"12px 16px",color:"#fff",outline:"none"}}/>
<button onClick={()=>send()} style={{width:42,height:42,borderRadius:21,background:"#FFD700",border:"none",fontWeight:900}}>↑</button>
</div>
</div>
</div>
);
}
