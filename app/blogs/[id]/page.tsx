"use client"
import { Heart, MessageCircle, Share2, Bookmark, Calendar, User, ArrowLeft, Send } from "lucide-react";
import Link from "next/link";

export default function BlogDetails() {
  return (
    <div className="min-h-screen bg-background">
      {/* 1. Progress Bar (Optional Visual) */}
      <div className="fixed top-[64px] left-0 h-1 bg-primary z-50 w-1/3"></div>

      {/* 2. Navigation & Hero Header */}
      <div className="max-w-4xl mx-auto px-6 pt-10 pb-6">
        <Link href="/blogs" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft size={18} /> Back to Stories
        </Link>
        
        <div className="space-y-6">
          <span className="bg-secondary/10 text-secondary text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
            Sanatani Heritage
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-foreground">
            Spiritual Journey to Kedarnath: Beyond the Mountains
          </h1>
          
          <div className="flex items-center justify-between py-6 border-y border-border/50">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                <User size={24} className="text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground">Arjun Sharma</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar size={14} /> Oct 24, 2025 • 8 min read
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2.5 rounded-xl bg-card border border-border hover:text-secondary transition-colors">
                <Bookmark size={20} />
              </button>
              <button className="p-2.5 rounded-xl bg-card border border-border hover:text-primary transition-colors">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Hero Image */}
      <div className="max-w-6xl mx-auto px-0 md:px-6 mb-12">
        <div className="relative aspect-[21/9] overflow-hidden md:rounded-[2.5rem] shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2000&auto=format&fit=crop" 
            alt="Kedarnath" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 4. Blog Content */}
      <article className="max-w-3xl mx-auto px-6">
        <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-8">
          <p className="text-xl text-foreground font-medium leading-relaxed italic border-l-4 border-secondary pl-6 py-2">
            "The air at 11,000 feet doesn't just fill your lungs; it fills your soul. Standing before the ancient stones of Kedarnath, time seems to stop."
          </p>

          <p>
            The journey started from Gauri Kund. As I began the 16km trek, the chants of "Jai Bhole" echoed through the valley. This wasn't just a physical challenge; it was a mental cleansing. The path is steep, but the energy of the thousands of pilgrims around you makes every step feel lighter.
          </p>

          <h2 className="text-3xl font-black text-foreground pt-4">The Architecture of Faith</h2>
          <p>
            Built with massive stone slabs on a rectangular platform, the temple has stood the test of time and nature. How our ancestors carried these heavy stones to this altitude remains a marvel of ancient Indian engineering. The spiritual aura is intensified by the Mandakini river flowing nearby and the majestic Kedar Dome peak in the backdrop.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-10">
            <img src="https://images.unsplash.com/photo-1588096383061-5ccac4b00516?q=80&w=800" className="rounded-2xl h-64 w-full object-cover" />
            <img src="https://images.unsplash.com/photo-1621217684033-90d56c02604e?q=80&w=800" className="rounded-2xl h-64 w-full object-cover" />
          </div>

          <p>
            Reaching the temple during the evening Aarti is an experience I cannot put into words. The vibration of the bells and the cold mountain breeze create a divine atmosphere that everyone must experience at least once in their lifetime.
          </p>
        </div>

        {/* 5. Interaction Bar */}
        <div className="flex items-center gap-6 py-10 mt-10 border-t border-border">
          <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-secondary/10 text-secondary font-black hover:bg-secondary/20 transition-all">
            <Heart size={20} className="fill-secondary" /> 1.2k Likes
          </button>
          <div className="flex items-center gap-2 text-muted-foreground font-bold">
            <MessageCircle size={20} /> 45 Comments
          </div>
        </div>

        {/* 6. Comment Section */}
        <section className="pb-20 space-y-8">
          <h3 className="text-2xl font-black">Discussion</h3>
          
          {/* Add Comment */}
          <div className="flex gap-4 p-6 bg-card rounded-3xl border border-border">
            <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
              <User size={20} className="text-primary" />
            </div>
            <div className="w-full relative">
              <textarea 
                placeholder="Share your thoughts or ask a question..." 
                className="w-full bg-background border-border rounded-2xl p-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none resize-none min-h-[100px]"
              />
              <button className="absolute bottom-3 right-3 p-2 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity">
                <Send size={18} />
              </button>
            </div>
          </div>

          {/* Sample Comment */}
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="h-10 w-10 shrink-0 rounded-full bg-secondary/20 flex items-center justify-center">
                <User size={20} className="text-secondary" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-sm">Rahul Verma</p>
                  <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">2 Days Ago</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed bg-muted/30 p-4 rounded-2xl rounded-tl-none">
                  This is beautiful! I'm planning to go this summer with my squad. Any tips on which agencies are best for the helicopter service?
                </p>
              </div>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}