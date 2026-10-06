"use client";
import { useState, useRef, useEffect } from "react";
export default function ZayersAI(){
const [input,setInput]=useState("");
const [msgs,setMsgs]=useState([{role:"ai",text:"Yo! I'm ZAYERS GH Tap mic to talk!"}]);
const [listen,setListen]=useState(false);
const [load,setLoad]=useState(false);
const ref=useRef(null);
useEffect(()=>{ref.current?.scrollTo(0,ref.current.scrollHeight)},[msgs]);
const voice=()=>{
const S=window.SpeechRecognition||window.webkitSpeechRecognition;
if(!S){alert("Use Chrome");return}
const r=new S();r.lang="en-GH";r.start();setListen(true);
r.onresult=e=>{setInput(e.results[0][0].transcript);setListen(false)};
r.onerror=()=>setListen(false);r.onend=()=>setListen(false);
};
const send=async(t)=>{
const text=t||input;if(!text.trim())return;
setMsgs(m=>[...m,{role:"user",text}]);setInput("");setLoad(true);
try{
const res=await fetch("/api/chat",{method:"POST",body:JSON.stringify({message:text})});
const d=await res.json();const reply=d.reply||"Chale try again";
setMsgs(m=>[...m,{role:"ai",text:reply}]);
speechSynthesis.speak(new SpeechSynthesisUtterance(reply));
}catch{setMsgs(m=>[...m,{role:"ai",text:"Slow network"}])}
setLoad(false);
};
return(
<div style={{background:"#0a0a0a",color:"white",minHeight:"100vh",display:"flex",flexDirection:"column"}}>
<header style={{padding:16,borderBottom:"1px solid #222",display:"flex",justifyContent:"space-between"}}><b>ZAYERS AI GH</b><span style={{background:"#FFD700",color:"black",padding:"4px 10px",borderRadius:20,fontSize:12}}>JARVIS</span></header>
<div ref={ref} style={{flex:1,overflowY:"auto",padding:20,display:"flex",flexDirection:"column",gap:12}}>
{msgs.map((m,i)=><div key={i} style={{alignSelf:m.role=="user"?"flex-end":"flex-start",background:m.role=="user"?"#FFD700":"#1a1a1a",color:m.role=="user"?"black":"white",padding:"12px 16px",borderRadius:18,maxWidth:"80%"}}>{m.text}</div>)}
{load&&<div style={{color:"#888"}}>Thinking...</div>}
</div>
<div style={{padding:12,borderTop:"1px solid #222",display:"flex",gap:8}}>
<button onClick={voice} style={{background:listen?"red":"#222",border:"none",width:48,height:48,borderRadius:"50%"}}>{listen?"🔴":"🎤"}</button>
<input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key=="Enter"&&send()} placeholder="Talk or type..." style={{flex:1,background:"#1a1a1a",border:"1px solid #333",padding:14,borderRadius:30,color:"white"}}/>
<button onClick={()=>send()} style={{background:"#FFD700",border:"none",padding:"12px 20px",borderRadius:30,fontWeight:"bold"}}>Send</button>
</div>
</div>
)}
