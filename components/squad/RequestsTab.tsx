"use client"
import React from "react";
import { Check, X, User, Star, ShieldCheck, Clock, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface Request {
  id: string;
  userId: string; // প্রোফাইল লিঙ্কের জন্য আইডি প্রয়োজন
  name: string;
  age: number;
  status: string;
  trustScore: number; // rating থেকে trustScore এ পরিবর্তন (প্রোফাইল পেজের সাথে সামঞ্জস্য রেখে)
  appliedAt: string;
}

export default function RequestsTab() {
  // Mock Data: বাস্তবে এটি API থেকে আসবে
  const requests: Request[] = [
    { id: "r1", userId: "u101", name: "Siddharth Roy", age: 24, status: "pending", trustScore: 92, appliedAt: "2h ago" },
    { id: "r2", userId: "u102", name: "Ishani Das", age: 22, status: "pending", trustScore: 87, appliedAt: "5h ago" },
    { id: "r3", userId: "u103", name: "Rahul Sharma", age: 28, status: "pending", trustScore: 45, appliedAt: "Yesterday" }
  ];

  if (requests.length === 0) {
    return (
      <div className="bg-card border-2 border-dashed border-border rounded-[3rem] p-20 flex flex-col items-center justify-center text-center animate-in fade-in">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <User className="text-muted-foreground opacity-20" size={30} />
        </div>
        <p className="font-black uppercase italic text-xs tracking-widest text-muted-foreground">No pending requests</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div className="px-4 flex justify-between items-center">
        <div className="flex flex-col">
          <h3 className="text-xl font-black italic uppercase tracking-tighter">Join Requests</h3>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Review travelers wanting to join your squad</p>
        </div>
        <span className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-xl text-[10px] font-black uppercase tracking-widest">
          {requests.length} Pending
        </span>
      </div>

      <div className="grid gap-4">
        {requests.map((req) => (
          <div 
            key={req.id} 
            className="group bg-card border border-border p-6 md:p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between hover:border-primary/50 transition-all shadow-xl hover:shadow-primary/5 relative overflow-hidden"
          >
            {/* Trust Background Glow */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${req.trustScore > 80 ? 'bg-green-500' : req.trustScore > 60 ? 'bg-yellow-500' : 'bg-red-500'}`} />

            {/* User Info & Avatar */}
            <div className="flex items-center gap-6 w-full md:w-auto">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-muted to-border rounded-[1.8rem] flex items-center justify-center font-black text-xl text-primary shadow-inner">
                  {req.name.charAt(0)}
                </div>
                {req.trustScore > 90 && (
                  <div className="absolute -top-1 -right-1 bg-blue-500 text-white p-1 rounded-full border-2 border-card">
                    <ShieldCheck size={12} />
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Link 
                    href={`/profile/${req.userId}`} 
                    className="font-black uppercase italic tracking-tighter text-xl leading-none hover:text-primary transition-colors flex items-center gap-1 group/link"
                  >
                    {req.name}
                    <ArrowUpRight size={14} className="opacity-0 group-hover/link:opacity-100 transition-all" />
                  </Link>
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Age: {req.age}</p>
                  <span className="w-1 h-1 bg-border rounded-full"></span>
                  <div className={`flex items-center gap-1 text-[10px] font-black uppercase ${req.trustScore > 70 ? 'text-secondary' : 'text-orange-500'}`}>
                    <Star size={10} fill="currentColor" /> {req.trustScore}% Trust Score
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[8px] font-black text-muted-foreground/60 uppercase tracking-widest pt-1">
                  <Clock size={10} /> Applied {req.appliedAt}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 w-full md:w-auto mt-6 md:mt-0">
              <button 
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 bg-muted/50 text-red-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all active:scale-95 border border-transparent hover:border-red-600"
                onClick={() => console.log("Declined", req.id)}
              >
                <X size={18} /> <span className="md:hidden">Decline</span>
              </button>
              
              <button 
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-10 py-4 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/30 hover:scale-105 hover:bg-primary/90 transition-all active:scale-95"
                onClick={() => console.log("Accepted", req.id)}
              >
                <Check size={18} /> <span className="md:hidden">Accept</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Admin Safety Tip */}
      <div className="p-6 bg-secondary/5 border border-secondary/10 rounded-[2.5rem] mt-4">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-secondary/10 rounded-2xl text-secondary">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase italic tracking-widest text-secondary mb-1">Safety First!</h4>
            <p className="text-[9px] font-bold text-muted-foreground uppercase leading-relaxed tracking-wide">
              Travelers with trust scores above 80% are generally more reliable. 
              Click on their name to view their past squad history and feedback before making a decision.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}