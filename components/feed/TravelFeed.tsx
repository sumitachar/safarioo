"use client"
import TripCard from "../TripCard";
import FeedCard from "./FeedCard";
import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";

interface TravelFeedProps {
    onJoin: (squad: any) => void;
}

export default function TravelFeed({ onJoin }: TravelFeedProps) {
    const TRENDING_TAGS = ["#Kedarnath", "#ManaliTrek", "#VarkalaCliff", "#SoloTravel", "#Himalayas"];

    const TRAVEL_SQUADS = [
        { id: "t1", destination: "Manali Winter Camp", date: "Jan 25", members: 3, maxMembers: 8, price: "₹8,500", author: "Vikram", category: "Travel", title: "Manali Winter Camp" },
        { id: "t2", destination: "Gokarna Beach Trek", date: "Feb 02", members: 6, maxMembers: 12, price: "₹4,200", author: "Ananya", category: "Travel", title: "Gokarna Beach Trek" }
    ];

    return (
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
            <div className="order-1 lg:order-2 lg:col-span-5 space-y-8 lg:sticky lg:top-40 h-fit">
                <div className="space-y-4">
                    <h3 className="text-lg font-black italic flex items-center gap-2">Upcoming Expeditions 🚀</h3>
                    <div className="flex lg:flex-col gap-4 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
                        {TRAVEL_SQUADS.map((squad) => (
                            <div key={squad.id} className="min-w-[300px] lg:min-w-full">
                                {/* অতিরিক্ত বাটনটি সরিয়ে শুধু TripCard রাখা হলো */}
                                {/* এখানে onClick পাস করা হয়েছে যাতে TripCard এর ওপর ক্লিক করলে মডাল খোলে */}
                                <div onClick={() => onJoin(squad)} className="cursor-pointer transition-transform active:scale-95">
                                    <TripCard {...squad} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <Link href="/trips" className="group flex items-center justify-center gap-3 px-8 py-4 bg-card border-2 border-border rounded-[2rem] font-black hover:border-primary hover:text-primary transition-all shadow-sm">
                    Explore All Travel Squads
                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </Link>

                <section className="pt-8 border-t border-border/50">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp size={20} className="text-secondary" />
                        <h3 className="font-black uppercase tracking-widest text-[10px] md:text-xs">Popular in Travel</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {TRENDING_TAGS.map((tag) => (
                            <button key={tag} className="px-4 py-2 bg-card border border-border rounded-xl text-[10px] font-bold hover:border-primary transition-all uppercase">{tag}</button>
                        ))}
                    </div>
                </section>
            </div>

            <div className="order-2 lg:order-1 lg:col-span-7 space-y-6">
                <FeedCard
                    author="Arjun_Vedic" location="Kedarnath" likes="1.4k" type="Trek"
                    content="The spiritual energy at 11,000ft is unmatched. Highly recommend the morning aarti!"
                    image="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23"
                />
            </div>
        </div>
    );
}