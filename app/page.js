"use client";
import { useState } from "react";

export default function Home() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  async function send(text) {
    const prompt = text || msg;
    if(!prompt) return;
    setChat([...chat, {role:"user", content:prompt}]);
    setMsg(""); setLoading(true);
    const res = await fetch("/api/chat", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({message: prompt})
    });
    const data = await res.json();
    setChat(c => [...c, {role:"ai", content:data.reply}]);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-4" style={{background: "radial-gradient(circle at top, #1a1a00, #000)"}}>
      <div className="w-full max-w-md">
        {/* HEADER */}
        <div className="flex items-center gap-3 mt-6 mb-2">
          <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-700 rounded-xl flex items-center justify-center text-black font-black text-2xl">Z</div>
          <div>
            <h1 className="text-xl font-bold text-yellow-400">ZAYERS AI GH</h1>
            <p className="text-xs opacity-70">Your Ghanaian AI • Smarter than ACE_X <span className="ml-2">🇬🇭 Made in Ghana</span></p>
          </div>
        </div>

        <div className="bg-zinc-900/80 border border-yellow-600/30 rounded-3xl p-5 mt-6">
          <h2 className="text-yellow-200 text-xl font-semibold">Hello, welcome back!</h2>
          <p className="text-sm opacity-60 mb-4">How can I help you today?</p>

          <div className="grid grid-cols-2 gap-3">
            <button onClick={()=>send("Summarise this text for me")} className="border border-yellow-500/30 rounded-2xl p-4 text-left hover:bg-yellow-500/10">
              <div className="text-yellow-400 font-bold">📝 Summarise text</div><div className="text-[10px] opacity-60">Condense long notes</div>
            </button>
            <button onClick={()=>send("Write code for me")} className="border border-yellow-500/30 rounded-2xl p-4 text-left hover:bg-yellow-500/10">
              <div className="text-yellow-400 font-bold">{"</>"} Write code</div><div className="text-[10px] opacity-60">JS, Python & more</div>
            </button>
            <button onClick={()=>send("Fix my code")} className="border border-yellow-500/30 rounded-2xl p-4 text-left hover:bg-yellow-500/10">
              <div className="text-yellow-400 font-bold">🛠 Fix my code</div><div className="text-[10px] opacity-60">Debug instantly</div>
            </button>
            <button onClick={()=>send("Solve BECE/WASSCE past question")} className="border border-yellow-500/30 rounded-2xl p-4 text-left hover:bg-yellow-500/10">
              <div className="text-yellow-400 font-bold">🎓 Solve BECE/WASSCE</div><div className="text-[10px] opacity-60">Past questions</div>
            </button>
          </div>

          <div className="mt-4 space-y-2 max-h-60 overflow-auto">
            {chat.map((c,i)=><div key={i} className={c.role=="user"?"text-right":"text-left"}><div className={`inline-block p-2 rounded-xl mt-2 text-sm ${c.role=="user"?"bg-yellow-500 text-black":"bg-zinc-800 text-yellow-100"}`}>{c.content}</div></div>)}
            {loading && <div className="text-xs text-yellow-400 animate-pulse">ZAYERS AI is thinking...</div>}
          </div>
        </div>

        {/* INPUT */}
        <div className="flex gap-2 mt-4 bg-zinc-900 border border-yellow-600/40 rounded-full p-2">
          <input value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Ask anything..." className="flex-1 bg-transparent outline-none px-3 text-sm"/>
          <button onClick={()=>send()} className="bg-yellow-500 text-black rounded-full px-5 py-2 font-bold">➤</button>
        </div>
        <p className="text-center text-[10px] opacity-40 mt-3">Premium • Faster than ACE_X AI • Secure & Private</p>
      </div>
    </div>
  );
}
