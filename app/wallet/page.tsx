"use client"
import { Coins, ArrowUpRight, ArrowDownLeft, Sparkles, Trophy } from "lucide-react";

export default function WalletPage() {
  return (
    <div className="min-h-screen bg-background p-6 md:p-12 max-w-5xl mx-auto">
      {/* Wallet Balance Card */}
      <div className="bg-foreground text-background dark:bg-card dark:text-foreground rounded-[3rem] p-10 md:p-16 border border-border shadow-2xl relative overflow-hidden mb-10">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-yellow-500 rounded-lg"><Coins size={20} className="text-white" /></div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Total Safarioo Balance</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter">2,450 <span className="text-2xl font-bold italic tracking-normal opacity-50 uppercase">SC</span></h1>
          <div className="mt-8 flex gap-4">
            <button className="px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase italic text-xs shadow-xl hover:scale-105 transition-all">Redeem Coins</button>
            <button className="px-8 py-4 bg-muted/20 border border-border/50 rounded-2xl font-black uppercase italic text-xs hover:bg-muted/40">Earn More</button>
          </div>
        </div>
        <Sparkles className="absolute -bottom-10 -right-10 h-64 w-64 opacity-10 rotate-12" />
      </div>

      <h2 className="text-xl font-black uppercase italic mb-6">History</h2>
      <div className="bg-card border border-border rounded-[2.5rem] overflow-hidden">
        {[
          { label: "Squad Completed", amount: "+500", date: "Jan 10, 2026", type: "earn" },
          { label: "Travel Discount Redeemed", amount: "-200", date: "Jan 05, 2026", type: "spend" },
          { label: "Profile Verified", amount: "+100", date: "Dec 28, 2025", type: "earn" },
        ].map((t, i) => (
          <div key={i} className="flex items-center justify-between p-6 border-b border-border last:border-0 hover:bg-muted/20">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${t.type === 'earn' ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-500'}`}>
                {t.type === 'earn' ? <ArrowDownLeft size={20}/> : <ArrowUpRight size={20}/>}
              </div>
              <div>
                <p className="font-black italic text-sm uppercase">{t.label}</p>
                <p className="text-[9px] font-bold opacity-50 uppercase tracking-widest">{t.date}</p>
              </div>
            </div>
            <span className={`font-black text-lg ${t.type === 'earn' ? 'text-green-600' : 'text-foreground'}`}>{t.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}