"use client";
import { useState, useRef, useEffect } from "react";
export default function Home(){
const [msg,setMsg]=useState("");
const [chat,setChat]=useState([{role:"ai",content:"💎 ZAYERS ULTRA activated. ACE_X is dead. What empire are we building today, Boss?"}]);
const [loading,setLoading]=useState(false);
const ref=useRef(null);
useEffect(()=>{ref.current?.scrollIntoView({behavior:"smooth"})},[chat,loading]);
async function send(t){
const p=t||msg; if(!p.trim())return;
setChat(c=>[...c,{role:"user",content:p}]); setMsg(""); setLoading(true);
try{
const r=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:p})});
const d=await r.json();
setChat(c=>[...c,{role:"ai",content:d.reply||d.message||"ZAYERS ULTRA online"}]);
}catch{setChat(c=>[...c,{role:"ai",content:"⚡ Glitch Boss, retry"}]);}
setLoading(false);
}
return(
<div style={{minHeight:"100vh",background:"#020208",color:"#fff",display:"flex",flexDirection:"column",position:"relative",overflow:"hidden"}}>
<div style={{position:"absolute",top:-150,left:-150,width:600,height:600,background:"radial-gradient(circle,#a855f7,transparent 70%)",filter:"blur(80px)",opacity:0.6}}/>
<div style={{position:"absolute",top:-80,right:-80,width:500,height:500,background:"radial-gradient(circle,#FFD700,transparent 70%)",filter:"blur(80px)",opacity:0.5}}/>
<div style={{position:"absolute",bottom:-
