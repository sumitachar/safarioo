"use client"
import React, { useState, useRef, useEffect } from "react";
import { 
  Send, Plus, Check, MoreVertical, 
  Users, Paperclip, Smile, ShieldCheck 
} from "lucide-react";

export default function ChatSection() {
  const [message, setMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  const messages = [
    {
      id: 1,
      sender: "Arjun Jaitley",
      role: "Member",
      text: "Is everyone ready for the Spiti trek? I've checked the oxygen levels for the high altitudes. 🏔️",
      time: "10:42 AM",
      isMe: false,
      avatar: "AJ"
    },
    {
      id: 2,
      sender: "You",
      role: "Admin",
      text: "Absolutely! Got my gear ready. Should we carry extra batteries for the cameras? 📸",
      time: "10:45 AM",
      isMe: true,
      avatar: "ME"
    },
    {
      id: 3,
      sender: "Siddharth Roy",
      role: "Member",
      text: "I'm bringing a 20,000mAh power bank. We should be good! ⚡",
      time: "11:02 AM",
      isMe: false,
      avatar: "SR"
    }
  ];

  return (
    <div className="bg-card border-2 border-border/50 rounded-[3rem] h-[650px] flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 relative">
      
      {/* --- Chat Header --- */}
      <div className="px-8 py-5 bg-muted/30 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center font-black text-primary border border-primary/20">
              <Users size={20} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-card rounded-full shadow-sm"></div>
          </div>
          <div>
            <h4 className="text-sm font-black uppercase italic tracking-tighter leading-none flex items-center gap-2">
              Squad Operations <ShieldCheck size={14} className="text-primary"/>
            </h4>
            <p className="text-[9px] font-bold text-muted-foreground uppercase mt-1 tracking-widest">
              6 Members Online • 12K Altitude
            </p>
          </div>
        </div>
        <div className="flex gap-4 opacity-40 hover:opacity-100 transition-opacity">
          <button className="hover:text-primary transition-colors"><MoreVertical size={20} /></button>
        </div>
      </div>

      {/* --- Message Area --- */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed"
      >
        {/* Date Divider */}
        <div className="flex justify-center">
          <span className="px-6 py-1.5 bg-background/80 backdrop-blur-md border border-border rounded-full text-[9px] font-black uppercase tracking-widest text-muted-foreground shadow-sm">
            Mission Briefing - Today
          </span>
        </div>

        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex items-end gap-3 ${msg.isMe ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar */}
            <div className={`w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center text-[10px] font-black shadow-lg ${msg.isMe ? 'bg-primary text-white' : 'bg-muted border border-border'}`}>
              {msg.avatar}
            </div>

            {/* Bubble */}
            <div className={`max-w-[75%] space-y-1 ${msg.isMe ? 'items-end' : 'items-start'}`}>
              <p className={`text-[9px] font-black uppercase tracking-tighter ml-1 mb-1 ${msg.isMe ? 'text-right mr-1' : 'text-primary'}`}>
                {msg.sender} <span className="text-muted-foreground/50 opacity-50 ml-1">• {msg.role}</span>
              </p>
              
              <div className={`p-4 rounded-3xl shadow-sm border ${
                msg.isMe 
                ? 'bg-foreground text-background rounded-br-none border-foreground' 
                : 'bg-card text-foreground rounded-bl-none border-border'
              }`}>
                <p className="text-sm font-medium leading-relaxed italic">
                  {msg.text}
                </p>
              </div>
              
              <div className={`flex items-center gap-1 mt-1 ${msg.isMe ? 'justify-end mr-1' : 'ml-1'}`}>
                <p className="text-[8px] font-bold text-muted-foreground/60">{msg.time}</p>
                {msg.isMe && <Check size={10} className="text-primary" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- Input Area --- */}
      <div className="p-6 bg-card border-t-2 border-border/30">
        <div className="flex items-center gap-3 bg-muted/40 p-2 rounded-[2.5rem] border border-border focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/5 transition-all shadow-inner">
          
          <button className="p-3 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all">
            <Plus size={20} />
          </button>

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Secure message to squad..."
            className="flex-1 bg-transparent border-none py-3 px-2 font-bold text-sm outline-none placeholder:text-muted-foreground/40 italic"
          />

          <button className="p-3 text-muted-foreground hover:text-secondary transition-all">
            <Smile size={20} />
          </button>

          <button 
            className={`p-4 rounded-[1.8rem] shadow-xl transition-all active:scale-95 ${
              message.trim() 
              ? 'bg-primary text-white shadow-primary/30' 
              : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            <Send size={20} />
          </button>
        </div>
        
        <div className="mt-3 flex justify-center">
          <p className="text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground/30 animate-pulse">
            End-to-End Encrypted Operations
          </p>
        </div>
      </div>
    </div>
  );
}