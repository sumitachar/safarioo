"use client"
import { useState } from "react";
import Link from "next/link"; 
import {
  Search, Star, MapPin, ArrowRight, Building2,
  Calendar, ShieldCheck, Sparkles, Filter, CheckCircle2,
  Clock, History
} from "lucide-react";
import RegisterAgencyModal from "@/components/RegisterAgencyModal";

const ALL_PACKAGES = [
  { id: "p1", title: "Char Dham Yatra 2026", price: "₹25,000", duration: "10D/9N", agencyName: "Ancient Trails", image: "https://images.unsplash.com/photo-1584810359583-96fc3448beaa", category: "Pilgrimage" },
  { id: "p2", title: "Manali High Trek", price: "₹8,500", duration: "5D/4N", agencyName: "Peak Explorers", image: "https://images.unsplash.com/photo-1596230529625-7ee10f7b09b6", category: "Adventure" },
];

const AGENCIES = [
  { id: "a1", name: "Ancient Trails", location: "Haridwar", rating: 4.9, completed: 450, joined: "2022" },
  { id: "a2", name: "Peak Explorers", location: "Manali", rating: 4.7, completed: 210, joined: "2023" },
  { id: "a3", name: "PVR Cinemas", location: "Mumbai", rating: 4.8, completed: 1200, joined: "2021" },
];

export default function AgenciesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 

  return (
    <main className="min-h-screen bg-background">
      <div className="sticky top-16 z-30 bg-background/80 backdrop-blur-xl border-b border-border p-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search for squads, events or specific packages..."
              className="w-full pl-12 pr-4 py-3.5 bg-muted/30 border-none rounded-2xl font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-secondary text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-secondary/20 flex items-center gap-2"
          >
            <Building2 size={18} /> Register Agency
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-black italic uppercase tracking-tighter">Live <span className="text-primary">Packages</span></h2>
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                <Filter size={14} /> Sort By
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ALL_PACKAGES.map((pkg) => (
                <Link key={pkg.id} href={`/packages/${pkg.id}`}> 
                  <div className="group bg-card border border-border rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer h-full flex flex-col">
                    <div className="h-48 relative overflow-hidden">
                      <img src={pkg.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={pkg.title} />
                      <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-secondary font-black text-sm">
                        {pkg.price}
                      </div>
                    </div>
                    <div className="p-6 space-y-4 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 text-[9px] font-black uppercase text-primary tracking-widest">
                        <Sparkles size={12} /> {pkg.category}
                      </div>
                      <h3 className="text-xl font-black italic uppercase leading-tight tracking-tight group-hover:text-primary transition-colors">{pkg.title}</h3>
                      <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-auto">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase">
                          <Clock size={14} /> {pkg.duration}
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Details <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-muted/20 border border-border rounded-[2.5rem] p-6 sticky top-40">

              <div className="space-y-4 mb-6">
                <h2 className="text-lg font-black uppercase italic tracking-tighter px-1">
                  Verified <span className="text-secondary">Agencies</span>
                </h2>

                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-secondary transition-colors" size={16} />
                  <input
                    type="text"
                    placeholder="Search agency by name..."
                    className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-2xl text-xs font-bold focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all placeholder:text-muted-foreground/50"
                  />
                </div>
              </div>

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 no-scrollbar">
                {AGENCIES.map((agency) => (
                  <Link key={agency.id} href={`/agencies/${agency.id}`}> 
                    <div className="bg-card border border-border p-5 rounded-3xl hover:border-secondary/50 hover:shadow-lg transition-all cursor-pointer group mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                          <Building2 size={24} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-1 text-primary">
                            <CheckCircle2 size={12} strokeWidth={3} />
                            <span className="text-[8px] font-black uppercase tracking-widest">Verified Partner</span>
                          </div>
                          <h4 className="font-black italic uppercase text-sm tracking-tight">{agency.name}</h4>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-secondary font-black text-xs">
                            <Star size={12} fill="currentColor" /> {agency.rating}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-border/50">
                        <div className="flex flex-col">
                          <span className="text-[8px] font-bold text-muted-foreground uppercase">Past Success</span>
                          <span className="text-xs font-black flex items-center gap-1"><History size={10} /> {agency.completed}+ Squads</span>
                        </div>
                        <div className="flex flex-col text-right">
                          <span className="text-[8px] font-bold text-muted-foreground uppercase">Base Location</span>
                          <span className="text-xs font-black truncate uppercase">{agency.location}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* সাইডবার CTA (Registration Promo) */}
              <div className="mt-8 p-6 bg-foreground rounded-[2rem] text-background text-center relative overflow-hidden group/cta">
                <h5 className="text-sm font-black italic uppercase relative z-10 group-hover/cta:text-secondary transition-colors">Grow with Safarioo</h5>
                <p className="text-[10px] font-bold opacity-60 mt-1 relative z-10">Expand your reach to 10k+ active explorers</p>
                <button 
                  onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}
                  className="mt-4 w-full py-3 bg-secondary text-white rounded-xl font-black text-[10px] uppercase tracking-widest relative z-10 hover:scale-[1.02] transition-transform"
                >
                  Join Community
                </button>
                <ShieldCheck className="absolute -bottom-6 -right-6 w-24 h-24 text-white/5 -rotate-12 group-hover/cta:rotate-0 transition-transform duration-700" />
              </div>
            </div>
          </div>

        </div>
      </div>

      <RegisterAgencyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}