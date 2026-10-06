"use client";
import { useState, useRef, useEffect } from "react";
export default function ZayersAI(){
const [input,setInput]=useState("");
const [msgs,setMsgs]=useState([{role:"ai",text:"ZAYERS AI GH 🇬🇭 Ready! I'm your JARVIS - ask me anything boss!"}]);
const [listen,setListen]=useState(false);
const [load,setLoad]=useState(false);
const ref=useRef(null);
useEffect(()=>{ref.current?.scrollIntoView({behavior:"smooth"})},[msgs]);
const voice=()=>{
const S=window.SpeechRecognition||window.webkitSpeechRecognition;
if(!S){alert("Use Chrome");return;}
const r=new S();r.lang="en-GH";r.start();setListen(true);
r.onresult=e=>{setInput(e.results[0][0].transcript);setListen(false);};
r.onend=()=>setListen(false);
};
const send=async()=>{
if(!input.trim())return;
const text=input;
setMsgs(m=>[...m,{role:"user",text}]);
setInput("");setLoad(true);
try{
const res=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:text})});
const d=await res.json();
const reply=d.reply||"ZAYERS got you!";
setMsgs(m=>[...m,{role:"ai",text:reply}]);
speechSynthesis.speak(new SpeechSynthesisUtterance(reply));
}catch{setMsgs(m=>[...m,{role:"ai",text:"Network slow, try again!"}]);}
setLoad(false);
};
return(
<div style={{background:"black",color:"white",height:"100vh",display:"flex",flexDirection:"column"}}>
<header style={{padding:"15px",borderBottom:"1px solid #222",display:"flex",justifyContent:"space-between"}}>
<b>ZAYERS <span style={{color:"#FFD700"}}>AI GH</span></b>
<span style={{background:"#FFD700",color:"black",padding:"4px 12px",borderRadius:"20px",fontSize:"12px",fontWeight:"bold"}}>JARVIS</span>
</header>
<div style={{flex:1,overflowY:"auto",padding:"15px",display:"flex",flexDirection:"column",gap:"12px"}}>
{msgs.map((m,i)=><div key={i} style={{alignSelf:m.role==="user"?"flex-end":"flex-start",background:m.role==="user"?"#FFD700":"#1a1a1a",color:m.role==="user"?"black":"white",padding:"12px 16px",borderRadius:"18px",maxWidth:"80%"}}>{m.text}</div>)}
{load&&<div style={{color:"#FFD700"}}>Typing...</div>}
<div ref={ref}/>
</div>
<div style={{padding:"12px",borderTop:"1px solid #222",display:"flex",gap:"8px"}}>
<button onClick={voice} style={{background:listen?"#FFD700":"#222",color:listen?"black":"white",border:"none",borderRadius:"50%",width:"44px",height:"44px"}}>🎤</button>
<input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask ZAYERS..." style={{flex:1,background:"#111",border:"1px solid #333",borderRadius:"25px",padding:"12px 16px",color:"white"}}/>
<button onClick={send} style={{background:"#FFD700",border:"none",borderRadius:"50%",width:"44px",height:"44px",fontWeight:"bold"}}>↑</button>
</div>
</div>
);
  }
