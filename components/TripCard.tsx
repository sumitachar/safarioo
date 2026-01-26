"use client"
import { Calendar, Users, MapPin, ChevronRight, BadgeIndianRupee, User, ShieldCheck, Milestone } from "lucide-react";

interface TripCardProps {
  id: string;
  destination: string;
  date: string;
  members: number;
  maxMembers?: number;
  price?: string;
  author?: string;
  category?: string;
  gender?: "Mixed" | "Only Boys" | "Only Girls";
  ageRange?: string;
}

export default function TripCard({ 
  id,
  destination, 
  date, 
  members, 
  maxMembers = 10, 
  price = "TBD", 
  author = "Explorer",
  category = "Trip",
  gender = "Mixed",
  ageRange = "18-35"
}: TripCardProps) {
  
  const spotsLeft = maxMembers - members;
  const progressPercentage = (members / maxMembers) * 100;

  // জেন্ডার অনুযায়ী কালার স্কিম
  const genderColors = {
    "Mixed": "bg-blue-500/10 text-blue-500 border-blue-500/20",
    "Only Boys": "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
    "Only Girls": "bg-pink-500/10 text-pink-500 border-pink-500/20"
  };

  return (
    <div className="group relative bg-card border border-border rounded-[2.5rem] p-5 md:p-6 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 flex flex-col gap-5 w-full shrink-0">
      
      {/* Top Header: Author & Status Labels */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-2xl bg-primary/10 flex items-center justify-center text-primary rotate-3 group-hover:rotate-0 transition-transform">
            <User size={16} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter italic leading-none mb-0.5">Squad Leader</p>
            <span className="text-xs font-black text-foreground">@{author.toLowerCase()}</span>
          </div>
        </div>
        <div className="flex gap-2">
           <span className={`text-[8px] font-black uppercase tracking-wider px-2 py-1 rounded-lg border ${genderColors[gender]}`}>
            {gender}
          </span>
          <span className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 bg-secondary/10 text-secondary rounded-xl border border-secondary/20">
            {category}
          </span>
        </div>
      </div>

      <div className="space-y-4">
          {/* Destination & Price Section */}
          <div className="flex justify-between items-start gap-2">
            <div className="space-y-1">
               <div className="flex items-center gap-1.5 text-primary">
                  <MapPin size={14} className="animate-bounce" />
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-70 italic">Target Location</span>
               </div>
               <h4 className="text-xl md:text-2xl font-black tracking-tight text-foreground leading-tight uppercase italic">
                 {destination}
               </h4>
            </div>
            
            <div className="text-right shrink-0">
              <div className="px-3 py-2 bg-muted/50 rounded-2xl border border-border/50 group-hover:border-primary/30 transition-colors">
                <p className="text-[9px] font-bold text-muted-foreground uppercase mb-1 leading-none">Estimate</p>
                <div className="text-sm md:text-base font-black text-foreground flex items-center justify-end gap-0.5">
                  {price !== "Free" && price !== "Shared" && <BadgeIndianRupee size={14} className="text-primary" />}
                  {price}
                </div>
              </div>
            </div>
          </div>

          {/* Preferences Grid (Age & Safety) */}
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 px-3 py-2.5 bg-muted/30 rounded-xl border border-border/50 text-[10px] font-black uppercase tracking-tight">
               <Milestone size={14} className="text-secondary" />
               Age: {ageRange} yrs
            </div>
            <div className="flex items-center gap-2 px-3 py-2.5 bg-muted/30 rounded-xl border border-border/50 text-[10px] font-black uppercase tracking-tight">
               <ShieldCheck size={14} className="text-green-500" />
               Verified Only
            </div>
          </div>

          {/* Date & Members Info */}
          <div className="flex flex-wrap gap-2 md:gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-background rounded-xl border border-border/50 text-xs font-bold shadow-sm">
              <Calendar size={14} className="text-primary" />
              {date}
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-background rounded-xl border border-border/50 text-xs font-bold shadow-sm">
              <Users size={14} className="text-primary" />
              {members}/{maxMembers} <span className="hidden sm:inline">Squad</span>
            </div>
          </div>
      </div>

      {/* Footer: Avatar Stack & Join Button */}
      <div className="flex items-center justify-between pt-4 border-t border-dashed border-border">
        <div className="flex items-center">
            <div className="flex -space-x-2.5 mr-3">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="h-8 w-8 rounded-full border-2 border-card bg-muted flex items-center justify-center overflow-hidden shadow-sm">
                    <img src={`https://i.pravatar.cc/150?u=${id}${i}`} alt="user" className="h-full w-full object-cover" />
                 </div>
               ))}
               <div className="h-8 w-8 rounded-full border-2 border-card bg-primary text-white flex items-center justify-center text-[10px] font-black shadow-lg">
                  +{spotsLeft}
               </div>
            </div>
            <p className="text-[10px] font-bold text-muted-foreground leading-none">
                <span className="text-primary block font-black">{spotsLeft} SLOTS LEFT</span>
            </p>
        </div>
        
        <button className="h-12 w-12 md:w-auto md:px-6 rounded-2xl bg-foreground text-background flex items-center justify-center gap-2 font-black hover:bg-primary hover:text-white transition-all active:scale-95 shadow-xl group/btn">
          <span className="hidden md:inline text-[10px] uppercase tracking-widest">Join Squad</span>
          <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[80%] h-1 bg-muted rounded-full overflow-hidden border border-border/20">
         <div 
           className={`h-full transition-all duration-1000 ease-out ${progressPercentage > 80 ? 'bg-red-500' : 'bg-primary'}`} 
           style={{ width: `${progressPercentage}%` }}
         />
      </div>
    </div>
  );
}