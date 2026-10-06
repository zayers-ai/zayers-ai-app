"use client";
import { useState, useRef, useEffect } from "react";

export default function Home(){
const [msg,setMsg]=useState("");
const [chat,setChat]=useState([
{role:"ai",text:"Welcome back!\nI'm ZAYER, your AI assistant.",sub:"Ready to create, code, or explore ideas together."},
{role:"user",text:"Draft a launch post for our new product",time:"Now"},
{role:"ai",text:"Got it! Here's a draft → 🚀\nIntroducing ZAYER ULTRA..."}
]);
const [loading,setLoading]=useState(false);
const ref=useRef(null);
useEffect(()=>{ref.current?.scrollIntoView({behavior:"smooth"})},[chat,loading]);

async function send(t){
const p=t||msg; if(!p.trim()) return;
const userMsg={role:"user",text:p,time:"Now"};
setChat(c=>[...c,userMsg]); setMsg(""); setLoading(true);
try{
const r=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:p})});
const d=await r.json();
setChat(c=>[...c,{role:"ai",text:d.reply||d.message||"Done Boss"}]);
}catch{
setChat(c=>[...c,{role:"ai",text:"Network glitch Boss, try again"}]);
}
setLoading(false);
}

return(
<>
<style>{`
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&display=swap');
*{font-family:'Outfit',sans-serif}
.glass{
background:linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.06));
backdrop-filter:blur(25px); -webkit-backdrop-filter:blur(25px);
border:1px solid rgba(255,255,255,0.18);
box-shadow:0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2);
}
.card:hover{transform:translateY(-3px); box-shadow:0 12px 40px rgba(168,85,247,0.3)}
`}</style>

<div style={{minHeight:"100vh",background:"#050508",display:"flex",justifyContent:"center",padding:10}}>
<div style={{width:"100%",maxWidth:420,minHeight:"92vh",background:"radial-gradient(600px at -10% -10%, #a855f7aa, transparent 60%), radial-gradient(600px at 110% 30%, #FFD70088, transparent 60%), radial-gradient(600px at 50% 120%, #06b6d499, transparent 70%), #0a0a12",borderRadius:32,border:"1px solid rgba(255,255,255,0.15)",position:"relative",overflow:"hidden",display:"flex",flexDirection:"column",boxShadow:"0 20px 60px rgba(0,0,0,0.6)"}}>

{/* Glow Orbs */}
<div style={{position:"absolute",top:80,right:-40,width:200,height:200,background:"radial-gradient(circle,#FFD700,transparent 70%)",filter:"blur(30px)",opacity:0.6}}/>
<div style={{position:"absolute",bottom:200,left:-30,width:250,height:250,background:"radial-gradient(circle,#a855f7,transparent 70%)",filter:"blur(35px)",opacity:0.5}}/>

{
