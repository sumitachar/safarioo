"use client"
import { Star, MapPin, Wifi, Wind, ChevronLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function InternalHotelPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="relative h-[40vh] md:h-[55vh] overflow-hidden p-4">
        <Link href={`/my-squads/1`} className="absolute top-10 left-10 z-20 p-4 bg-background/80 backdrop-blur-xl rounded-3xl">
          <ChevronLeft size={20} />
        </Link>
        <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945" className="w-full h-full object-cover rounded-[3.5rem] shadow-2xl" alt="" />
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 mt-10">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <span className="px-4 py-1.5 bg-secondary/10 text-secondary border border-secondary/20 rounded-xl text-[10px] font-black uppercase tracking-widest italic flex w-fit items-center gap-2 mb-4">
              <Star size={12} fill="currentColor"/> Highly Recommended
            </span>
            <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">Grand Himalayan <span className="text-primary">Resort</span></h1>
            <p className="flex items-center gap-1 text-muted-foreground font-bold italic underline mt-4"><MapPin size={16}/> Kaza, Spiti Valley</p>
          </div>

          <div className="bg-muted/30 p-8 rounded-[3rem] border border-border">
            <h3 className="text-lg font-black uppercase italic mb-4">Internal Perks</h3>
            <ul className="grid grid-cols-2 gap-4">
              <li className="flex items-center gap-2 text-xs font-bold uppercase"><CheckCircle2 className="text-primary" size={16}/> Early Check-in</li>
              <li className="flex items-center gap-2 text-xs font-bold uppercase"><CheckCircle2 className="text-primary" size={16}/> Squad Bonfire</li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-card border-2 border-border p-8 rounded-[3rem] shadow-2xl space-y-6">
             <div className="text-center">
               <p className="text-[10px] font-black uppercase text-muted-foreground">Squad Price</p>
               <h2 className="text-5xl font-black text-primary italic">₹2,500</h2>
               <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">per person / night</p>
             </div>
             <button className="w-full py-6 bg-foreground text-background rounded-2xl font-black uppercase italic tracking-widest hover:bg-primary transition-all">
               Book for Squad
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}