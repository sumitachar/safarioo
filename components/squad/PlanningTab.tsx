"use client"
import { Map as MapIcon, Bed, Car, Utensils, Star, ChevronRight, Info, CheckSquare, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function PlanningTab({ squadId, type }: { squadId: string, type: string }) {
  const data = {
    hotels: [
      { id: "h1", name: "Grand Himalayan Resort", price: "₹2,500/night", rating: "4.8", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945" }
    ],
    essentials: ["Valid ID", "Powerbank", "Warm Clothes", "First Aid Kit"]
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      {/* Accommodation Section */}
      <section className="space-y-4">
        <h3 className="text-xl font-black uppercase italic tracking-tighter flex items-center gap-2">
          <Bed className="text-primary" size={20} /> Squad Accommodation
        </h3>
        {data.hotels.map((hotel) => (
          <Link key={hotel.id} href={`/hotels/${hotel.id}`}>
            <div className="group bg-card border border-border rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row items-center hover:border-primary/50 transition-all shadow-xl">
              <img src={hotel.image} className="w-full md:w-48 h-40 object-cover group-hover:scale-110 transition-all duration-700" alt="" />
              <div className="p-6 flex-1 w-full flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2 text-secondary font-black text-[10px] uppercase">
                    <Star size={12} fill="currentColor" /> {hotel.rating} Rated
                  </div>
                  <h4 className="text-xl font-black uppercase italic tracking-tighter">{hotel.name}</h4>
                  <p className="text-sm font-bold text-primary">{hotel.price}</p>
                </div>
                <div className="bg-muted p-4 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all">
                  <ChevronRight size={20} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* Internal Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-[2.5rem] p-8 space-y-4 shadow-lg">
          <div className="p-3 bg-primary/10 w-fit rounded-xl text-primary"><Car size={20}/></div>
          <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Transport Partner</h4>
          <p className="text-lg font-black italic uppercase tracking-tighter">Safarioo Logistics</p>
          <div className="px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded-lg w-fit text-[8px] font-black uppercase">Confirmed</div>
        </div>

        <div className="bg-card border border-border rounded-[2.5rem] p-8 space-y-4 shadow-lg">
          <div className="p-3 bg-secondary/10 w-fit rounded-xl text-secondary"><Utensils size={20}/></div>
          <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Meal Plan</h4>
          <p className="text-lg font-black italic uppercase tracking-tighter">Full Board (B+L+D)</p>
          <Link href={`/squads/${squadId}/menu`} className="text-[10px] font-black text-primary uppercase border-b border-primary">View Menu</Link>
        </div>
      </div>

      {/* Essentials */}
      <div className="bg-card border border-border rounded-[2.5rem] p-8 space-y-4 shadow-lg">
        <h4 className="text-sm font-black uppercase italic tracking-widest flex items-center gap-2"><ShoppingBag size={18}/> Checklist</h4>
        <div className="grid grid-cols-2 gap-3">
          {data.essentials.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-[10px] font-bold uppercase italic text-muted-foreground">
              <CheckSquare size={14} className="text-primary" /> {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}