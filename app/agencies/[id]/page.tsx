"use client"
import { 
  Building2, MapPin, Star, CheckCircle2, Globe, History, 
  Instagram, Twitter, ArrowRight, Calendar, Sparkles, Clock 
} from "lucide-react";
import Link from "next/link";

export default function AgencyDetails() {
  // ডাটাবেস থেকে আসা স্যাম্পল প্যাকেজ ডেটা
  const AGENCY_PACKAGES = [
    {
      id: "char-dham-2026",
      title: "Char Dham Yatra 2026",
      category: "Heritage",
      price: "₹25,000",
      duration: "10 Days",
      image: "https://images.unsplash.com/photo-1584810359583-96fc3448beaa"
    },
    {
      id: "kedarnath-trek",
      title: "Kedarnath Solo Squad",
      category: "Adventure",
      price: "₹12,500",
      duration: "5 Days",
      image: "https://images.unsplash.com/photo-1596230529625-7ee10f7b09b6"
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* 1. Header Banner */}
      <div className="h-64 md:h-80 bg-gradient-to-r from-primary to-secondary relative">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="absolute -bottom-16 left-6 md:left-12">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-card border-4 border-background rounded-[2.5rem] flex items-center justify-center shadow-2xl">
            <Building2 size={60} className="text-primary" />
          </div>
        </div>
      </div>

      {/* 2. Content Section */}
      <div className="max-w-7xl mx-auto px-6 pt-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          
          {/* Agency Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-black uppercase text-xs tracking-widest">
              <CheckCircle2 size={18} strokeWidth={3} /> Verified Safarioo Partner
            </div>
            <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter">Ancient <span className="text-secondary">Trails</span></h1>
            <p className="text-muted-foreground text-lg font-medium leading-relaxed max-w-2xl">
              Specializing in spiritual and cultural heritage tours across Bharat since 2018. We have successfully led over 450+ squads to the Himalayas and beyond.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Rating", val: "4.9/5", icon: <Star size={16}/> },
              { label: "Squads Done", val: "450+", icon: <History size={16}/> },
              { label: "Base", val: "Haridwar", icon: <MapPin size={16}/> },
              { label: "Experience", val: "6 Years", icon: <Globe size={16}/> },
            ].map((s, i) => (
              <div key={i} className="bg-muted/30 p-5 rounded-3xl border border-border">
                <div className="text-secondary mb-2">{s.icon}</div>
                <div className="text-xl font-black">{s.val}</div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase">{s.label}</div>
              </div>
            ))}
          </div>

          {/* --- ৩. Active Packages (আপনার দেওয়া ডিজাইন অনুযায়ী) --- */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black uppercase italic tracking-tight flex items-center gap-3">
               Active <span className="text-primary text-4xl">Packages</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {AGENCY_PACKAGES.map((pkg) => (
                <Link key={pkg.id} href={`/packages/${pkg.id}`}> 
                  <div className="group bg-card border border-border rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer h-full flex flex-col">
                    {/* Image Area */}
                    <div className="h-48 relative overflow-hidden">
                      <img src={pkg.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={pkg.title} />
                      <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-secondary font-black text-sm">
                        {pkg.price}
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-6 space-y-4 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 text-[9px] font-black uppercase text-primary tracking-widest">
                        <Sparkles size={12} /> {pkg.category}
                      </div>
                      <h3 className="text-xl font-black italic uppercase leading-tight tracking-tight group-hover:text-primary transition-colors">
                        {pkg.title}
                      </h3>
                      
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
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-card border-2 border-border p-8 rounded-[3.5rem] sticky top-28 shadow-xl">
            <h3 className="text-xl font-black uppercase italic mb-6">Connect</h3>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 bg-muted/50 rounded-2xl font-bold hover:bg-primary hover:text-white transition-all">
                Instagram <Instagram size={20} />
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-muted/50 rounded-2xl font-bold hover:bg-primary hover:text-white transition-all">
                Twitter / X <Twitter size={20} />
              </button>
              <button className="w-full py-5 bg-foreground text-background rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg mt-4 active:scale-95 transition-transform">
                Message Agency
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}