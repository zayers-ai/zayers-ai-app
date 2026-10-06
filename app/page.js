"use client";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Welcome. Zayers AI enterprise suite initialized. Select a strategic keynote below or input a custom prompt.",
      time: "Just now"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const investorKeynotes = [
    { label: "📈 Revenue Model", prompt: "Explain the revenue model and monetisation strategy for Zayers AI." },
    { label: "⚡ Competitive Edge", prompt: "What makes Zayers AI superior to existing market solutions?" },
    { label: "📊 Scalability & TAM", prompt: "What is the Total Addressable Market (TAM) and scalability roadmap?" },
    { label: "🛡️ Security & Enterprise", prompt: "How does Zayers AI handle enterprise data security and compliance?" }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async (customText) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isLoading) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setInput("");
    setIsLoading(true);

    setMessages((prev) => [
      ...prev,
      { role: "user", text: textToSend, time: currentTime }
    ]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend }),
      });
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: data.reply || "Execution completed successfully.", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Enterprise Connection Error: Failed to reach backend API.", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030712] p-4 font-sans text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Rich Glowing Aura Backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-gradient-to-br from-emerald-500/20 via-teal-600/10 to-transparent blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-gradient-to-tl from-cyan-500/20 via-indigo-600/10 to-transparent blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-amber-500/10 blur-[160px] pointer-events-none" />

      {/* Main Glass Box */}
      <div className="relative z-10 flex h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-emerald-500/20 bg-slate-950/80 shadow-[0_0_80px_-15px_rgba(16,185,129,0.15)] backdrop-blur-2xl">
        
        {/* Header Bar */}
        <header className="flex items-center justify-between border-b border-emerald-500/20 bg-slate-900/50 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-400 via-teal-500 to-cyan-400 font-extrabold text-slate-950 shadow-lg shadow-emerald-500/25">
              <span className="text-xl tracking-wider">Z</span>
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-slate-950 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white">Zayers AI</h1>
                <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 tracking-wider uppercase shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                  Enterprise v2.4
                </span>
              </div>
              <p className="text-xs text-emerald-400/70 font-medium">Next-Gen Autonomous Intelligence</p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="hidden sm:flex items-center gap-6 border-l border-white/10 pl-6 text-xs">
            <div>
              <p className="text-slate-400">Latency</p>
              <p className="font-semibold text-emerald-400">&lt; 12ms</p>
            </div>
            <div>
              <p className="text-slate-400">Uptime</p>
              <p className="font-semibold text-cyan-400">99.99%</p>
            </div>
            <div>
              <p className="text-slate-400">Status</p>
              <p className="font-semibold text-amber-400">Optimal</p>
            </div>
          </div>
        </header>

        {/* Chat Feed */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5 scrollbar-thin scrollbar-thumb-slate-800">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col max-w-[80%] ${
                msg.role === "user" ? "self-end items-end" : "self-start items-start"
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5 px-1 text-[11px] font-semibold text-slate-400">
                <span className={msg.role === "user" ? "text-amber-400" : "text-emerald-400"}>
                  {msg.role === "user" ? "Executive Guest" : "Zayers AI Engine"}
                </span>
                <span>•</span>
                <span>{msg.time}</span>
              </div>
              
              <div
                className={`rounded-2xl px-5 py-3.5 text-sm leading-relaxed shadow-xl backdrop-blur-md transition-all ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-semibold rounded-tr-none shadow-amber-500/15"
                    : "bg-slate-900/90 text-slate-100 border border-emerald-500/20 rounded-tl-none shadow-emerald-500/5"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Loading Dots */}
          {isLoading && (
            <div className="self-start flex flex-col items-start gap-1">
              <span className="text-[11px] font-semibold text-emerald-400 px-1">Zayers AI Engine</span>
              <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-none border border-emerald-500/20 bg-slate-900/90 px-4 py-3">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-bounce" />
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]" />
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Keynote Quick Buttons */}
        <div className="border-t border-emerald-500/15 bg-slate-950/40 px-6 py-3 backdrop-blur-md">
          <p className="mb-2 text-[11px] font-bold tracking-wider text-emerald-400/80 uppercase">
            Executive Keynotes
          </p>
          <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
            {investorKeynotes.map((item, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(item.prompt)}
                disabled={isLoading}
                className="whitespace-nowrap rounded-xl border border-emerald-500/30 bg-emerald-950/30 px-4 py-2 text-xs font-semibold text-emerald-200 hover:border-emerald-400 hover:bg-emerald-500/20 hover:text-white hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all active:scale-95 disabled:opacity-50"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Console Input Bar */}
        <div className="p-4 bg-slate-950 border-t border-emerald-500/20">
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-slate-900/60 p-2 backdrop-blur-md focus-within:border-emerald-400 focus-within:ring-1 focus-within:ring-emerald-400 focus-within:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all">
            <input
              type="text"
              className="flex-1 bg-transparent px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
              placeholder="Ask Zayers AI a strategic question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={isLoading}
            />
            <button
              onClick={() => sendMessage()}
              disabled={isLoading || !input.trim()}
              className="flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-lg shadow-emerald-500/25 hover:brightness-110 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Execute
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}
