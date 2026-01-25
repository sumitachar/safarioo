import { X, Image as ImageIcon, Send } from "lucide-react";

export const StoryForm = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <div className="w-full max-w-lg bg-card border border-border rounded-[2.5rem] p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black uppercase italic italic tracking-tighter">Create Story</h3>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors"><X size={20}/></button>
        </div>
        <textarea 
          placeholder="Where did you travel? Share your experience..."
          className="w-full h-32 p-4 bg-muted/30 rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none resize-none font-medium mb-4"
        />
        <div className="flex gap-4 mb-6">
          <button className="flex items-center gap-2 px-4 py-3 bg-muted rounded-xl font-bold text-xs">
            <ImageIcon size={16}/> Add Photo
          </button>
        </div>
        <button className="w-full py-4 bg-primary text-white rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2">
          <Send size={16}/> Post Story
        </button>
      </div>
    </div>
  );
};