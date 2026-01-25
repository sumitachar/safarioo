"use client"
import FeedCard from "./FeedCard";
import TripCard from "../TripCard";
import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";

// ১. TypeScript Interface (Props definition)
interface EntertainmentFeedProps {
    category: "Movie" | "Event";
    onJoin: (squad: any) => void;
}

export default function EntertainmentFeed({ category, onJoin }: EntertainmentFeedProps) {
    const TRENDING_TAGS = category === "Movie" 
        ? ["#Pushpa2", "#Avatar3", "#IMAX", "#Bollywood"] 
        : ["#SunburnGoa", "#MusicFest", "#ConcertNight", "#DelhiEvents"];

    const SQUADS = [
        { 
            id: "m1", 
            destination: category === "Movie" ? "Avatar 3 Special" : "Music Fest Pune", 
            title: category === "Movie" ? "Avatar 3 Special" : "Music Fest Pune", 
            date: "Next Sat", 
            members: 2, 
            maxMembers: 4, 
            price: "₹450", 
            author: "Rahul", 
            category: category 
        }
    ];

    return (
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
            {/* --- Sidebar (Mobile: Top | Desktop: Right) --- */}
            <div className="order-1 lg:order-2 lg:col-span-5 space-y-8 lg:sticky lg:top-40 h-fit">
                <div className="space-y-4">
                    <h3 className="text-lg font-black italic uppercase tracking-tighter">
                        Upcoming {category} Squads {category === "Movie" ? "🍿" : "🎸"}
                    </h3>
                    
                    <div className="flex lg:flex-col gap-4 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
                        {SQUADS.map((squad) => (
                            <div key={squad.id} className="min-w-[300px] lg:min-w-full">
                                {/* ২. অতিরিক্ত বাটন সরিয়ে পুরো কার্ডকে ক্লিকেবল করা হয়েছে */}
                                <div 
                                    onClick={() => onJoin(squad)} 
                                    className="cursor-pointer transition-all active:scale-95 hover:brightness-95"
                                >
                                    <TripCard {...squad} />
                                </div>
                                {/* নোট: TripCard-এর ভেতরে যদি বাটন না থাকে তবেই কেবল 
                                   এখানে আলাদা বাটন দিবেন। যেহেতু আপনার TripCard-এ 
                                   বাটন আছে, তাই ডাবল বাটন এড়াতে এটি সরাসরি div-এ দেওয়া হলো। 
                                */}
                            </div>
                        ))}
                    </div>
                </div>

                <Link href="/trips" className="group flex items-center justify-center gap-3 px-8 py-4 bg-card border-2 border-border rounded-[2rem] font-black hover:border-primary transition-all shadow-sm">
                    Explore All {category}s <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </Link>

                <section className="pt-6 border-t border-border/50">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp size={18} className="text-secondary" />
                        <h3 className="font-black uppercase tracking-widest text-[10px]">Hot in {category}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {TRENDING_TAGS.map((tag) => (
                            <button 
                                key={tag} 
                                className="px-4 py-2 bg-card border border-border rounded-xl text-[10px] font-bold hover:border-primary transition-all"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </section>
            </div>

            {/* --- Central Feed --- */}
            <div className="order-2 lg:order-1 lg:col-span-7 space-y-6">
                <FeedCard 
                    author="CineBuff_Raj" 
                    location="PVR Mumbai" 
                    likes="450" 
                    type={category} 
                    content={`Absolutely amazing experience at the last ${category}! Who's coming for the next one?`} 
                    image="https://images.unsplash.com/photo-1485846234645-a62644f84728" 
                />
            </div>
        </div>
    );
}