"use client";
import { useState, useRef, useEffect } from "react";
import { X, Trash2, Plus } from "lucide-react";

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  // এখানে আমরা File এবং String (পুরনো URL) দুইটাই গ্রহণ করবো
  onSave: (files: File[]) => void;
  existingImages: string[];
}

export default function ImageUploadModal({ isOpen, onClose, onSave, existingImages }: ImageUploadModalProps) {
  // শুধুমাত্র নতুন সিলেক্ট করা ফাইলগুলো রাখার জন্য
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  // প্রিভিউ দেখানোর জন্য (নতুন ফাইলগুলোর অবজেক্ট URL)
  const [previews, setPreviews] = useState<string[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // মোডাল বন্ধ হলে মেমরি ক্লিনআপ
  useEffect(() => {
    if (!isOpen) {
      previews.forEach(url => URL.revokeObjectURL(url));
      setPreviews([]);
      setSelectedFiles([]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // নতুন ফাইলগুলো আগের ফাইলের সাথে যোগ করা
    setSelectedFiles((prev) => [...prev, ...files]);

    // নতুন প্রিভিউ URL তৈরি করা
    const newImageUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newImageUrls]);
  };

  // নতুন আপলোড করা ছবি রিমুভ করার ফাংশন
  const removeNewImage = (index: number) => {
    URL.revokeObjectURL(previews[index]); // মেমরি সেভ করতে
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-xl bg-card border border-border rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black uppercase italic tracking-tighter">Mission Gallery</h2>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Update squad visuals</p>
          </div>
          <button onClick={onClose} className="p-2 bg-muted rounded-full hover:bg-border transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto no-scrollbar">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            
            {/* ১. অলরেডি সার্ভারে থাকা ছবি (এগুলো ডিলিট করতে আলাদা API কল লাগে, তাই বর্তমানে রিড-অনলি) */}
            {existingImages.map((src, index) => (
              <div key={`existing-${index}`} className="relative aspect-square rounded-2xl overflow-hidden border border-border opacity-60">
                <img 
                  src={src.startsWith('http') ? src : `https://safariooapi.sumit-achar.site/${src}`} 
                  className="w-full h-full object-cover grayscale-[0.5]" 
                  alt="Existing" 
                />
                <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-md text-[7px] font-black text-white px-2 py-1 rounded-md uppercase">
                  Existing
                </div>
              </div>
            ))}

            {/* ২. নতুন সিলেক্ট করা ছবি (এগুলো ডিলিট বাটনসহ ফিরে এসেছে) */}
            {previews.map((src, index) => (
              <div key={`new-${index}`} className="relative aspect-square rounded-2xl overflow-hidden group border-2 border-primary/50">
                <img src={src} className="w-full h-full object-cover" alt="New preview" />
                
                {/* ডিলিট বাটন */}
                <button 
                  onClick={() => removeNewImage(index)}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-100 group-hover:opacity-100 transition-opacity shadow-lg z-10"
                >
                  <Trash2 size={14} />
                </button>

                <div className="absolute bottom-2 left-2 bg-primary text-[8px] font-black text-white px-2 py-1 rounded-md uppercase">
                  Pending
                </div>
              </div>
            ))}

            {/* ৩. আপলোড বাটন */}
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 transition-all flex flex-col items-center justify-center gap-2 group"
            >
              <div className="p-3 bg-primary/20 rounded-full text-primary group-hover:scale-110 transition-transform">
                <Plus size={24} />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-primary">Add Photo</span>
            </button>
          </div>

          <input type="file" ref={fileInputRef} multiple hidden accept="image/*" onChange={handleFileChange} />
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-muted/20 flex gap-3">
          <button onClick={onClose} className="flex-1 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest border border-border hover:bg-muted transition-all">
            Cancel
          </button>
          <button 
            onClick={() => {
              onSave(selectedFiles);
              onClose();
            }}
            disabled={selectedFiles.length === 0}
            className="flex-[2] py-4 bg-primary text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
          >
            Save {selectedFiles.length > 0 ? `(${selectedFiles.length})` : ""} New Assets
          </button>
        </div>
      </div>
    </div>
  );
}