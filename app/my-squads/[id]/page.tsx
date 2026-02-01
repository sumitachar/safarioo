"use client"
import { useState, useEffect, useCallback, use } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import Link from "next/link";
import React from "react";
import {
  MapPin, Calendar, MessageCircle, ChevronLeft,
  Edit3, Trash2, Lock, Image as ImageIcon,
  ClipboardList, UserCheck, Heart, Share2,
  Send, Bookmark, MoreHorizontal, MessageSquare, ShieldCheck
} from "lucide-react";

// Components
import PlanningTab from "@/components/squad/PlanningTab";
import EditSquadModal from "@/components/EditSquadModal";
import InfoTab from "@/components/squad/InfoTab";
import ChatSection from "@/components/squad/ChatSection";
import RequestsTab from "@/components/squad/RequestsTab";
import MediaSection from "@/components/squad/MediaSection";
import MediaModal from "@/components/MediaModal";
import ImageUploadModal from "@/components/ImageUploadModal";
import { squadApi } from "@/api/squadApi";
// ফিক্সড ইমপোর্ট: সরাসরি স্লাইস থেকে টাইপ নেওয়া হয়েছে
import { updateSquad, SquadBasic as DisplaySquad } from "@/store/slices/squadsSlice";

// Membership status type
type MembershipStatus = "admin" | "member" | "pending" | "not_joined";

