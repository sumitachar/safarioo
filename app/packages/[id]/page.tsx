"use client"
import { Calendar, Users, MapPin, CheckCircle, Info, ArrowLeft, ShieldCheck, BadgeIndianRupee } from "lucide-react";
import Link from "next/link";

export default function PackageDetails() {
  return (
    <div className="min-h-screen bg-background">
      {/* 1. Image Gallery (Simplified) */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6">
        <Link href="/agencies" className="inline-flex items-center gap-2 text-xs font-black uppercase mb-6 hover:text-primary transition-colors">
          <ArrowLeft size={16}/> Back to Squads
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[400px] md:h-[550px]">
          <div className="md:col-span-8 rounded-[3rem] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1584810359583-96fc3448beaa" className="w-full h-full object-cover" alt="Hero" />
          </div>
          <div className="hidden md:grid md:col-span-4 grid-rows-2 gap-4">
             <div className="rounded-[2.5rem] overflow-hidden"><img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb" className="w-full h-full object-cover" /></div>
             <div className="rounded-[2.5rem] overflow-hidden bg-secondary flex items-center justify-center text-white text-3xl font-black italic">+12 Photos</div>
          </div>
        </div>
      </div>

      {/* 2. Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
               <span className="px-4 py-1.5 bg-secondary text-white text-[10px] font-black uppercase rounded-full">Best Seller</span>
               <span className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground uppercase"><MapPin size={14}/> Uttarakhand, Bharat</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">Char Dham Yatra <br/> <span className="text-primary text-4xl md:text-6xl">Full Spiritual Circuit</span></h1>
          </div>

          {/* Quick Info Bar */}
          <div className="flex flex-wrap gap-8 py-8 border-y border-border">
             <div className="flex items-center gap-3">
               <div className="p-3 bg-muted rounded-2xl"><Calendar size={20}/></div>
               <div><p className="text-[10px] font-bold uppercase text-muted-foreground">Duration</p><p className="font-black uppercase">10 Days</p></div>
             </div>
             <div className="flex items-center gap-3">
               <div className="p-3 bg-muted rounded-2xl"><Users size={20}/></div>
               <div><p className="text-[10px] font-bold uppercase text-muted-foreground">Squad Size</p><p className="font-black uppercase">Max 15</p></div>
             </div>
             <div className="flex items-center gap-3">
               <div className="p-3 bg-muted rounded-2xl"><ShieldCheck size={20}/></div>
               <div><p className="text-[10px] font-bold uppercase text-muted-foreground">Guide</p><p className="font-black uppercase">Certified</p></div>
             </div>
          </div>

          {/* About Tour */}
          <div className="space-y-4">
            <h3 className="text-2xl font-black uppercase italic flex items-center gap-2"><Info size={24} className="text-primary" /> About the Journey</h3>
            <p className="text-muted-foreground leading-relaxed text-lg font-medium">
              Join our most popular spiritual squad. We take care of everything—from VIP Darshans to comfortable stays and satvik meals. Experience the divine energy of Yamunotri, Gangotri, Kedarnath, and Badrinath with like-minded explorers.
            </p>
          </div>

          {/* Inclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {["Luxury Transport", "Satvik Meals", "VIP Darshans", "Professional Guide", "Photography", "Health Support"].map((item, i) => (
               <div key={i} className="flex items-center gap-3 p-4 bg-muted/20 rounded-2xl border border-border/50 font-bold">
                  <CheckCircle size={18} className="text-secondary" /> {item}
               </div>
             ))}
          </div>
        </div>

        {/* 3. Booking Sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-card border-2 border-primary/20 p-10 rounded-[3.5rem] sticky top-28 shadow-2xl space-y-8">
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Starting from</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-secondary">₹25,000</span>
                <span className="text-xs font-bold text-muted-foreground">/ Person</span>
              </div>
            </div>

            <div className="space-y-4">
               <div className="p-4 bg-muted/50 rounded-2xl space-y-1">
                  <p className="text-[9px] font-black uppercase opacity-60">Next Batch</p>
                  <p className="font-black uppercase italic tracking-tight text-sm">15th March 2026</p>
               </div>
               <button className="w-full py-6 bg-primary text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all">
                  Join the Squad
               </button>
               <button className="w-full py-4 border-2 border-border rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest hover:border-primary transition-all">
                  Download Itinerary
               </button>
            </div>

            <div className="pt-6 border-t border-border flex items-center gap-4">
               <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb" className="w-12 h-12 rounded-2xl object-cover" alt="Agency" />
               <div>
                 <p className="text-[8px] font-black text-muted-foreground uppercase">Organized by</p>
                 <p className="text-sm font-black uppercase italic tracking-tight">Ancient Trails</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}