import { X, Send } from "lucide-react";

export const MessageModal = ({ userName, onClose }: { userName: string, onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <div className="w-full max-w-md bg-card border border-border rounded-[2.5rem] p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-black uppercase italic tracking-tighter">Message</h3>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">To: {userName}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors"><X size={20}/></button>
        </div>
        <textarea 
          placeholder="Write your message..."
          className="w-full h-40 p-4 bg-muted/30 rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none resize-none font-medium mb-4"
        />
        <button className="w-full py-4 bg-foreground text-background dark:bg-white dark:text-black rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2">
          <Send size={16}/> Send Message
        </button>
      </div>
    </div>
  );
};