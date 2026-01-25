"use client"
import { useState } from "react";
import TripCard from "@/components/TripCard";
import { Search, MapPin, Filter, Plus, Plane, Film, Ticket, Coffee, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";

const CATEGORIES = ["All Squads", "Travel Tour", "Movie", "Event", "Hangout"];

const SQUAD_DATA = [
  { id: "s-1", destination: "Kedarnath Trek", date: "May 10, 2026", members: 4, maxMembers: 8, price: "₹5,500", author: "Arjun", category: "Travel Tour" },
  { id: "s-2", destination: "Pushpa 2: The Rule", date: "Dec 05, 2025", members: 2, maxMembers: 4, price: "₹350", author: "MovieBuff", category: "Movie" },
  { id: "s-3", destination: "Sunburn Music Fest", date: "Dec 28, 2025", members: 12, maxMembers: 50, price: "₹4,999", author: "RaveQueen", category: "Event" },
  { id: "s-4", destination: "Weekend Board Games", date: "Saturday, 5 PM", members: 3, maxMembers: 6, price: "Shared", author: "GamerBoy", category: "Hangout" },
  { id: "s-5", destination: "Varkala Surf Trip", date: "Feb 20, 2026", members: 2, maxMembers: 5, price: "₹8,000", author: "Sneha", category: "Travel Tour" },
  { id: "s-6", destination: "Avatar 3 IMAX", date: "Jan 15, 2026", members: 5, maxMembers: 10, price: "₹650", author: "Cinephile", category: "Movie" },
];

export default function ExploreTrips() {
  const [activeCategory, setActiveCategory] = useState("All Squads");

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* 1. Header Section - Responsive padding & typography */}
      <header className="relative py-12 md:py-24 px-4 bg-gradient-to-b from-primary/10 via-background to-background border-b border-border/50 overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-grid-black/[0.02] -z-10" />

        <div className="max-w-7xl mx-auto space-y-6 md:space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-[10px] md:text-xs font-black uppercase tracking-widest mx-auto">
            <Sparkles size={14} /> Discovery Mode
          </div>

          <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-[1.1] px-2">
            Find Your <br className="md:hidden" /> <span className="text-primary">Perfect Squad</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-lg font-medium px-4">
            Don't go alone. Join a community of explorers for treks, movies, or coffee meetups.
          </p>

          {/* Enhanced Search Bar - Responsive Flex Layout */}
          <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center bg-card p-2 rounded-[2rem] md:rounded-full border border-border shadow-2xl mt-4 md:mt-8 gap-1 md:gap-0">

            {/* Search Input Section */}
            <div className="w-full md:flex-[1.5] flex items-center px-5 md:px-8 gap-3 py-4">
              <Search className="text-primary shrink-0" size={20} />
              <input
                type="text"
                placeholder="Movies, treks, or events..."
                className="w-full bg-transparent outline-none font-bold text-sm md:text-base placeholder:text-muted-foreground/50"
              />
            </div>

            {/* Location Input Section (Visible only on Desktop) */}
            <div className="hidden md:flex flex-1 items-center px-8 gap-3 py-4 border-l border-border/50">
              <MapPin className="text-secondary shrink-0" size={18} />
              <input
                type="text"
                placeholder="Location"
                className="w-full bg-transparent outline-none font-bold text-base placeholder:text-muted-foreground/50"
              />
            </div>

            {/* Search Button */}
            <button className="bg-primary text-primary-foreground w-full md:w-auto h-14 md:h-16 px-10 rounded-[1.5rem] md:rounded-full font-black hover:opacity-90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center shrink-0">
              Search
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 mt-10 md:mt-16">

        {/* 2. Quick Filter Icons - Horizontal scroll on Mobile */}
        <div className="flex items-center gap-3 overflow-x-auto pb-6 no-scrollbar md:justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full md:rounded-[2rem] text-[10px] md:text-sm font-black transition-all whitespace-nowrap border-2 ${activeCategory === cat
                ? "bg-foreground text-background border-foreground shadow-lg scale-105"
                : "bg-card border-border text-muted-foreground hover:border-primary/50"
                }`}
            >
              {cat === "Travel Tour" && <Plane size={16} />}
              {cat === "Movie" && <Film size={16} />}
              {cat === "Event" && <Ticket size={16} />}
              {cat === "Hangout" && <Coffee size={16} />}
              {cat}
            </button>
          ))}
        </div>

        {/* 3. Create Squad Promo - Responsive Layout */}
        <div className="mb-12 md:mb-20 flex flex-col md:flex-row items-center bg-gradient-to-br from-secondary/10 to-primary/10 rounded-[2.5rem] border border-border overflow-hidden">
          <div className="p-8 md:p-12 space-y-3 text-center md:text-left flex-1">
            <h3 className="text-2xl md:text-4xl font-black leading-tight">Hosting something <br className="hidden md:block" /> interesting?</h3>
            <p className="text-muted-foreground text-sm md:text-base font-medium">Create a squad and let people join your journey.</p>
          </div>
          <div className="p-8 pt-0 md:p-12 md:pt-12">
            <button className="w-full md:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-foreground text-background font-black rounded-2xl md:rounded-[2rem] shadow-xl hover:scale-105 transition-all group">
              <Plus size={20} /> Start a Squad <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>

        {/* 4. Filter Info */}
        <div className="flex items-center justify-between mb-8 px-2">
          <div>
            <p className="text-[10px] font-black uppercase text-primary tracking-[0.2em] mb-1">Discovery</p>
            <h2 className="text-xl md:text-3xl font-black">{activeCategory}</h2>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl text-xs font-black hover:bg-muted transition-colors">
            <Filter size={16} /> <span className="hidden sm:inline">Sort by:</span> Recent
          </button>
        </div>

        {/* 5. Squad Grid - Responsive Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SQUAD_DATA.filter(item => activeCategory === "All Squads" || item.category === activeCategory).map((squad) => (
            <TripCard
              key={squad.id}
              id={squad.id}
              destination={squad.destination}
              date={squad.date}
              members={squad.members}
              maxMembers={squad.maxMembers}
              price={squad.price}
              author={squad.author}
              category={squad.category}
            />
          ))}
        </div>

        {/* 6. Pagination - Compact on Mobile */}
        <div className="mt-20 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-border flex items-center justify-center hover:bg-card disabled:opacity-20" disabled>
              <ArrowLeft size={18} />
            </button>
            <div className="flex gap-2">
              {[1, 2, 3].map(i => (
                <button key={i} className={`w-10 h-10 md:w-12 md:h-12 rounded-full font-black text-xs md:text-sm transition-all ${i === 1 ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-card border border-border hover:border-primary'}`}>
                  {i}
                </button>
              ))}
            </div>
            <button className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-border flex items-center justify-center hover:bg-card">
              <ArrowRight size={18} />
            </button>
          </div>
          <p className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-widest mt-2">Showing 6 of 84 Squads</p>
        </div>
      </main>
    </div>
  );
}