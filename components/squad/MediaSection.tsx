"use client"
import React from "react";
import { Image as ImageIcon, Plus, Star, Edit3, Trash2 } from "lucide-react";

interface MediaItem {
  id: string;
  type: string;
  url: string;
  caption: string;
  likes: number;
}

interface MediaSectionProps {
  mediaData: MediaItem[];
  onAdd: () => void;
  onEdit: (media: MediaItem) => void;
  onDelete: (id: string) => void;
}

export default function MediaSection({ mediaData, onAdd, onEdit, onDelete }: MediaSectionProps) {
  if (mediaData.length === 0) {
    return (
      <div className="space-y-6 animate-in slide-in-from-bottom-4">
        <div className="flex justify-between items-center px-4">
          <h3 className="text-xl font-black italic uppercase tracking-tighter">Squad Memories</h3>
          <button 
            onClick={onAdd}
            className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:scale-105 transition-all"
          >
            <Plus size={16} /> Add First Post
          </button>
        </div>
        <div className="bg-card border border-dashed border-border rounded-[3rem] p-20 flex flex-col items-center justify-center text-muted-foreground shadow-inner">
          <ImageIcon size={48} className="mb-4 opacity-10" />
          <p className="font-black uppercase italic text-xs tracking-[0.2em]">No media captured yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center px-4">
        <h3 className="text-xl font-black italic uppercase tracking-tighter">Squad Feed (Home)</h3>
        <button 
          onClick={onAdd}
          className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-primary/20"
        >
          <Plus size={16} /> Add Post
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {mediaData.map((media) => (
          <div 
            key={media.id} 
            className="group relative bg-card border border-border rounded-[2.5rem] overflow-hidden hover:border-primary/50 transition-all shadow-xl hover:shadow-primary/5"
          >
            {/* Image Container */}
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={media.url} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                alt={media.caption} 
              />
              
              {/* Overlays on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute top-4 right-4 flex gap-2 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <button 
                  onClick={() => onEdit(media)}
                  className="p-3 bg-background/90 backdrop-blur-md rounded-xl text-foreground hover:bg-primary hover:text-white transition-all shadow-lg"
                >
                  <Edit3 size={16} />
                </button>
                <button 
                  onClick={() => onDelete(media.id)}
                  className="p-3 bg-background/90 backdrop-blur-md rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Content Container */}
            <div className="p-6">
              <div className="flex justify-between items-start gap-4">
                <p className="text-xs font-bold text-muted-foreground uppercase leading-relaxed italic">
                  "{media.caption}"
                </p>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/5 rounded-lg border border-primary/10">
                  <Star size={12} className="text-primary" fill="currentColor" />
                  <span className="text-[10px] font-black text-primary">{media.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}