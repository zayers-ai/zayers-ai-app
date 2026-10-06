"use client";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([
    { role: "ai", content: "I am ZAYERS AI ⚡ Built by Zayers. Faster, smarter and cleaner than ACE_X. What should we build today Boss?" }
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chat, loading]);

  async function send(text) {
    const prompt = text || msg;
    if (!prompt.trim()) return;
    setChat([...chat, { role: "user", content: prompt }]);
    setMsg(""); setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt }),
      });
      const data = await res.json();
      setChat(c => [...c, { role: "ai", content: data.reply || data.message || "ZAYERS AI is online Boss." }]);
    } catch { setChat(c => [...c, { role: "ai", content: "Network glitch Boss, try again." }]); }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#050507] text-white flex flex-col">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&display=swap'); *{font-family:'Space Grotesk',sans-serif}`}</style>

      {/* HEADER */}
      <header className="p-4 border-b border-white/10 flex justify-between items-center bg-black/50 backdrop-blur sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center font-bold text-black">Z</div>
          <span className="font-bold tracking-widest">ZAYERS AI</span>
          <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full ml-2">PRO ULTRA</span>
        </div>
        <div className="text-xs text-white/50">zayers-ai-app.vercel.app</div>
      </header>

      {/* CHAT */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-3xl w-full mx-auto">
        {chat.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user"? "justify-end" :
