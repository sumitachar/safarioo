"use client"
import { useState, useEffect } from "react";
import { X, Save, MapPin, AlignLeft, Info, Calendar, Clock, DollarSign, Tag } from "lucide-react";
import { DisplaySquad } from "@/app/my-squads/page";

interface EditSquadModalProps {
  isOpen: boolean;
  onClose: () => void;
  squadData: DisplaySquad;
}

export default function EditSquadModal({ isOpen, onClose, squadData }: EditSquadModalProps) {
  const [formData, setFormData] = useState<DisplaySquad & { description?: string }>(squadData);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      setFormData({
        ...squadData,
        description: squadData.description || "" // safe fallback
      });
      setErrors({});
      setIsSaving(false);
    }
  }, [squadData, isOpen]);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = "Squad title is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.date) newErrors.date = "Date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSaving(true);

    try {
      // Real save logic here
      // await squadApi.updateSquad(formData.id, formData);
      console.log("Saving updated squad:", formData);

      setTimeout(() => {
        setIsSaving(false);
        onClose();
      }, 800);
    } catch (err) {
      console.error("Update failed:", err);
      setIsSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const hasDescription = !!formData.description || formData.description === "";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-xl animate-in fade-in duration-300" 
        onClick={onClose} 
      />

      <div className="relative w-full max-w-2xl bg-card border-2 border-border rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 max-h-[90vh] overflow-y-auto">
        
        <div className="p-8 border-b border-border flex justify-between items-center bg-muted/30 sticky top-0 z-10 backdrop-blur-sm">
          <div>
            <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter leading-none">Edit Squad</h2>
            <p className="text-[10px] md:text-xs font-black text-muted-foreground uppercase tracking-widest mt-1">
              Update your mission details
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="p-3 hover:bg-background rounded-2xl transition-all border border-transparent hover:border-border active:scale-95"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          
          {/* Title */}
          <div className="space-y-2">
            <label className="text-[10px] md:text-xs font-black uppercase tracking-widest ml-4 flex items-center gap-2">
              <Info size={14} className="text-primary" /> Squad Title *
            </label>
            <input 
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full bg-muted/50 border-2 ${errors.title ? 'border-red-500' : 'border-border focus:border-primary'} px-6 py-4 rounded-2xl font-bold outline-none transition-all italic text-lg`}
              placeholder="Ex: Spiti Stargazing Expedition"
            />
            {errors.title && <p className="text-red-500 text-xs ml-4 mt-1">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] md:text-xs font-black uppercase tracking-widest ml-4 flex items-center gap-2">
                <MapPin size={14} className="text-primary" /> Location *
              </label>
              <input 
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full bg-muted/50 border-2 ${errors.location ? 'border-red-500' : 'border-border focus:border-primary'} px-6 py-4 rounded-2xl font-bold outline-none transition-all uppercase text-sm`}
                placeholder="Ex: Spiti Valley, Himachal"
              />
              {errors.location && <p className="text-red-500 text-xs ml-4 mt-1">{errors.location}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] md:text-xs font-black uppercase tracking-widest ml-4 flex items-center gap-2">
                <Calendar size={14} className="text-primary" /> Departure Date *
              </label>
              <input 
                type="date"
                name="date"
                value={formData.date ? new Date(formData.date).toISOString().split('T')[0] : ''}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className={`w-full bg-muted/50 border-2 ${errors.date ? 'border-red-500' : 'border-border focus:border-primary'} px-6 py-4 rounded-2xl font-bold outline-none transition-all text-sm`}
              />
              {errors.date && <p className="text-red-500 text-xs ml-4 mt-1">{errors.date}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] md:text-xs font-black uppercase tracking-widest ml-4 flex items-center gap-2">
                <Clock size={14} className="text-primary" /> Duration
              </label>
              <input 
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full bg-muted/50 border-2 border-border focus:border-primary px-6 py-4 rounded-2xl font-bold outline-none transition-all uppercase text-sm"
                placeholder="Ex: 7 Days"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] md:text-xs font-black uppercase tracking-widest ml-4 flex items-center gap-2">
                <DollarSign size={14} className="text-primary" /> Cost (₹)
              </label>
              <input 
                type="text"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                className="w-full bg-muted/50 border-2 border-border focus:border-primary px-6 py-4 rounded-2xl font-bold outline-none transition-all text-sm"
                placeholder="Ex: 5500"
              />
            </div>
          </div>

          {/* Description – Only show if it exists or user wants to add */}
          {(hasDescription || true) && (  // always show for now, but you can make it conditional
            <div className="space-y-2">
              <label className="text-[10px] md:text-xs font-black uppercase tracking-widest ml-4 flex items-center gap-2">
                <AlignLeft size={14} className="text-primary" /> Mission Description
              </label>
              <textarea 
                name="description"
                rows={5}
                value={formData.description ?? ""}
                onChange={handleChange}
                className="w-full bg-muted/50 border-2 border-border focus:border-primary px-6 py-5 rounded-[2rem] font-medium outline-none transition-all resize-none"
                placeholder="Describe the squad, itinerary, what to expect, rules etc... (optional)"
              />
            </div>
          )}

          {/* Tags */}
          <div className="space-y-2">
            <label className="text-[10px] md:text-xs font-black uppercase tracking-widest ml-4 flex items-center gap-2">
              <Tag size={14} className="text-primary" /> Tags (comma separated)
            </label>
            <input 
              type="text"
              name="tags"
              value={formData.tags?.join(", ") || ""}
              onChange={(e) => {
                const tagsArray = e.target.value.split(",").map(t => t.trim()).filter(Boolean);
                setFormData(prev => ({ ...prev, tags: tagsArray.length ? tagsArray : null }));
              }}
              className="w-full bg-muted/50 border-2 border-border focus:border-primary px-6 py-4 rounded-2xl font-bold outline-none transition-all text-sm"
              placeholder="Ex: adventure, trekking, photography, budget"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border/50">
            <button 
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="flex-1 py-5 border-2 border-border rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-muted transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isSaving}
              className="flex-1 py-5 bg-foreground text-background rounded-2xl font-black uppercase text-[11px] tracking-widest flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all shadow-xl shadow-primary/10 disabled:opacity-70"
            >
              {isSaving ? <>Saving...</> : <> <Save size={18} /> Save Changes </>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}