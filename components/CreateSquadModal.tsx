"use client"
import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { 
  X, MapPin, Calendar, Clock, Hash as HashIcon, 
  Sparkles, Send, Info, BadgeIndianRupee, Film, Coffee, Plane, Ticket,
  Users2, Milestone, ShieldCheck
} from "lucide-react";

export default function CreateSquadModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [formData, setFormData] = useState({
    category: "Travel Tour",
    destination: "",
    location: "", 
    date: "",
    timeOrDuration: "", 
    price: "",
    maxMembers: 10,
    hashtags: "",
    description: "",
    // নতুন ফিল্ডস
    genderPreference: "Mixed",
    ageRange: "18-35"
  });

  const categoryConfig = useMemo(() => {
    switch (formData.category) {
      case "Movie":
        return { 
          locLabel: "Cinema / Theater Name", 
          locPlaceholder: "e.g. PVR Forum Mall", 
          timeLabel: "Show Time", 
          timePlaceholder: "e.g. 6:45 PM",
          icon: <Film size={18} className="text-purple-500" />
        };
      case "Hangout":
        return { 
          locLabel: "Meeting Point / Cafe", 
          locPlaceholder: "e.g. Blue Tokai Coffee", 
          timeLabel: "Meeting Time", 
          timePlaceholder: "e.g. 5:00 PM onwards",
          icon: <Coffee size={18} className="text-green-500" />
        };
      case "Event":
        return { 
          locLabel: "Event Venue", 
          locPlaceholder: "e.g. Salt Lake Stadium", 
          timeLabel: "Entry Time", 
          timePlaceholder: "e.g. Gates open at 4 PM",
          icon: <Ticket size={18} className="text-orange-500" />
        };
      default: 
        return { 
          locLabel: "Exact Location", 
          locPlaceholder: "e.g. Rishikesh, Uttarakhand", 
          timeLabel: "Duration", 
          timePlaceholder: "e.g. 3 Days, 2 Nights",
          icon: <Plane size={18} className="text-blue-500" />
        };
    }
  }, [formData.category]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-card rounded-[2.5rem] border border-border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between bg-muted/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-background rounded-2xl shadow-inner border border-border/50">
                {categoryConfig.icon}
            </div>
            <div>
                <h2 className="text-2xl font-black uppercase italic tracking-tighter">Launch {formData.category}</h2>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Find your perfect companions</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 bg-muted rounded-full hover:bg-border transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 overflow-y-auto space-y-6 no-scrollbar">
          
          {/* Category Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {["Travel Tour", "Movie", "Event", "Hangout"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFormData({ ...formData, category: cat })}
                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shrink-0 border-2 ${
                  formData.category === cat 
                  ? "bg-primary border-primary text-white shadow-lg" 
                  : "bg-muted/50 border-transparent text-muted-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Squad Title */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase opacity-60 ml-1 italic">Squad Title / Activity</label>
            <input 
              required
              type="text" 
              placeholder={formData.category === "Movie" ? "e.g. Pushpa 2: FDFS" : "e.g. Weekend Trek to Kedarkantha"}
              className="w-full px-6 py-4 bg-muted/30 rounded-2xl font-bold border-none outline-none text-lg focus:ring-2 focus:ring-primary/20 transition-all"
              onChange={(e) => setFormData({...formData, destination: e.target.value})}
            />
          </div>

          {/* Location & Cost */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase opacity-60 ml-1 italic">{categoryConfig.locLabel}</label>
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-primary transition-transform group-focus-within:scale-110" size={18} />
                <input 
                  required
                  type="text" 
                  placeholder={categoryConfig.locPlaceholder}
                  className="w-full pl-12 pr-6 py-4 bg-muted/30 rounded-2xl font-bold border-none outline-none focus:ring-2 focus:ring-primary/20"
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase opacity-60 ml-1 italic">Cost (Per Person)</label>
              <div className="relative group">
                <BadgeIndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                <input 
                  required
                  type="text" 
                  placeholder="e.g. 500 or Shared"
                  className="w-full pl-12 pr-6 py-4 bg-muted/30 rounded-2xl font-bold border-none outline-none focus:ring-2 focus:ring-primary/20"
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase opacity-60 ml-1 italic">Departure / Meet Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input 
                  required
                  type="text" 
                  placeholder="e.g. Jan 15, 2026"
                  className="w-full pl-12 pr-6 py-4 bg-muted/30 rounded-2xl font-bold border-none outline-none focus:ring-2 focus:ring-primary/20"
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase opacity-60 ml-1 italic">{categoryConfig.timeLabel}</label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input 
                  required
                  type="text" 
                  placeholder={categoryConfig.timePlaceholder}
                  className="w-full pl-12 pr-6 py-4 bg-muted/30 rounded-2xl font-bold border-none outline-none focus:ring-2 focus:ring-primary/20"
                  onChange={(e) => setFormData({...formData, timeOrDuration: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* --- New Preferences Section --- */}
          <div className="p-5 bg-muted/20 rounded-[2rem] border border-border/50 space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
              <ShieldCheck size={14} /> Squad Preferences
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Gender Preference */}
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase opacity-60 ml-1 flex items-center gap-1">
                  <Users2 size={12} /> Gender
                </label>
                <div className="flex gap-1.5 bg-background p-1 rounded-xl border border-border">
                  {["Mixed", "Only Boys", "Only Girls"].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setFormData({ ...formData, genderPreference: g })}
                      className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase transition-all ${
                        formData.genderPreference === g 
                        ? "bg-foreground text-background" 
                        : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {g.split(' ')[1] || g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Age Range Preference */}
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase opacity-60 ml-1 flex items-center gap-1">
                  <Milestone size={12} /> Age Group
                </label>
                <div className="relative">
                  <select 
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl font-bold text-[10px] uppercase outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
                    onChange={(e) => setFormData({...formData, ageRange: e.target.value})}
                  >
                    <option value="18-30">18 - 30 Yrs</option>
                    <option value="25-45">25 - 45 Yrs</option>
                    <option value="Any Age">Any Age</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">▼</div>
                </div>
              </div>
            </div>
          </div>

          {/* Members & Hashtags */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase opacity-60 ml-1 italic">Max Members</label>
              <input 
                required
                type="number" 
                value={formData.maxMembers}
                className="w-full px-6 py-4 bg-muted/30 rounded-2xl font-bold border-none outline-none focus:ring-2 focus:ring-primary/20"
                onChange={(e) => setFormData({...formData, maxMembers: parseInt(e.target.value)})}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase opacity-60 ml-1 italic">Tags</label>
              <div className="relative">
                <HashIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <input 
                  type="text" 
                  placeholder="adventure fun"
                  className="w-full pl-10 pr-4 py-4 bg-muted/30 rounded-2xl font-bold border-none outline-none focus:ring-2 focus:ring-primary/20"
                  onChange={(e) => setFormData({...formData, hashtags: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col md:flex-row items-center gap-4 pt-6 border-t border-border mt-4">
            <div className="flex items-center gap-3 px-6 py-4 bg-secondary/10 rounded-2xl border border-secondary/20 flex-1 w-full md:w-auto">
               <Info className="text-secondary shrink-0" size={20} />
               <p className="text-[10px] font-black text-foreground uppercase tracking-tight">
                  Cost to launch: <span className="text-primary">10 S-Coins</span> / <span className="text-primary">₹20</span>
               </p>
            </div>
            
            <button 
              type="submit"
              className="w-full md:w-auto px-12 py-5 bg-foreground text-background dark:bg-primary dark:text-white rounded-[1.5rem] font-black shadow-xl hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-3 uppercase tracking-widest italic"
            >
              LAUNCH SQUAD <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}