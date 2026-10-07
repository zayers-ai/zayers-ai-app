"use client";
import {useState,useRef,useEffect} from "react";
export default function Home(){
const [input,setInput]=useState("");
const [messages,setMessages]=useState([{role:"ai",text:"Yo! I be ZAYERS AI, built for Ilorin. Wetin you need bro?"}]);
const [isLoading,setIsLoading]=useState(false);
const endRef=useRef(null);
useEffect(()=>{endRef.current?.scrollIntoView({behavior:"smooth"})},[messages,isLoading]);
const send=async(t)=>{
const txt=t||input; if(!txt.trim()||isLoading)return;
setMessages(v=>[...v,{role:"user",text:txt}]);
setInput("");
setIsLoading(true);
try{
const r=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:txt})});
const d=await r.json();
setMessages(v=>[...v,{role:"ai",text:d.reply}]);
}catch{setMessages(v=>[...v,{role:"ai",text:"Error Boss, try again"}])}
setIsLoading(false);
};
return(
<div style={{minHeight:"100vh",background:"#000",display:"flex",justifyContent:"center"}}>
<style>{`@keyframes f1{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}`}</style>
<div style={{width:"100%",maxWidth:400,height:"100vh",background:"#0a0a0a",display:"flex",flexDirection:"column",position:"relative",overflow:"hidden",border:"1px solid #222"}}>
<div style={{position:"absolute",top:-100,left:-100,width:300,height:300,background:"radial-gradient(circle,rgba(251,146,60,0.15),transparent)",filter:"blur(30px)"}}></div>
<div style={{position:"absolute",bottom:100,right:-50,width:300,height:300,background:"radial-gradient(circle,rgba(168,85,247,0.15),transparent)",filter:"blur(30px)"}}></div>
<div style={{zIndex:2,padding:"32px 24px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:2,height:22,background:"#C9A86A"}}></div><div><div style={{color:"#fff",fontSize:12,letterSpacing:3,fontWeight:"bold"}}>ZAYERS AI</div><div style={{color:"#ffffff44",fontSize:8,letterSpacing:2}}>ILORIN • STREET SMART</div></div></div>
<div style={{color:"#ffffff22",fontSize:10}}>BETA</div>
</div>
<div style={{zIndex:2,flex:1,overflowY:"auto",padding:"10px 16px"}}>
{messages.map((m,i)=><div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",marginBottom:12}}><div style={{padding:"14px 16px",borderRadius:m.role==="user"?"20px 20px 4px 20px":"20px 20px 20px 4px",maxWidth:"85%",background:m.role==="user"?"#fff":"rgba(255,255,255,0.06)",color:m.role==="user"?"#000":"#fff",fontSize:13}}>{m.text}</div></div>)}
{isLoading&&<div style={{color:"#C9A86A88",fontSize:12,padding:10}}>ZAYERS dey think...</div>}
<div ref={endRef}/>
</div>
<div style={{zIndex:2,padding:"16px 18px 26px"}}>
<div style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:999,display:"flex",alignItems:"center",gap:8,padding:"8px 8px 8px 14px"}}>
<label style={{width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(255,255,255,0.1)",borderRadius:999,cursor:"pointer"}}>📎<input type="file" hidden/></label>
<label style={{width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(255,255,255,0.1)",borderRadius:999,cursor:"pointer"}}>🖼️<input type="file" hidden accept="image/*"/></label>
<input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} style={{flex:1,background:"transparent",border:"none",outline:"none",color:"#fff",fontSize:14}} placeholder="Ask anything 📎🖼️🎤" />
<button onClick={()=>send()} style={{width:38,height:38,borderRadius:999,background:"linear-gradient(90deg,#fb923c,#a855f7)",color:"#fff",border:"none",fontWeight:"bold"}}>↑</button>
</div>
<div style={{textAlign:"center",marginTop:10,fontSize:8,letterSpacing:2,color:"#ffffff33"}}>BUILT FOR ILORIN • STREET SMART</div>
</div>
</div>
</div>
);
}
