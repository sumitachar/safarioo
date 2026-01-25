"use client"
import { useState } from "react";
import { 
  X, ImagePlus, BadgeIndianRupee, Calendar, 
  MapPin, Sparkles, Send, Info, Layers 
} from "lucide-react";

interface CreatePackageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreatePackageModal({ isOpen, onClose }: CreatePackageModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-card border-2 border-secondary/30 rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* --- Header --- */}
        <div className="p-8 border-b border-border bg-secondary/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-secondary text-white rounded-2xl shadow-lg shadow-secondary/20">
              <Sparkles size={24} strokeWidth={3} />
            </div>
            <div>
              <h2 className="text-2xl font-black uppercase italic tracking-tighter">Create New Package</h2>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Post your squad journey to the world</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 bg-muted rounded-full hover:bg-border transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* --- Form Section --- */}
        <form className="p-8 space-y-6 max-h-[70vh] overflow-y-auto no-scrollbar">
          
          {/* Package Title */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase opacity-60 ml-2 italic">Tour / Event Title</label>
            <input 
              type="text" 
              placeholder="e.g. Kedarnath Spiritual Expedition 2026" 
              className="w-full px-6 py-4 bg-muted/30 border-2 border-transparent focus:border-secondary rounded-2xl font-bold outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase opacity-60 ml-2 italic">Package Price (INR)</label>
              <div className="relative">
                <BadgeIndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={20} />
                <input 
                  type="number" 
                  placeholder="25000" 
                  className="w-full pl-12 pr-6 py-4 bg-muted/30 rounded-2xl font-bold outline-none"
                />
              </div>
            </div>

            {/* Duration Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase opacity-60 ml-2 italic">Duration</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                <input 
                  type="text" 
                  placeholder="e.g. 5 Days / 4 Nights" 
                  className="w-full pl-12 pr-6 py-4 bg-muted/30 rounded-2xl font-bold outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Location */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase opacity-60 ml-2 italic">Primary Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                <input 
                  type="text" 
                  placeholder="e.g. Rishikesh, Uttarakhand" 
                  className="w-full pl-12 pr-6 py-4 bg-muted/30 rounded-2xl font-bold outline-none"
                />
              </div>
            </div>

            {/* Category Select */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase opacity-60 ml-2 italic">Category</label>
              <div className="relative">
                <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                <select className="w-full pl-12 pr-6 py-4 bg-muted/30 rounded-2xl font-bold outline-none appearance-none cursor-pointer">
                  <option>Pilgrimage</option>
                  <option>Adventure</option>
                  <option>Cinema</option>
                  <option>Events</option>
                  <option>Luxury</option>
                </select>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase opacity-60 ml-2 italic">About the Journey</label>
            <textarea 
              rows={3}
              placeholder="Describe what makes this squad special..." 
              className="w-full px-6 py-4 bg-muted/30 rounded-2xl font-bold outline-none min-h-[100px]"
            />
          </div>

          {/* Image Upload Area */}
          <div className="border-2 border-dashed border-border rounded-[2rem] p-8 flex flex-col items-center justify-center gap-3 hover:bg-muted/30 transition-all cursor-pointer group">
            <div className="p-4 bg-muted rounded-full group-hover:bg-secondary/10 group-hover:text-secondary transition-colors">
              <ImagePlus size={32} />
            </div>
            <p className="text-xs font-black uppercase tracking-widest">Click to upload cover photo</p>
            <p className="text-[8px] font-bold text-muted-foreground uppercase">Recommended: 1200x800px (JPG/PNG)</p>
          </div>

          {/* Guidelines Note */}
          <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl flex gap-3">
             <Info className="text-primary shrink-0" size={20} />
             <p className="text-[10px] font-bold text-muted-foreground leading-relaxed uppercase">
               By posting this package, you agree to provide high-quality service and follow the Safarioo Agency Guidelines for squad safety.
             </p>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full py-5 bg-secondary text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-secondary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 italic"
          >
            PUBLISH PACKAGE <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}