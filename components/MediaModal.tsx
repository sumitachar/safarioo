"use client"
import { useState, useEffect, useRef } from "react";
import { X, Save, Type, Upload, Image as ImageIcon, Trash2, Plus } from "lucide-react";

export default function MediaModal({ isOpen, onClose, onSave, editData }: any) {
  // ফাইলগুলোর জন্য অ্যারে স্টেট
  const [selectedFiles, setSelectedFiles] = useState<{ id: string; file: File | null; preview: string }[]>([]);
  const [caption, setCaption] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editData) {
      setCaption(editData.caption);
      // যদি পুরনো ডাটা থাকে তা প্রিভিউতে দেখানো
      setSelectedFiles([{ id: "existing", file: null, preview: editData.url }]);
    } else {
      setCaption("");
      setSelectedFiles([]);
    }
  }, [editData, isOpen]);

  // মাল্টিপল ফাইল হ্যান্ডলার
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    const newFiles = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file: file,
      preview: URL.createObjectURL(file)
    }));

    setSelectedFiles(prev => [...prev, ...newFiles]);
  };

  // নির্দিষ্ট একটি ছবি রিমুভ করা
  const removeFile = (id: string) => {
    setSelectedFiles(prev => {
      const filtered = prev.filter(item => item.id !== id);
      // মেমোরি লিক রোধ করতে URL রিভোক করা
      const removedItem = prev.find(item => item.id === id);
      if (removedItem?.preview.startsWith('blob:')) {
        URL.revokeObjectURL(removedItem.preview);
      }
      return filtered;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ files: selectedFiles, caption });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/90 backdrop-blur-xl animate-in fade-in" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-card border-2 border-border rounded-[3rem] p-8 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto no-scrollbar">
        
        <div className="flex justify-between items-center mb-8 sticky top-0 bg-card z-10 pb-2">
          <h2 className="text-2xl font-black italic uppercase tracking-tighter">
            {editData ? "Edit Media" : "Upload Multiple Media"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-all"><X size={20}/></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* --- Multi-Media Grid Area --- */}
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest ml-4 flex items-center gap-2 text-primary">
              <ImageIcon size={12}/> Media Gallery ({selectedFiles.length})
            </label>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {/* সিলেক্ট করা ছবিগুলোর লিস্ট */}
              {selectedFiles.map((item) => (
                <div key={item.id} className="relative group aspect-square rounded-[1.5rem] overflow-hidden border-2 border-border shadow-md">
                  <img src={item.preview} className="w-full h-full object-cover" alt="preview" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      type="button"
                      onClick={() => removeFile(item.id)}
                      className="p-3 bg-red-500 text-white rounded-xl transform scale-75 group-hover:scale-100 transition-transform"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Add More Button */}
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square rounded-[1.5rem] border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary/5 transition-all text-muted-foreground hover:text-primary"
              >
                <Plus size={24} />
                <span className="text-[8px] font-black uppercase tracking-tighter">Add More</span>
              </button>
            </div>

            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              multiple 
              className="hidden" 
            />
          </div>

          {/* --- Caption Area --- */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest ml-4 flex items-center gap-2">
              <Type size={12}/> Caption
            </label>
            <textarea 
              required 
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full bg-muted/50 border-2 border-border px-6 py-5 rounded-[2rem] font-bold outline-none focus:border-primary resize-none transition-all text-sm"
              placeholder="Tell your squad about these photos..." 
              rows={3}
            />
          </div>

          {/* --- Submit Button --- */}
          <button 
            type="submit" 
            disabled={selectedFiles.length === 0}
            className={`w-full py-5 rounded-[2rem] font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl ${selectedFiles.length === 0 ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'bg-foreground text-background hover:bg-primary hover:text-white'}`}
          >
            <Save size={18}/> {editData ? "Update Gallery" : `Post ${selectedFiles.length} Photos to Feed`}
          </button>
        </form>
      </div>
    </div>
  );
}