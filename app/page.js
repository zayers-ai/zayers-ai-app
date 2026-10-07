"use client";
import {useState,useRef,useEffect} from "react";
export default function Home(){
  const [input,setInput]=useState("");
  const [messages,setMessages]=useState([{role:"ai",text:"Yo! I be ZAYERS AI, built for Ilorin. Ask me anything bro!"}]);
  const [isLoading,setIsLoading]=useState(false);
  const [preview,setPreview]=useState(null);
  const endRef=useRef(null);
  const fileRef=useRef(null);
  useEffect(()=>{endRef.current?.scrollIntoView({behavior:"smooth"})},[messages,isLoading]);
  const send=async(t)=>{
    const txt=t||input; if((!txt.trim()&&!preview)||isLoading) return;
    const imgToSend = preview;
    setMessages(v=>[...v,{role:"user",text:txt,image:imgToSend}]);
    setInput(""); setPreview(null);
    setIsLoading(true);
    try{
      const r=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:txt,image:imgToSend})});
      const d=await r.json();
      setMessages(v=>[...v,{role:"ai",text:d.reply}]);
    }catch{setMessages(v=>[...v,{role:"ai",text:"Network error bro"}]);}
    setIsLoading(false);
  };
  const onPick=(e)=>{
    const file=e.target.files[0]; if(!file) return;
    const reader=new FileReader();
    reader.onload=()=>setPreview(reader.result);
    reader.readAsDataURL(file);
  };
  return(
    <div style={{minHeight:"100vh",background:"#0a0a0a",color:"white",display:"flex",flexDirection:"column",position:"relative",overflow:"hidden"}}>
      <style>{`@keyframes f1{0%,100%{transform:translate(0,0)}25%{transform:translate(50px,-50px)}50%{transform:translate(0,50px)}}`}</style>
      <div style={{width:"100%",maxWidth:400,height:400,background:"radial-gradient(circle,#a855f733,transparent)",position:"absolute",top:-100,left:-100,filter:"blur(60px)",animation:"f1 10s infinite"}}></div>
      <div style={{width:"100%",maxWidth:400,height:400,background:"radial-gradient(circle,#ec489933,transparent)",position:"absolute",bottom:100,right:-100,filter:"blur(60px)",animation:"f1 10s infinite reverse"}}></div>

      <div style={{zIndex:2,padding:"32px 24px 16px"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
          <div style={{width:8,height:8,background:"#22c55e",borderRadius:999}}></div>
          <div style={{color:"#ffffff22",fontSize:10,letterSpacing:4}}>ZAYERS AI • ILORIN</div>
        </div>
      </div>

      <div style={{zIndex:2,flex:1,overflowY:"auto",padding:"0 16px",display:"flex",flexDirection:"column",gap:12}}>
        {messages.map((m,i)=><div key={i} style={{alignSelf:m.role==="user"?"flex-end":"flex-start",maxWidth:"85%",background:m.role==="user"?"#fff":"#1a1a1a",color:m.role==="user"?"#000":"#fff",padding:"12px 16px",borderRadius:"18px",fontSize:14,whiteSpace:"pre-wrap"}}>
          {m.image && <img src={m.image} style={{width:"100%",borderRadius:12,marginBottom:8,display:"block"}}/>}
          {m.text}
        </div>)}
        {isLoading&&<div style={{color:"#C9A86A88",fontSize:12,padding:"8px"}}>ZAYERS dey think...</div>}
        <div ref={endRef}/>
      </div>

      <div style={{zIndex:2,padding:"16px 18px 24px"}}>
        {preview && <div style={{marginBottom:10,position:"relative",display:"inline-block"}}><img src={preview} style={{width:70,height:70,objectFit:"cover",borderRadius:10,border:"1px solid #ffffff22"}}/><button onClick={()=>setPreview(null)} style={{position:"absolute",top:-6,right:-6,background:"#ff4444",border:"none",color:"#fff",borderRadius:999,width:20,height:20,fontSize:10,cursor:"pointer"}}>x</button></div>}
        <div style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:999,display:"flex",alignItems:"center",padding:"6px"}}>
          <label style={{width:32,height:32,display:"grid",placeItems:"center",cursor:"pointer"}}>
            <input ref={fileRef} type="file" accept="image/*" onChange={onPick} style={{display:"none"}}/>
            📎
          </label>
          <label style={{width:32,height:32,display:"grid",placeItems:"center",cursor:"pointer"}} onClick={()=>fileRef.current?.click()}>
            🖼️
          </label>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask anything..." style={{flex:1,background:"transparent",border:"none",outline:"none",color:"#fff",fontSize:14}}/>
          <button onClick={()=>send()} style={{width:32,height:32,borderRadius:999,border:"none",background:"#fff",color:"#000",cursor:"pointer"}}>↑</button>
        </div>
        <div style={{textAlign:"center",color:"#ffffff22",fontSize:9,letterSpacing:2,marginTop:12}}>BUILT FOR ILORIN • STREET SMART</div>
      </div>
    </div>
  );
}
