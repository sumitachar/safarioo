"use client"
import FeedCard from "./FeedCard";
import TripCard from "../TripCard";
import Link from "next/link";
import { Coffee, ArrowRight, TrendingUp } from "lucide-react";

// ১. TypeScript Interface
interface HangoutFeedProps {
    onJoin: (squad: any) => void;
}

export default function HangoutFeed({ onJoin }: HangoutFeedProps) {
    const TRENDING_TAGS = ["#CoffeeMeet", "#BoardGames", "#CyberHub", "#EveningWalk", "#PetLovers"];

    const HANGOUT_SQUADS = [
        { id: "h1", destination: "Weekend Board Games", date: "Sat, 5 PM", members: 3, maxMembers: 6, price: "Shared", author: "Aman", category: "Hangout", title: "Weekend Board Games" },
        { id: "h2", destination: "Sunday Morning Cycle", date: "Sun, 6 AM", members: 8, maxMembers: 15, price: "Free", author: "CyclingClub", category: "Hangout", title: "Sunday Morning Cycle" }
    ];

    return (
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
            {/* --- Sidebar (Mobile: Top | Desktop: Right) --- */}
            <div className="order-1 lg:order-2 lg:col-span-5 space-y-8 lg:sticky lg:top-40 h-fit">
                <div className="space-y-4">
                    <h3 className="text-lg font-black italic flex items-center gap-2">
                        Join a Meetup <Coffee size={20} className="text-green-500" />
                    </h3>
                    
                    <div className="flex lg:flex-col gap-4 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
                        {HANGOUT_SQUADS.map((squad) => (
                            <div key={squad.id} className="min-w-[300px] lg:min-w-full">
                                {/* ২. অতিরিক্ত বাটন সরিয়ে পুরো কার্ডকে ক্লিকেবল করা হয়েছে */}
                                <div 
                                    onClick={() => onJoin(squad)} 
                                    className="cursor-pointer transition-all active:scale-95 hover:brightness-95"
                                >
                                    <TripCard {...squad} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <Link href="/trips" className="group flex items-center justify-center gap-3 px-8 py-4 bg-card border-2 border-border rounded-[2rem] font-black hover:border-primary transition-all shadow-sm">
                    Explore All Hangouts <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </Link>

                <section className="pt-6 border-t border-border/50">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp size={18} className="text-secondary" />
                        <h3 className="font-black uppercase tracking-widest text-[10px]">Trending Meetups</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {TRENDING_TAGS.map((tag) => (
                            <button key={tag} className="px-4 py-2 bg-card border border-border rounded-xl text-[10px] font-bold hover:border-primary transition-all active:scale-95">{tag}</button>
                        ))}
                    </div>
                </section>
            </div>

            {/* --- Central Feed --- */}
            <div className="order-2 lg:order-1 lg:col-span-7 space-y-6">
                <FeedCard 
                    author="Rahul_V" 
                    location="Blue Tokai, Delhi" 
                    likes="120" 
                    type="Cafe" 
                    content="Met some amazing people for board games! ☕" 
                    image="https://images.unsplash.com/photo-1554118811-1e0d58224f24" 
                />
            </div>
        </div>
    );
}