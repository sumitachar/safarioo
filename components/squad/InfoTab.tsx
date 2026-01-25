"use client"
import { MapPin, Calendar, Users, BadgeIndianRupee, ShieldCheck } from "lucide-react";

export default function InfoTab({ details }: any) {
  return (
    <div className="bg-card border border-border rounded-[3rem] p-8 md:p-12 space-y-8 animate-in fade-in duration-500 shadow-xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <DetailItem icon={<MapPin className="text-primary" size={18}/>} label="Location" value={details.location} />
        <DetailItem icon={<Calendar className="text-primary" size={18}/>} label="Departure" value={details.date} />
        <DetailItem icon={<Users className="text-primary" size={18}/>} label="Size" value={details.members} />
        <DetailItem icon={<BadgeIndianRupee className="text-primary" size={18}/>} label="Cost" value={details.cost} />
      </div>
      <div className="space-y-4 pt-6 border-t border-border">
        <h3 className="text-sm font-black uppercase italic flex items-center gap-2 text-primary"><ShieldCheck size={18} /> Squad Bio</h3>
        <p className="text-muted-foreground font-medium leading-relaxed italic text-lg">"{details.description}"</p>
      </div>
    </div>
  );
}

function DetailItem({ icon, label, value }: any) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 opacity-60">{icon} <span className="text-[8px] font-black uppercase tracking-widest">{label}</span></div>
      <p className="text-sm font-black uppercase italic leading-tight">{value}</p>
    </div>
  );
}