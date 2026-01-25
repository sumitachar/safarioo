"use client"
import { Heart, MessageCircle, Share2, Bookmark, ArrowRight } from "lucide-react";
import Link from "next/link";

interface BlogCardProps {
  id: string;        // এটি যোগ করা হয়েছে এরর দূর করার জন্য
  title: string;
  image: string;
  likes?: number;
  comments?: number;
  category?: string;
  author?: string;
}

export default function BlogCard({ 
  id,
  title, 
  image, 
  likes = 0, 
  comments = 0, 
  category = "Adventure",
  author = "Explorer" 
}: BlogCardProps) {
  return (
    <div className="group card overflow-hidden p-0 border-none bg-card shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
      
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        
        {/* Overlay Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-background/80 backdrop-blur-md text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
            {category}
          </span>
        </div>

        <button className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-md rounded-full text-foreground hover:text-secondary transition-colors shadow-sm z-10">
          <Bookmark size={16} />
        </button>

        {/* Bottom Fade Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Area */}
      <div className="p-5 space-y-4 flex flex-col flex-grow">
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-secondary uppercase tracking-tighter">Shared by @{author.toLowerCase()}</p>
          <h3 className="text-xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
        </div>

        {/* Social Stats */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1.5 text-muted-foreground hover:text-secondary transition-colors group/btn">
              <Heart size={18} className="group-hover/btn:fill-secondary group-hover/btn:text-secondary" />
              <span className="text-sm font-bold">{likes}</span>
            </button>
            <button className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
              <MessageCircle size={18} />
              <span className="text-sm font-bold">{comments}</span>
            </button>
          </div>
          
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Share2 size={18} />
          </button>
        </div>

        {/* Action Button - New Addition */}
        <div className="pt-2 mt-auto">
          <Link 
            href={`/blogs/${id}`} 
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary/5 text-primary text-sm font-black hover:bg-primary hover:text-white transition-all duration-300"
          >
            Read Full Story <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}