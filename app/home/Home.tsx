"use client"
import { useState } from "react";
import { Plane, Film, Ticket, Coffee, Search, X, Plus, Send } from "lucide-react";
import TravelFeed from "@/components/feed/TravelFeed";
import EntertainmentFeed from "@/components/feed/EntertainmentFeed";
import HangoutFeed from "@/components/feed/HangoutFeed";

export default function Home() {
    // ১. স্টেট ম্যানেজমেন্ট
    const [activeTab, setActiveTab] = useState("Travel Tour");
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [selectedSquad, setSelectedSquad] = useState<any>(null); // Join Modal এর জন্য

    const TABS = [
        { id: "Travel Tour", icon: <Plane size={18} />, color: "text-primary" },
        { id: "Movie", icon: <Film size={18} />, color: "text-secondary" },
        { id: "Event", icon: <Ticket size={18} />, color: "text-orange-500" },
        { id: "Hangout", icon: <Coffee size={18} />, color: "text-green-500" },
    ];

    return (
        <main className="min-h-screen bg-background pb-32 transition-colors duration-500">

            {/* --- ২. Mobile Search Overlay (শুধুমাত্র মোবাইলে দেখাবে) --- */}
            {isMobileSearchOpen && (
                <div className="fixed inset-0 z-[100] bg-background/98 backdrop-blur-2xl p-6 lg:hidden animate-in fade-in zoom-in duration-300">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search your next squad..."
                                className="w-full bg-muted/50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>
                        <button 
                            onClick={() => setIsMobileSearchOpen(false)} 
                            className="p-3 bg-muted rounded-2xl hover:bg-red-500/10 hover:text-red-500 transition-colors"
                        >
                            <X size={20}/>
                        </button>
                    </div>
                    
                    <div className="space-y-6">
                        <p className="text-[10px] font-black uppercase opacity-50 tracking-[0.2em] ml-2">Recent Searches</p>
                        <div className="flex flex-wrap gap-2">
                            {["Bali Trip", "Marvel Movie", "Coffee Meetup"].map(tag => (
                                <span key={tag} className="px-4 py-2 bg-muted/40 rounded-xl text-xs font-bold border border-border">#{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* --- ৩. Sticky Header --- */}
            <header className="sticky top-0 bg-background/80 backdrop-blur-xl z-40 border-b border-border shadow-sm">
                <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-4">

                    {/* Left: Mobile Branding */}
                    <div className="lg:hidden">
                        <h2 className="text-xl font-black italic uppercase tracking-tighter text-foreground">
                            Feed<span className="text-primary">.</span>
                        </h2>
                    </div>

                    {/* Center: Desktop Tabs */}
                    <div className="hidden lg:flex items-center gap-1.5 bg-muted/40 p-1.5 rounded-2xl border border-border">
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-xs transition-all duration-300 ${
                                    activeTab === tab.id 
                                    ? "bg-card text-foreground shadow-md scale-105 border border-border" 
                                    : "text-muted-foreground hover:bg-card/50 hover:text-foreground"
                                }`}
                            >
                                <span className={activeTab === tab.id ? tab.color : ""}>{tab.icon}</span>
                                {tab.id}
                            </button>
                        ))}
                    </div>

                    {/* Right: Search & Action */}
                    <div className="flex items-center gap-2 flex-1 justify-end">
                        <div className="hidden md:flex items-center relative w-full max-w-[280px] group">
                            <Search className="absolute left-4 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search squads..."
                                className="w-full bg-muted/30 border border-border rounded-2xl py-3 pl-11 pr-4 text-xs font-bold focus:ring-4 focus:ring-primary/10 transition-all"
                            />
                        </div>

                        {/* Mobile Search Trigger */}
                        <button 
                            onClick={() => setIsMobileSearchOpen(true)}
                            className="md:hidden p-3 bg-muted/50 rounded-2xl text-foreground"
                        >
                            <Search size={20} />
                        </button>

                        <button className="hidden md:flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-black text-[10px] uppercase shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                            <Plus size={16} /> Create Squad
                        </button>
                    </div>
                </div>
            </header>

            {/* --- ৪. Feed Container --- */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {/* এখানে onJoinClick পাস করা হয়েছে যাতে কার্ডে ক্লিক করলে মডাল খুলে */}
                    {activeTab === "Travel Tour" && <TravelFeed onJoin={(squad: any) => setSelectedSquad(squad)} />}
                    {(activeTab === "Movie" || activeTab === "Event") && <EntertainmentFeed category={activeTab as any} onJoin={(squad: any) => setSelectedSquad(squad)} />}
                    {activeTab === "Hangout" && <HangoutFeed onJoin={(squad: any) => setSelectedSquad(squad)} />}
                </div>
            </div>

            {/* --- ৫. Join Squad Modal (নতুন) --- */}
            {selectedSquad && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-card w-full max-w-md rounded-[3rem] p-8 border border-border shadow-2xl space-y-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-[10px] font-black uppercase text-primary tracking-widest mb-1">Request to Join</p>
                                <h3 className="text-2xl font-black uppercase italic tracking-tighter">{selectedSquad.title || "New Squad"}</h3>
                            </div>
                            <button onClick={() => setSelectedSquad(null)} className="p-2 bg-muted rounded-full hover:bg-red-500/10 hover:text-red-500 transition-all">
                                <X size={20}/>
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase opacity-60 ml-2">Your Message</label>
                            <textarea 
                                placeholder="Hey! I'd love to join this squad because..."
                                className="w-full h-32 bg-muted/30 rounded-3xl p-5 text-sm font-medium outline-none focus:ring-2 focus:ring-primary border border-transparent focus:border-primary/20 transition-all resize-none"
                            />
                        </div>

                        <button className="w-full py-5 bg-primary text-white rounded-[1.5rem] font-black text-xs uppercase shadow-xl shadow-primary/20 flex items-center justify-center gap-3 hover:opacity-90 transition-all">
                            <Send size={16} /> Send Join Request
                        </button>
                    </div>
                </div>
            )}

            {/* --- ৬. Mobile Floating Bottom Nav --- */}
            <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[420px] z-50">
                <div className="relative bg-card/90 backdrop-blur-2xl h-22 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-border flex items-center justify-around px-4">
                    {TABS.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`relative flex flex-col items-center gap-1.5 transition-all duration-500 ${isActive ? "scale-110 -translate-y-1" : "opacity-40"}`}
                            >
                                <div className={`p-3 rounded-2xl transition-all ${isActive ? "bg-primary text-white shadow-lg shadow-primary/30" : "bg-transparent text-foreground"}`}>
                                    {tab.icon}
                                </div>
                                <span className={`text-[8px] font-black uppercase tracking-tighter ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                                    {tab.id.split(' ')[0]}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}