export default function SquadDetailsPage({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) {
  const params = use(paramsPromise);
  const squadId = params.id;

  // Reading Global Filters from Redux
  const { activeCategory } = useSelector((state: RootState) => state.squads);

  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);

  const [squad, setSquad] = useState<DisplaySquad | null>(null);
  const [membership, setMembership] = useState<MembershipStatus>("not_joined");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeTabSelector, setActiveTabSelector] = useState<
    "info" | "chat" | "requests" | "media" | "planning"
  >("info");
  const [mounted, setMounted] = useState(false);

  // Carousel logic
  const [squadImages, setSquadImages] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    if (squadImages.length === 0) return;
    setCurrentSlide((prev) => (prev === squadImages.length - 1 ? 0 : prev + 1));
  }, [squadImages.length]);

  const prevSlide = () => {
    if (squadImages.length === 0) return;
    setCurrentSlide((prev) => (prev === 0 ? squadImages.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Social states
  const [likes, setLikes] = useState(142);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Modal & Media states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [isImgUploadModalOpen, setIsImgUploadModalOpen] = useState(false);
  const [editingMedia, setEditingMedia] = useState<any>(null);
  const [squadMedia, setSquadMedia] = useState([
    {
      id: "m1",
      type: "image",
      url: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3",
      caption: "Starry night at Spiti",
      likes: 24,
    },
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch squad data
useEffect(() => {
    if (!squadId || !isLoggedIn || !mounted) return;

    let isMounted = true;

    const fetchSquad = async () => {
      setLoading(true);
      setError(null);

      try {
        /**
         * Redux slice এখন LocalStorage থেকে data লোড করে, 
         * তাই activeCategory রিফ্রেশ করলেও সঠিক ভ্যালু (Movie/Event ইত্যাদি) ধরে রাখবে।
         */
        const response = await squadApi.getSquadById(squadId, activeCategory);
        
        if (isMounted && response?.data) {
          const s = response.data;

          // ডাইনামিক ফিল্ড এক্সট্রাকশন (যাতে ভুল ক্যাটাগরিতে থাকলেও ডেটা পাওয়া যায়)
          const title = s.movie_title || s.event_title || s.hangout_title || s.squad_title || "Untitled Squad";
          const dateStr = s.movie_date || s.event_date || s.hangout_date || s.departure_date;
          const timeStr = s.movie_time || s.event_time || s.hangout_time || s.departure_time;
          const code = s.movie_code || s.event_code || s.hangout_code || s.squad_code || "N/A";

          // ডেট অবজেক্ট প্রসেসিং
          const dateObj = new Date(dateStr);
          const isFuture = !isNaN(dateObj.getTime()) && dateObj > new Date();
          
          // ইমেজ অ্যারে হ্যান্ডলিং
          const imageList = s.images && s.images.length > 0
            ? s.images.map((img: any) => typeof img === 'string' ? img : img.image)
            : [`https://picsum.photos/seed/squad-${s.id}/800/500`];

          // ডাটা ট্রান্সফর্মেশন
          const transformed: DisplaySquad = {
            id: String(s.id),
            title: title,
            location: s.location ?? "Unknown",
            date: isNaN(dateObj.getTime())
              ? "TBD"
              : dateObj.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
            time: timeStr?.slice(0, 5) ?? "TBD", // HH:mm ফরম্যাট নিশ্চিত করতে
            members: String(s.max_member ?? "0"),
            status: isFuture ? "Upcoming" : "Completed",
            images: imageList,
            cost: s.cost ?? "0",
            duration: s.duration ?? "N/A",
            gender: s.gender ?? "Any",
            ageGroup: s.age_group ?? "All",
            tags: s.tag ?? null,
            squad_code: code,
            user_id: s.user_id,
            description: s.description ?? "",
            requestCount: s.requestCount ?? 0,
          };

          // স্টেট আপডেট
          setSquad(transformed);
          setSquadImages(imageList);
          setMembership(s.user_id === user?.id ? "admin" : "not_joined");
          
          // রেডক্স স্টোর আপডেট (অন্যান্য কম্পোনেন্টের জন্য)
          dispatch(updateSquad(transformed));
          
        } else if (isMounted) {
          setError("Squad mission not found in database.");
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || "Failed to establish connection to hub.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchSquad();
    
    // মেমরি লিক রোধে ক্লিনআপ
    return () => { isMounted = false; };
    
    /**
     * Dependency array-তে activeCategory থাকা জরুরি, 
     * যাতে ইউজার ক্যাটাগরি সুইচ করলে ডাটা অটোমেটিক রি-লোড হয়।
     */
  }, [squadId, isLoggedIn, user?.id, mounted, dispatch, activeCategory]);

  // NEW: Implementation for Image Upload to Backend
  const handleImageUpload = async (files: File[]) => {
    if (!squad || files.length === 0) return;

    try {
      const formData = new FormData();
      
      // Slug mapping for backend validation: in:Travel,Event,Movie,Hangout
      let slug = activeCategory;

      formData.append("slug", slug);
      formData.append("slug_tbl_id", squad.id);
      
      files.forEach((file) => {
        formData.append("images[]", file);
      });

      const response = await squadApi.uploadSquadImages(formData);

      if (response.status) {
        // Extract new image paths from the backend response
        const newPaths = response.data.map((item: any) => item.image);
        const updatedImages = [...squadImages, ...newPaths];
        
        setSquadImages(updatedImages);
        dispatch(updateSquad({ ...squad, images: updatedImages }));
        setIsImgUploadModalOpen(false);
      }
    } catch (err: any) {
      alert(err.message || "Image upload failed");
    }
  };

  const handleSaveMedia = (data: any) => {
    if (editingMedia) {
      setSquadMedia((prev) =>
        prev.map((m) => (m.id === editingMedia.id ? { ...m, ...data } : m))
      );
    } else {
      const newEntry = { ...data, id: Date.now().toString(), likes: 0, type: "image" };
      setSquadMedia((prev) => [newEntry, ...prev]);
    }
    setIsMediaModalOpen(false);
  };

  const handleShare = async () => {
    if (!squad) return;
    if (navigator.share) {
      try {
        await navigator.share({ title: squad.title, url: window.location.href });
      } catch (err) { console.error(err); }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (!mounted) return null;
  if (!isLoggedIn) return <AccessDeniedScreen />;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground font-black uppercase tracking-widest animate-pulse">
        Initializing Mission...
      </div>
    );
  }

  if (error || !squad) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-500">
        <p className="font-black uppercase tracking-tighter text-2xl">{error || "Squad not found"}</p>
        <Link href="/my-squads" className="mt-6 text-primary underline font-bold uppercase text-xs">
          Back to My Squads
        </Link>
      </div>
    );
  }

  const isAdmin = membership === "admin";

  return (
    <div className="min-h-screen bg-background pb-24 overflow-x-hidden">
      {/* HERO SECTION */}
      <div className="relative h-[50vh] md:h-[65vh] w-full overflow-hidden group">
        <div
          className="flex h-full transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {squadImages.map((img, idx) => (
            <img 
              key={idx} 
              src={img.startsWith('http') ? img : `https://safariooapi.sumit-achar.site/${img}`} 
              className="w-full h-full object-cover shrink-0" 
              alt={`Slide ${idx}`} 
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-black/50 z-10" />

        <div className="absolute inset-0 flex items-center justify-between px-6 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button onClick={prevSlide} className="p-4 bg-black/20 backdrop-blur-xl rounded-full text-white hover:bg-primary transition-all border border-white/10">
            <ChevronLeft size={28} />
          </button>
          <button onClick={nextSlide} className="p-4 bg-black/20 backdrop-blur-xl rounded-full text-white hover:bg-primary transition-all border border-white/10">
            <ChevronLeft size={28} className="rotate-180" />
          </button>
        </div>

        <div className="absolute top-8 left-6 right-6 flex justify-between items-center z-40">
          <Link href="/my-squads" className="p-3 bg-white/10 backdrop-blur-md rounded-2xl hover:bg-white/20 text-white transition-all border border-white/10">
            <ChevronLeft size={20} />
          </Link>
          {isAdmin && (
            <button onClick={() => setIsImgUploadModalOpen(true)} className="p-3 bg-white/10 backdrop-blur-md rounded-2xl hover:bg-primary text-white transition-all border border-white/10">
              <ImageIcon size={20} />
            </button>
          )}
        </div>

        <div className="absolute bottom-12 right-6 md:right-12 z-40 flex items-center gap-3">
          <button
            onClick={() => { setIsLiked(!isLiked); setLikes((l) => (isLiked ? l - 1 : l + 1)); }}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl backdrop-blur-xl border border-white/20 transition-all ${isLiked ? "bg-red-500 text-white border-transparent scale-110 shadow-xl" : "bg-white/10 text-white hover:bg-white/20"}`}
          >
            <Heart size={20} className={isLiked ? "fill-current" : ""} />
            <span className="text-xs font-black">{likes}</span>
          </button>
          <button onClick={() => setIsBookmarked(!isBookmarked)} className={`p-3.5 rounded-2xl backdrop-blur-xl border border-white/20 transition-all ${isBookmarked ? "bg-primary text-white border-transparent" : "bg-white/10 text-white hover:bg-white/20"}`}>
            <Bookmark size={20} className={isBookmarked ? "fill-current" : ""} />
          </button>
          <button onClick={handleShare} className="p-3.5 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-2xl hover:bg-white/20 transition-all">
            <Share2 size={20} />
          </button>
        </div>

        <div className="absolute bottom-12 left-6 md:left-12 z-30 max-w-3xl">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-primary font-black uppercase text-[10px] tracking-[0.3em] bg-primary/20 backdrop-blur-md px-4 py-1.5 rounded-xl border border-primary/30">Official Squad</span>
              <span className="text-white/80 font-black uppercase text-[10px] tracking-[0.3em] bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-xl border border-white/10 flex items-center gap-2">
                <MapPin size={12} /> {squad.location}
              </span>
            </div>
            <h1 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter text-white drop-shadow-2xl leading-[0.8]">
              {squad.title}
            </h1>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {squadImages.map((_, idx) => (
            <button key={idx} onClick={() => setCurrentSlide(idx)} className={`h-1.5 rounded-full transition-all duration-500 ${currentSlide === idx ? "w-12 bg-primary" : "w-3 bg-white/30 hover:bg-white/50"}`} />
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 relative z-30">
        <div className="flex justify-center mb-16">
          <div className="flex overflow-x-auto no-scrollbar gap-2 p-2 bg-card/60 backdrop-blur-xl border border-border/50 rounded-[2.5rem] shadow-2xl">
            <TabButton active={activeTabSelector === "info"} label="Info" onClick={() => setActiveTabSelector("info")} />
            <TabButton active={activeTabSelector === "planning"} label="Planning" icon={<ClipboardList size={14} />} onClick={() => setActiveTabSelector("planning")} />
            <TabButton active={activeTabSelector === "media"} label="Media" icon={<ImageIcon size={14} />} onClick={() => setActiveTabSelector("media")} />
            <TabButton active={activeTabSelector === "chat"} label="Chat" icon={<MessageCircle size={14} />} onClick={() => setActiveTabSelector("chat")} />
            {isAdmin && <TabButton active={activeTabSelector === "requests"} label={`Requests (${squad.requestCount ?? 0})`} icon={<UserCheck size={14} />} onClick={() => setActiveTabSelector("requests")} variant="admin" />}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-12">
            {activeTabSelector === "info" && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out">
                <InfoTab details={squad} />
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="text-primary" size={24} />
                      <h3 className="text-xl font-black uppercase italic tracking-tighter">Community Thread</h3>
                    </div>
                  </div>
                  <div className="bg-card border-2 border-border/40 rounded-[3rem] p-8 shadow-sm text-center text-muted-foreground italic text-sm">
                    Connect with travelers below...
                  </div>
                </div>
              </div>
            )}

            {activeTabSelector === "planning" && <PlanningTab squadId={squadId} type="tour" />}
            {activeTabSelector === "chat" && <ChatSection />}
            {activeTabSelector === "media" && (
              <MediaSection
                mediaData={squadMedia}
                onAdd={() => setIsMediaModalOpen(true)}
                onEdit={(m) => { setEditingMedia(m); setIsMediaModalOpen(true); }}
                onDelete={(id) => setSquadMedia((prev) => prev.filter((m) => m.id !== id))}
              />
            )}
            {activeTabSelector === "requests" && isAdmin && <RequestsTab />}
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-card border-2 border-border/50 rounded-[3.5rem] p-10 shadow-2xl sticky top-10">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-xs font-black uppercase tracking-[0.25em] text-primary italic">Squad Status</h3>
                <ShieldCheck size={20} className="text-primary" />
              </div>

              <div className="space-y-8">
                <ProgressItem label="Itinerary Completion" value="90%" />
                <ProgressItem label="Logistics Secured" value="40%" />
                <ProgressItem label="Team Slots Filled" value="75%" />
              </div>

              <div className="mt-12 pt-10 border-t-2 border-border/30 space-y-4">
                {isAdmin ? (
                  <div className="grid grid-cols-1 gap-3">
                    <button onClick={() => setIsEditModalOpen(true)} className="group relative w-full py-5 bg-foreground text-background rounded-2xl overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-2xl">
                      <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      <div className="relative z-10 flex items-center justify-center gap-3">
                        <Edit3 size={18} className="group-hover:rotate-12 transition-transform" />
                        <span className="font-black uppercase italic text-xs tracking-[0.15em]">Manage Squad</span>
                      </div>
                    </button>
                    <button className="w-full py-4 bg-transparent border-2 border-red-500/20 text-red-500/60 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-3 transition-all hover:bg-red-500 hover:text-white">
                      <Trash2 size={16} /> Dissolve Mission
                    </button>
                  </div>
                ) : (
                  <button className="w-full py-6 bg-primary text-white rounded-4xl font-black uppercase italic tracking-widest shadow-xl">
                    Apply to Join Squad
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditSquadModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} squadData={squad} />
      <MediaModal isOpen={isMediaModalOpen} onClose={() => setIsMediaModalOpen(false)} onSave={handleSaveMedia} editData={editingMedia} />
      
      {/* Updated Image Upload Modal to handle File[] onSave */}
      <ImageUploadModal 
        isOpen={isImgUploadModalOpen} 
        onClose={() => setIsImgUploadModalOpen(false)} 
        existingImages={squadImages} 
        onSave={handleImageUpload} 
      />
    </div>
  );
}

// Helpers
function TabButton({ active, label, onClick, icon, variant }: any) {
  return (
    <button onClick={onClick} className={`px-8 py-4 rounded-3xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center gap-2 whitespace-nowrap ${active ? "bg-foreground text-background shadow-xl scale-105" : "text-muted-foreground hover:bg-muted/80"} ${variant === "admin" && !active ? "text-red-500 hover:text-red-400" : ""}`}>
      {icon} {label}
    </button>
  );
}

function ProgressItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between text-[10px] font-black uppercase tracking-wider">
        <span className="text-muted-foreground">{label}</span>
        <span className="text-primary">{value}</span>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" style={{ width: value }} />
      </div>
    </div>
  );
}

function AccessDeniedScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
      <Lock size={64} className="text-primary mb-8 animate-bounce" />
      <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-6">Access Restricted</h2>
      <Link href="/login" className="px-12 py-6 bg-foreground text-background rounded-4xl font-black uppercase text-sm tracking-[0.2em] hover:bg-primary transition-all shadow-2xl">
        Authorize Session
      </Link>
    </div>
  );
}