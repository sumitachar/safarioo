"use client"
import { useState } from "react";
import BlogCard from "@/components/BlogCard";
import { Search, SlidersHorizontal, Map, ArrowRight, Sparkles } from "lucide-react";

const CATEGORIES = ["All", "Mountain", "Beach", "Heritage", "Forest", "Solo"];

// ডামি ডেটা লুপ করার জন্য
const BLOG_POSTS = [
  {
    id: "kedarnath-1",
    title: "Spiritual Journey to Kedarnath: A Soulful Experience",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1000&auto=format&fit=crop",
    likes: 450,
    comments: 32,
    category: "Heritage",
    author: "SanataniTraveler"
  },
  {
    id: "meghalaya-2",
    title: "Exploring the Hidden Caves of Meghalaya",
    image: "https://images.unsplash.com/photo-1503756234508-e32369269deb?q=80&w=1000&auto=format&fit=crop",
    likes: 210,
    comments: 18,
    category: "Forest",
    author: "WildSpirit"
  },
  {
    id: "jaisalmer-3",
    title: "The Golden Sunset of Jaisalmer Desert",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1000&auto=format&fit=crop",
    likes: 890,
    comments: 105,
    category: "Adventure",
    author: "DesertKing"
  },
  {
    id: "hampi-4",
    title: "Architecture of Hampi: Pride of India",
    image: "https://images.unsplash.com/photo-1600100397618-b50069904e9c?q=80&w=1000&auto=format&fit=crop",
    likes: 1200,
    comments: 240,
    category: "Heritage",
    author: "HistoryBuff"
  },
  {
    id: "kerala-5",
    title: "Serene Backwaters: A Week in Alleppey",
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1000&auto=format&fit=crop",
    likes: 670,
    comments: 45,
    category: "Beach",
    author: "WaterBaby"
  },
  {
    id: "leh-6",
    title: "Solo Bike Trip to Leh-Ladakh: Ultimate Guide",
    image: "https://images.unsplash.com/photo-1581791534721-e599344293ad?q=80&w=1000&auto=format&fit=crop",
    likes: 2300,
    comments: 512,
    category: "Solo",
    author: "RiderVibe"
  }
];

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* --- Header Section --- */}
      <header className="relative py-20 px-6 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-primary/10 via-transparent to-transparent -z-10" />
        
        <div className="max-w-7xl mx-auto space-y-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-xs font-black uppercase tracking-widest animate-bounce">
            <Sparkles size={14} /> The Safarioo Journal
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
              Travel <span className="text-primary">Stories</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-medium leading-relaxed">
              Real journeys by real people. Discover Bharat through the eyes of our Sanatani explorer community.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-0 bg-primary/20 blur-2xl group-focus-within:bg-primary/30 transition-all rounded-full" />
            <div className="relative flex items-center bg-card border border-border rounded-[2rem] p-2 shadow-xl">
              <div className="pl-4 text-muted-foreground">
                <Search size={22} />
              </div>
              <input 
                type="text" 
                placeholder="Search destinations, stories, or squads..." 
                className="w-full bg-transparent px-4 py-3 outline-none font-medium text-foreground placeholder:text-muted-foreground/60"
              />
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-[1.5rem] font-bold hover:opacity-90 transition-all">
                Search
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* --- Filter & Listing Section --- */}
      <main className="max-w-7xl mx-auto px-6">
        
        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 bg-card/50 backdrop-blur-md p-4 rounded-[2rem] border border-border/50 sticky top-20 z-40">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-2xl text-sm font-black transition-all whitespace-nowrap ${
                  activeCategory === cat 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" 
                  : "hover:bg-muted text-muted-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-background border border-border rounded-2xl text-sm font-black hover:border-primary transition-all">
            <SlidersHorizontal size={18} /> Filters
          </button>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {BLOG_POSTS.map((post) => (
            <BlogCard 
              key={post.id}
              id={post.id}
              title={post.title}
              image={post.image}
              likes={post.likes}
              comments={post.comments}
              category={post.category}
              author={post.author}
            />
          ))}
        </div>

        {/* --- Load More Section --- */}
        <div className="mt-24 text-center space-y-6">
          <div className="flex flex-col items-center justify-center">
             <button className="group relative px-12 py-5 bg-foreground text-background font-black rounded-[2rem] hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl">
                <span className="flex items-center gap-3">
                  Load More Stories <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </span>
             </button>
             <div className="mt-6 flex items-center gap-4">
                <div className="h-1 w-24 bg-border rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-primary" />
                </div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Showing 6 of 148 Stories
                </p>
                <div className="h-1 w-24 bg-border rounded-full overflow-hidden">
                   <div className="h-full w-0 bg-primary" />
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}