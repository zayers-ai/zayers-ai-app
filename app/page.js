"use client";
import { useState, useRef, useEffect } from "react";
export default function Home(){
const [input,setInput]=useState("");
const [messages,setMessages]=useState([{role:"ai",text:"Welcome, Boss.\n\nZAYERS • NIGHT VIPER • 2026\n\nYour private intelligence is live.",time:"Just now"}]);
const [isLoading,setIsLoading]=useState(false);
const messagesEndRef=useRef(null);
const investorKeynotes=[
{label:"📈 Revenue Model",prompt:"Explain ZAYERS AI revenue model like to a billionaire investor"},
{label:"⚡ Competitive Edge",prompt:"What makes ZAYERS AI better than ChatGPT?"},
{label:"🌍 Scalability",prompt:"Explain scalability"},
{label:"🛡️ Security",prompt:"Explain enterprise security"},
];
useEffect(()=>{messagesEndRef.current?.scrollIntoView({behavior:"smooth"});},[messages,isLoading]);
const sendMessage=async(customText)=>{
const textToSend=customText||input; if(!textToSend.trim()||isLoading) return;
setMessages(v=>[...v,{role:"user",text:textToSend,time:"Just now"}]); setInput(""); setIsLoading(true);
try{
const res=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:textToSend,history:messages.slice(-6).map(m=>({role:m.role==="user"?"user":"assistant",content:m.text}))})});
const d=await res.json();
setMessages(v=>[...v,{role:"ai",text:d.reply||"Done Boss",time:"Just now"}]);
}catch{setMessages(v=>[...v,{role:"ai",text:"Network issue Boss",time:"Just now"}]);}
setIsLoading(false);
};
return(
<div style={{minHeight:"100vh",background:"#020202",display:"flex",justifyContent:"center"}}>
<style>{`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}} .f{animation:float 5s ease-in-out infinite} body{margin:0}`}</style>
<div style={{width:"100%",maxWidth:410,height:"100vh",background:"radial-gradient(120% 80% at 50% -10%,#1a1a1a,#000000 70%)",display:"flex",flexDirection:"column",borderLeft:"1px solid #C9A86A15",borderRight:"1px solid #C9A86A15"}}>
<div style={{padding:"30px 24px 18px",borderBottom:"1px solid #C9A86A18"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<span style={{fontSize:10,letterSpacing:5,color:"#C9A86A88"}}>ZAYERS • ILORIN • 2026</span>
<span style={{width:7,height:7,borderRadius:7,background:"#00ff88",boxShadow:"0 0 12px #00ff88"}}></span>
</div>
<div style={{marginTop:20,fontSize:30,letterSpacing:6,fontWeight:200,color:"#C9A86A",fontFamily:"serif"}}>ZAYERS</div>
<div style={{fontSize:9,letterSpacing:6,color:"#ffffff44",marginTop:4}}>AI ULTRA • NIGHT VIPER</div>
</div>
<div style={{flex:1,overflowY:"auto",padding:"20px",display:"flex",flexDirection:"column",gap:16}}>
{messages.map((m,i)=><div key={i} className="f" style={{alignSelf:m.role==="user"?"flex-end":"flex-start",maxWidth:"84%",padding:"15px 17px",borderRadius:m.role==="user"?"22px 22px 5px 22px":"22px 22px 22px 5px",background:m.role==="user"?"linear-gradient(135deg,#C9A86A,#E8D5B5)":"rgba(255,255,255,0.06)",backdropFilter:"blur(20px)",border:"1px solid "+(m.role==="user"?"#C9A86A":"#C9A86A28"),color:m.role==="user"?"#000":"#fff",boxShadow:m.role==="user"?"0 10px 24px #C9A86A33":"0 10px 30px #000000aa, inset 0 1px 0 #ffffff14",fontSize:13.5,lineHeight:1.6,whiteSpace:"pre-wrap"}}>{m.text}<div style={{fontSize:9,opacity:0.5,marginTop:8,letterSpacing:1}}>{m.time} • {m.role==="user"?"Delivered":"Encrypted"}</div></div>)}
{isLoading&&<div style={{fontSize:10,letterSpacing:3,color:"#C9A86A66",paddingLeft:6}}>ZAYERS •••</div>}
<div ref={messagesEndRef}/>
</div>
<div style={{padding:"10px 18px",display:"flex",gap:8,flexWrap:"wrap"}}>
{investorKeynotes.map(k=><button key={k.label} onClick={()=>sendMessage(k.prompt)} style={{background:"rgba(255,255,255,0.05)",backdropFilter:"blur(10px)",border:"1px solid #C9A86A30",borderRadius:100,padding:"8px 14px",fontSize:11,color:"#C9A86A",letterSpacing:0.5}}>{k.label}</button>)}
</div>
<div style={{padding:"14px 18px 24px",borderTop:"1px solid #ffffff08",display:"flex",gap:10,alignItems:"center",background:"linear-gradient(180deg,transparent,#000000aa)"}}>
<div style={{flex:1,display:"flex",alignItems:"center",background:"rgba(255,255,255,0.06)",backdropFilter:"blur(30px)",border:"1px solid #C9A86A33",borderRadius:100,padding:"4px 6px 4px 18px",boxShadow:"0 10px 30px #000000aa, inset 0 1px 0 #ffffff14"}}>
<input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMessage()} placeholder="Ask ZAYERS anything..." style={{flex:1,background:"transparent",border:"none",color:"#fff",outline:"none",fontSize:13,letterSpacing:0.5}}/>
<button onClick={()=>sendMessage()} style={{width:40,height:40,borderRadius:20,background:"linear-gradient(135deg,#C9A86A,#fff2cc)",border:"none",color:"#000",fontWeight:900,boxShadow:"0 0 15px #C9A86A66"}}>↗</button>
</div>
</div>
</div>
</div>
);
}
