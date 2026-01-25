"use client"
import { ShieldCheck, MapPin, IndianRupee, ArrowUpRight, Star } from "lucide-react";

interface AgencyCardProps {
  name: string;
  destination: string;
  price: string;
  rating?: number;
}

export default function AgencyCard({ name, destination, price, rating = 4.8 }: AgencyCardProps) {
  return (
    <div className="group card relative overflow-hidden flex flex-col md:flex-row items-center justify-between p-6 transition-all hover:border-secondary/40">
      
      {/* Background Decorative Element (Subtle Indian Pattern logic) */}
      <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
         <ShieldCheck size={120} />
      </div>

      <div className="flex items-center gap-6 w-full">
        {/* Agency Identity / Badge */}
        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-secondary/10 text-secondary border border-secondary/20">
          <ShieldCheck size={32} strokeWidth={1.5} />
          <div className="absolute -bottom-2 -right-2 bg-primary text-[10px] text-white px-2 py-0.5 rounded-md font-bold shadow-lg">
            VERIFIED
          </div>
        </div>

        <div className="space-y-2 w-full">
          <div className="flex items-center gap-2">
            <h4 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
              {name}
            </h4>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-muted text-xs font-bold text-muted-foreground">
              <Star size={12} className="text-secondary fill-secondary" />
              {rating}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin size={16} className="text-primary" />
              <span className="font-medium text-foreground">{destination}</span>
            </div>
            <div className="flex items-center gap-1.5 text-secondary font-bold">
              <IndianRupee size={16} />
              <span className="text-lg">{price}</span>
              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">/ Person</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Area */}
      <div className="flex items-center gap-4 mt-4 md:mt-0 w-full md:w-auto">
        <button className="w-full md:w-auto flex items-center justify-center gap-2 rounded-xl bg-secondary px-6 py-3 text-sm font-black text-secondary-foreground shadow-lg shadow-secondary/20 hover:scale-[1.02] active:scale-95 transition-all">
          Book Package <ArrowUpRight size={18} />
        </button>
      </div>
      
    </div>
  );
}