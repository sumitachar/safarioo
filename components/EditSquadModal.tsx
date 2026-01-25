"use client"
import { useState, useEffect } from "react";
import { X, Save, MapPin, AlignLeft, Info, Calendar } from "lucide-react";

interface EditSquadModalProps {
  isOpen: boolean;
  onClose: () => void;
  squadData: {
    title: string;
    location: string;
    description: string;
    date: string;
  };
}

export default function EditSquadModal({ isOpen, onClose, squadData }: EditSquadModalProps) {
  const [formData, setFormData] = useState(squadData);

  // যখনই squadData চেঞ্জ হবে (অথবা মোডাল খুলবে), তখন ডাটা আপডেট হবে
  useEffect(() => {
    setFormData(squadData);
  }, [squadData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Data:", formData);
    // এখানে আপনার API Call বা Redux Dispatch হবে
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-xl animate-in fade-in duration-300" 
        onClick={onClose} 
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl bg-card border-2 border-border rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
        
        {/* Header */}
        <div className="p-8 border-b border-border flex justify-between items-center bg-muted/30">
          <div>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter leading-none">Edit Squad</h2>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Update mission details</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-background rounded-2xl transition-all border border-transparent hover:border-border">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          {/* Title Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest ml-4 flex items-center gap-2">
              <Info size={12} className="text-primary"/> Squad Title
            </label>
            <input 
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-muted/50 border-2 border-border focus:border-primary px-6 py-4 rounded-2xl font-bold outline-none transition-all italic text-lg"
              placeholder="Ex: Spiti Expedition"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Location */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest ml-4 flex items-center gap-2">
                <MapPin size={12} className="text-primary"/> Location
              </label>
              <input 
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full bg-muted/50 border-2 border-border focus:border-primary px-6 py-4 rounded-2xl font-bold outline-none transition-all uppercase text-xs"
              />
            </div>
            {/* Date */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest ml-4 flex items-center gap-2">
                <Calendar size={12} className="text-primary"/> Date
              </label>
              <input 
                type="text"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full bg-muted/50 border-2 border-border focus:border-primary px-6 py-4 rounded-2xl font-bold outline-none transition-all uppercase text-xs"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest ml-4 flex items-center gap-2">
              <AlignLeft size={12} className="text-primary"/> Mission Description
            </label>
            <textarea 
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full bg-muted/50 border-2 border-border focus:border-primary px-6 py-5 rounded-[2rem] font-medium outline-none transition-all resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-5 border-2 border-border rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-muted transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-[2] py-5 bg-foreground text-background rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all shadow-xl shadow-primary/10"
            >
              <Save size={16} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}