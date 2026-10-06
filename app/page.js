"use client";
import { useState, useRef, useEffect } from "react";
export default function Home(){
const [input,setInput]=useState("");
const [messages,setMessages]=useState([{role:"ai",text:"ZAYERS ULTRA • BLACK DIAMOND\n\nPrivate. Encrypted. Executive.\n\nWagwan Boss - I dey online."}]);
const [isLoading,setIsLoading]=useState(false);
const endRef=useRef(null);
useEffect(()=>{endRef.current?.scrollIntoView({behavior:"smooth"});},[messages,isLoading]);
const send=async(t)=>{
const txt=t||input; if(!txt.trim()||isLoading) return;
setMessages(v=>[...v,{role:"user",text:txt}]); setInput(""); setIsLoading(true);
try{
const r=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:txt,history:messages.slice(-6).map(m=>({role:m.role==="user"?"user":"assistant",content:m.text}))})});
const d=await r.json();
setMessages(v=>[...v,{role:"ai",text:d.reply}]);
}catch{setMessages(v=>[...v,{role:"ai",text:"Error Boss"}]);}
setIsLoading(false);
};
return(
<div style={{minHeight:"100vh",background:"#000",display:"flex",justifyContent:"center"}}>
<style>{`@keyframes f1{0%,100%{transform:translateY(0) translateZ(0)}50%{transform:translateY(-6px) translateZ(0)}} .b1{animation:f1 4s ease-in-out infinite} @keyframes f2{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}} .b2{animation:f2 5s ease-in-out infinite} *::-webkit-scrollbar{display:none}`}</style>
<div style={{width:"100%",maxWidth:400,height:"100vh",background:"radial-gradient(90% 60% at 50% -20%,#1a1a1a 0%,#000 100%)",position:"relative",overflow:"hidden",display:"flex",flexDirection:"column"}}>
<div style={{position:"absolute",top:-100,left:-100,width:300,height:300,background:"radial-gradient(circle,#C9A86A15,transparent 70%)",filter:"blur(30px)"}}></div>
<div style={{position:"absolute",bottom:100,right:-50,width:250,height:250,background:"radial-gradient(circle,#ffffff08,transparent 70%)",filter:"blur(30px)"}}></div>
<div style={{zIndex:2,padding:"32px 24px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div style={{display:"flex",alignItems:"center",gap:10}}>
<div style={{width:2,height:22,background:"#C9A86A"}}></div>
<div><div style={{color:"#fff",fontSize:12,letterSpacing:6,fontWeight:600}}>ZAYERS</div><div style={{color:"#C9A86A66",fontSize:8,letterSpacing:4,marginTop:2}}>ULTRA • 2026 • ILORIN</div></div>
</div>
<div style={{color:"#ffffff22",fontSize:10,letterSpacing:3}}>● LIVE</div>
</div>
<div style={{zIndex:2,flex:1,overflowY:"auto",padding:"10px 18px",display:"flex",flexDirection:"column",gap:18}}>
{messages.map((m,i)=><div key={i} className={m.role==="user"?"b1":"b2"} style={{alignSelf:m.role==="user"?"flex-end":"flex-start",maxWidth:"86%",position:"relative"}}>
<div style={{padding:"16px 18px",borderRadius:m.role==="user"?"24px 24px 6px 24px":"24px 24px 24px 6px",background:m.role==="user"?"#C9A86A":"rgba(255,255,255,0.05)",backdropFilter:"blur(40px)",border:"1px solid "+(m.role==="user"?"#C9A86A":"rgba(255,255,255,0.08)"),color:m.role==="user"?"#000":"#e8e6e1",fontSize:13.5,lineHeight:1.65,whiteSpace:"pre-wrap",boxShadow:m.role==="user"?"0 12px 30px #C9A86A33":"0 12px 40px #000000cc, inset 0 1px 0 rgba(255,255,255,0.1)",fontWeight:m.role==="user"?600:400}}>{m.text}</div>
<div style={{marginTop:6,fontSize:9,color:m.role==="user"?"#C9A86A88":"#ffffff33",letterSpacing:1,paddingLeft:m.role==="user"?0:4,textAlign:m.role==="user"?"right":"left"}}>{m.role==="user"?"DELIVERED • 09:32 AM":"ENCRYPTED • READ"}</div>
</div>)}
{isLoading&&<div style={{color:"#C9A86A44",fontSize:10,letterSpacing:4,paddingLeft:8}}>ZAYERS IS TYPING —</div>}
<div ref={endRef}/>
</div>
<div style={{zIndex:2,padding:"16px 18px 26px"}}>
<div style={{background:"rgba(255,255,255,0.06)",backdropFilter:"blur(40px)",border:"1px solid rgba(201,168,106,0.25)",borderRadius:100,padding:"5px 6px 5px 20px",display:"flex",alignItems:"center",gap:8,boxShadow:"0 20px 50px #000, inset 0 1px 0 rgba(255,255,255,0.12)"}}>
<input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Message your private intelligence..." style={{flex:1,background:"transparent",border:"none",color:"#fff",outline:"none",fontSize:13.5,fontWeight:300,letterSpacing:0.3}}/>
<button onClick={()=>send()} style={{width:38,height:38,borderRadius:19,background:"#C9A86A",border:"none",color:"#000",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>↗</button>
</div>
<div style={{textAlign:"center",marginTop:10,fontSize:8,letterSpacing:3,color:"#ffffff22"}}>BUILT FOR ILORIN • STREET SMART • BILLIONAIRE GRADE</div>
</div>
</div>
</div>
);
}
