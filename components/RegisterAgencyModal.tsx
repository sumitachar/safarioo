"use client"
import { useState } from "react";
import { X, Building2, Mail, Phone, MapPin, Send, ShieldCheck, Globe } from "lucide-react";

export default function RegisterAgencyModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-xl bg-card rounded-[3rem] border-2 border-secondary/30 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="p-8 border-b border-border bg-secondary/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-secondary text-white rounded-2xl shadow-lg shadow-secondary/20">
              <Building2 size={24} strokeWidth={3} />
            </div>
            <div>
              <h2 className="text-2xl font-black uppercase italic tracking-tighter">Partner with Us</h2>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Register your agency today</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 bg-muted rounded-full hover:bg-border transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form className="p-8 space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase opacity-60 ml-2">Agency Name</label>
            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
              <input type="text" placeholder="e.g. Himalayan Expeditions" className="w-full pl-12 pr-6 py-4 bg-muted/30 rounded-2xl font-bold border-none outline-none focus:ring-2 focus:ring-secondary/20" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase opacity-60 ml-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input type="email" placeholder="contact@agency.com" className="w-full pl-12 pr-6 py-4 bg-muted/30 rounded-2xl font-bold border-none outline-none focus:ring-2 focus:ring-secondary/20" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase opacity-60 ml-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input type="tel" placeholder="+91 0000 0000" className="w-full pl-12 pr-6 py-4 bg-muted/30 rounded-2xl font-bold border-none outline-none focus:ring-2 focus:ring-secondary/20" />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase opacity-60 ml-2">Headquarters / Location</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
              <input type="text" placeholder="e.g. Rishikesh, Uttarakhand" className="w-full pl-12 pr-6 py-4 bg-muted/30 rounded-2xl font-bold border-none outline-none focus:ring-2 focus:ring-secondary/20" />
            </div>
          </div>

          <div className="p-4 bg-secondary/5 border border-secondary/10 rounded-2xl">
            <p className="text-[10px] font-bold text-secondary flex items-center gap-2">
              <ShieldCheck size={14} /> Our team will verify your documents within 24-48 hours.
            </p>
          </div>

          <button type="submit" className="w-full py-5 bg-secondary text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-secondary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 italic">
            SEND APPLICATION <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}