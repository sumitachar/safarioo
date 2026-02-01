"use client";
import { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  X, MapPin, Calendar, Clock, Hash as HashIcon,
  Sparkles, Send, Info, BadgeIndianRupee, Film, Coffee, Plane, Ticket,
  Users2, Milestone, ShieldCheck, Loader2
} from "lucide-react";
import { squadApi } from "@/api/squadApi";

export default function CreateSquadModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { user } = useSelector((state: RootState) => state.auth) as any;

  const [formData, setFormData] = useState({
    title: "",
    category: "Travel Tour",
    location: "",
    date: "",
    time: "",
    duration: "",
    price: "",
    max_members: 10,
    hashtags: [] as string[],
    description: "",
    gender_preference: "Mixed",
    age_range: "18-30"
  });

  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState(false);

  // Clear data when category (tab) changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      title: "",
      location: "",
      date: "",
      time: "",
      duration: "",
      price: "",
      max_members: 10,
      hashtags: [],
      description: "",
      gender_preference: "Mixed",
      age_range: "18-30"
    }));
    setSubmitError(null);
    setSuccessMessage(false);
  }, [formData.category]);

  const categoryConfig = useMemo(() => {
    switch (formData.category) {
      case "Movie":
        return {
          locLabel: "Cinema / Theater Name",
          locPlaceholder: "e.g. PVR Forum Mall",
          timeLabel: "Duration",
          timePlaceholder: "4 hr",
          icon: <Film size={18} className="text-purple-500" />
        };
      case "Hangout":
        return {
          locLabel: "Meeting Point / Cafe",
          locPlaceholder: "e.g. Blue Tokai Coffee",
          timeLabel: "Duration",
          timePlaceholder: "3 hr",
          icon: <Coffee size={18} className="text-green-500" />
        };
      case "Event":
        return {
          locLabel: "Event Venue",
          locPlaceholder: "e.g. Salt Lake Stadium",
          timeLabel: "Duration",
          timePlaceholder: "2 hrs, Half Day",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitError(null);
    setSuccessMessage(false);
    setLoading(true);

    try {
      let payload: any = {
        location: formData.location.trim(),
        cost: formData.price.trim() || "Shared",
        duration: formData.duration.trim(),
        gender: formData.gender_preference === "Mixed" ? "Any" : formData.gender_preference,
        age_group: formData.age_range,
        max_member: formData.max_members,
        tag: formData.hashtags.length > 0 ? formData.hashtags : undefined,
      };

      switch (formData.category) {
        case "Travel Tour":
          payload = {
            ...payload,
            squad_title: formData.title.trim(),
            departure_date: formData.date,
            departure_time: formData.time,
          };
          break;

        case "Movie":
          payload = {
            ...payload,
            movie_title: formData.title.trim(),
            theater_name: formData.location.trim(),
            movie_date: formData.date,
            movie_time: formData.time,
          };
          break;

        case "Event":
          payload = {
            ...payload,
            event_title: formData.title.trim(),
            event_date: formData.date,
            event_time: formData.time,
          };
          break;

        case "Hangout":
          payload = {
            ...payload,
            hangout_title: formData.title.trim(),
            hangout_date: formData.date,
            hangout_time: formData.time,
          };
          break;
      }

      const cleanPayload = Object.fromEntries(
        Object.entries(payload).filter(([_, value]) => value !== undefined && value !== "")
      );

      await squadApi.createSquad(formData.category, cleanPayload);

      setSuccessMessage(true);
      setTimeout(() => {
        onClose();
      }, 1800);

    } catch (err: any) {
      const backendResponse = err.response?.data;
      if (backendResponse?.errors) {
        const errorObj = backendResponse.errors as Record<string, string[]>;
        const allErrors = Object.values(errorObj).flat();
        setSubmitError(allErrors.join(" "));
      } else if (backendResponse?.message) {
        setSubmitError(backendResponse.message);
      } else {
        setSubmitError("Something went wrong. Please check your fields.");
      }
    } finally {
      setLoading(false);
    }
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
          <button
            onClick={onClose}
            className="p-2 bg-muted rounded-full hover:bg-border transition-colors"
            disabled={loading}
          >
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
                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shrink-0 border-2 ${formData.category === cat
                    ? "bg-primary border-primary text-white shadow-lg"
                    : "bg-muted/50 border-transparent text-muted-foreground"
                  }`}
                disabled={loading}
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
              value={formData.title}
              placeholder={formData.category === "Movie" ? "e.g. Pushpa 2: FDFS" : "e.g. Weekend Trek to Kedarkantha"}
              className="w-full px-6 py-4 bg-muted/30 rounded-2xl font-bold border-none outline-none text-lg focus:ring-2 focus:ring-primary/20 transition-all"
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              disabled={loading}
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
                  value={formData.location}
                  placeholder={categoryConfig.locPlaceholder}
                  className="w-full pl-12 pr-6 py-4 bg-muted/30 rounded-2xl font-bold border-none outline-none focus:ring-2 focus:ring-primary/20"
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  disabled={loading}
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
                  value={formData.price}
                  placeholder="e.g. 5000 or Shared"
                  className="w-full pl-12 pr-6 py-4 bg-muted/30 rounded-2xl font-bold border-none outline-none focus:ring-2 focus:ring-primary/20"
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase opacity-60 ml-1 italic">Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  required
                  type="date"
                  value={formData.date}
                  className="w-full pl-12 pr-6 py-4 bg-muted/30 rounded-2xl font-bold border-none outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase opacity-60 ml-1 italic">Time</label>
              <div className="relative group">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                <input
                  required
                  type="time"
                  value={formData.time}
                  className="w-full pl-12 pr-6 py-4 bg-muted/30 rounded-2xl font-bold border-none outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase opacity-60 ml-1 italic">{categoryConfig.timeLabel}</label>
            <div className="relative">
              <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                required
                type="text"
                value={formData.duration}
                placeholder={categoryConfig.timePlaceholder}
                className="w-full pl-12 pr-6 py-4 bg-muted/30 rounded-2xl font-bold border-none outline-none focus:ring-2 focus:ring-primary/20"
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                disabled={loading}
              />
            </div>
          </div>

          {/* Preferences Section */}
          <div className="p-5 bg-muted/20 rounded-[2rem] border border-border/50 space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
              <ShieldCheck size={14} /> Squad Preferences
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase opacity-60 ml-1 flex items-center gap-1">
                  <Users2 size={12} /> Gender
                </label>
                <div className="flex gap-1.5 bg-background p-1 rounded-xl border border-border">
                  {["Mixed", "Only Boys", "Only Girls"].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setFormData({ ...formData, gender_preference: g })}
                      className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase transition-all ${formData.gender_preference === g
                          ? "bg-foreground text-background"
                          : "text-muted-foreground hover:bg-muted"
                        }`}
                      disabled={loading}
                    >
                      {g.split(' ')[1] || g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase opacity-60 ml-1 flex items-center gap-1">
                  <Milestone size={12} /> Age Group
                </label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl font-bold text-[10px] uppercase outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
                    value={formData.age_range}
                    onChange={(e) => setFormData({ ...formData, age_range: e.target.value })}
                    disabled={loading}
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
                value={formData.max_members}
                min={2}
                className="w-full px-6 py-4 bg-muted/30 rounded-2xl font-bold border-none outline-none focus:ring-2 focus:ring-primary/20"
                onChange={(e) => setFormData({ ...formData, max_members: Number(e.target.value) || 10 })}
                disabled={loading}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase opacity-60 ml-1 italic">Tags (Press Enter)</label>
              <div className="relative group">
                <div className="w-full min-h-[64px] p-2 bg-muted/30 rounded-2xl border-none flex flex-wrap gap-2 items-center focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                  {formData.hashtags.map((tag, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-xl text-[10px] font-black uppercase tracking-wider animate-in zoom-in-95"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => setFormData({
                          ...formData,
                          hashtags: formData.hashtags.filter((_, i) => i !== index)
                        })}
                        className="hover:bg-primary/20 p-0.5 rounded-md transition-colors"
                        disabled={loading}
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                  <div className="relative flex-1 min-w-[120px] flex items-center">
                    <HashIcon className="absolute left-2 text-muted-foreground" size={16} />
                    <input
                      type="text"
                      placeholder={formData.hashtags.length === 0 ? "beach, fun, friends..." : ""}
                      className="w-full pl-8 pr-4 py-2 bg-transparent border-none outline-none font-bold text-sm"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const val = e.currentTarget.value.trim().replace(/#/g, '');
                          if (val && !formData.hashtags.includes(val)) {
                            setFormData({ ...formData, hashtags: [...formData.hashtags, val] });
                          }
                          e.currentTarget.value = "";
                        } else if (e.key === 'Backspace' && !e.currentTarget.value && formData.hashtags.length > 0) {
                          setFormData({ ...formData, hashtags: formData.hashtags.slice(0, -1) });
                        }
                      }}
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col md:flex-row items-center gap-4 pt-6 border-t border-border mt-4">
            <div className="flex items-center gap-3 px-6 py-4 bg-secondary/10 rounded-2xl border border-secondary/20 flex-1 w-full md:w-auto">
              <div className="p-2 bg-secondary/20 rounded-lg">
                <Info className="text-secondary" size={20} />
              </div>
              <p className="text-[10px] font-black text-foreground uppercase tracking-tight">
                Cost to launch: <span className="text-primary font-black">10 S-Coins</span> / <span className="text-primary font-black">₹20</span>
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-12 py-5 bg-foreground text-background dark:bg-primary dark:text-white rounded-[1.5rem] font-black shadow-xl hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-3 uppercase tracking-widest italic disabled:opacity-60 disabled:pointer-events-none"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  LAUNCHING...
                </>
              ) : (
                <>
                  LAUNCH SQUAD <Send size={18} />
                </>
              )}
            </button>
          </div>

          {submitError && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
               <p className="text-red-500 text-xs font-bold text-center">{submitError}</p>
            </div>
          )}

          {successMessage && (
            <p className="text-green-500 text-sm font-black text-center mt-3 animate-pulse">
              SQUAD LAUNCHED SUCCESSFULLY!
            </p>
          )}
        </form>
      </div>
    </div>
  );
}