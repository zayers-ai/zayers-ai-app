"use client";
import { useState, useEffect, useRef } from "react";

export default function Page() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{role:"ai",text:"Hello! I'm ZAYERS AI. How may I assist you today?"}]);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const bottomRef = useRef(null);
  
  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior:"smooth"});
  }, [messages, isLoading]);

  async function sendMessage() {
    const txt = input.trim();
    if((!txt && !preview) || isLoading) return;
    const img = preview;
    setMessages(v=>[...v,{role:"user",text:txt,image:img}]);
    setInput(""); setPreview(null); setIsLoading(true);

    try {
      const res = await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:txt,image:img})});
      const d = await res.json();
      setMessages(v=>[...v,{role:"ai",text:d.reply}]);
    } catch(e) {
      setMessages(v=>[...v,{role:"ai",text:"Network error. Please try again."}]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleFile(f) {
    if(!f) return;
    const rd = new FileReader();
    rd.onload=()=>setPreview(rd.result); rd.readAsDataURL(f);
  }

  return (
    <div style={{minHeight:"100vh",background:"#0a0a0a",color:"#fff",display:"flex",flexDirection:"column"}}>
      <style>{`@keyframes bounce{0%,100%{transform:translate(0,0)}25%{transform:translate(0,-4px)}}
      @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}`}</style>
      
      <div style={{flex:1,overflowY:"auto",padding:"32px 24px",textAlign:"center"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:24}}>
          <div style={{width:8,height:8,background:"#22c55e",borderRadius:999,animation:"pulse 2s infinite"}}></div>
          <div style={{color:"#ffffff22",fontSize:10,letterSpacing:4}}>ZAYERS AI</div>
        </div>

        {messages.map((m,i)=>(
          <div key={i} style={{maxWidth:400,margin:"12px auto",padding:12,borderRadius:12,background:m.role==="ai"?"#1a1a1a":"#22c55e",textAlign:"left",color:m.role==="ai"?"#fff":"#000"}}>
            {m.text}
            {m.image && <img src={m.image} style={{width:"100%",marginTop:8,borderRadius:8}} />}
          </div>
        ))}
        {isLoading && <div style={{color:"#888",fontSize:14,marginTop:12}}>Zayers is thinking...</div>}
        <div ref={bottomRef}></div>
      </div>

      <div style={{padding:16,borderTop:"1px solid #222",display:"flex",gap:8}}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMessage()} placeholder="Ask ZAYERS..." style={{flex:1,padding:12,borderRadius:8,background:"#1a1a1a",border:"none",color:"#fff"}} />
        <button onClick={sendMessage} style={{padding:"12px 20px",borderRadius:8,background:"#22c55e",border:"none",fontWeight:"bold"}}>Send</button>
      </div>
    </div>
  );
}
