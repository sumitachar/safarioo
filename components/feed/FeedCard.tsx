"use client"
import { Heart, MessageCircle, Share2, MoreHorizontal, MapPin } from "lucide-react";

interface FeedCardProps {
  author: string;
  location: string;
  content: string;
  image?: string;
  likes: string;
  type: string;
}

export default function FeedCard({ author, location, content, image, likes, type }: FeedCardProps) {
  return (
    <div className="bg-card border border-border rounded-[2rem] overflow-hidden shadow-sm transition-all hover:shadow-md">
      <div className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
            {author[0].toUpperCase()}
          </div>
          <div>
            <p className="font-black text-sm italic">@{author.toLowerCase()}</p>
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
              <MapPin size={10} /> {location}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-[10px] font-black px-2 py-1 bg-muted rounded-md uppercase">{type}</span>
           <MoreHorizontal size={18} className="text-muted-foreground" />
        </div>
      </div>

      {image && (
        <div className="relative aspect-square md:aspect-video bg-muted border-y border-border/50">
          <img src={image} alt="Post content" className="object-cover w-full h-full" />
        </div>
      )}

      <div className="p-5 space-y-4">
        <div className="flex items-center gap-5">
          <button className="flex items-center gap-1.5 hover:text-red-500 transition-colors group">
            <Heart size={22} /> <span className="text-xs font-black">{likes}</span>
          </button>
          <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <MessageCircle size={22} /> <span className="text-xs font-black">Reply</span>
          </button>
          <Share2 size={22} className="ml-auto text-muted-foreground hover:text-foreground cursor-pointer" />
        </div>
        <p className="text-sm leading-relaxed text-foreground/90">
          <span className="font-black mr-2 italic">@{author.toLowerCase()}</span>
          {content}
        </p>
      </div>
    </div>
  );
}