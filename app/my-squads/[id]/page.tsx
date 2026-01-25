"use client"
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Link from "next/link";
import { 
  Users, MapPin, Calendar, MessageCircle, ChevronLeft, 
  ShieldCheck, Edit3, Trash2, BadgeIndianRupee, Lock, 
  Image as ImageIcon, ClipboardList, UserCheck 
} from "lucide-react";

// Components
import PlanningTab from "@/components/squad/PlanningTab";
import EditSquadModal from "@/components/EditSquadModal";
import InfoTab from "@/components/squad/InfoTab";
import ChatSection from "@/components/squad/ChatSection";
import RequestsTab from "@/components/squad/RequestsTab";
import MediaSection from "@/components/squad/MediaSection";
import MediaModal from "@/components/MediaModal"; // Ensure this component exists

export default function SquadDetailsPage({ params }: { params: { id: string } }) {
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth) as any;
  const [activeTab, setActiveTab] = useState<'info' | 'chat' | 'requests' | 'media' | 'planning'>('info');
  const [mounted, setMounted] = useState(false);
  
  // Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  
  // Data States
  const [editingMedia, setEditingMedia] = useState<any>(null);
  const [squadMedia, setSquadMedia] = useState([
    { id: "m1", type: "image", url: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3", caption: "Starry night at Spiti", likes: 24 },
    { id: "m2", type: "image", url: "https://images.unsplash.com/photo-1596230529625-7ee10f7b09b6", caption: "Base Camp Vibes", likes: 12 }
  ]);

  useEffect(() => { setMounted(true); }, []);

  // Mock Data
  const squadDetails = {
    id: params.id,
    adminId: "user_123",
    title: params.id === "1" ? "Spiti Stargazing" : "Manali Trekking",
    location: "Himachal",
    date: "Feb 12, 2026",
    members: "8/12",
    cost: "₹5,500",
    description: "Join us for an epic experience in the heart of the mountains. Planning is key!",
    image: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3",
    requestCount: 3 
  };

  const isAdmin = user?.id === squadDetails.adminId || true;

  // --- Media Action Handlers ---
  const handleAddMedia = () => {
    setEditingMedia(null);
    setIsMediaModalOpen(true);
  };

  const handleEditMedia = (media: any) => {
    setEditingMedia(media);
    setIsMediaModalOpen(true);
  };

  const handleDeleteMedia = (id: string) => {
    if (window.confirm("Delete this memory from the feed?")) {
      setSquadMedia(prev => prev.filter(m => m.id !== id));
    }
  };

  const handleSaveMedia = (data: any) => {
    if (editingMedia) {
      setSquadMedia(prev => prev.map(m => m.id === editingMedia.id ? { ...m, ...data } : m));
    } else {
      const newEntry = { ...data, id: Date.now().toString(), likes: 0, type: "image" };
      setSquadMedia(prev => [newEntry, ...prev]);
    }
    setIsMediaModalOpen(false);
  };

  if (!mounted) return null;
  if (!isLoggedIn) return <AccessDeniedScreen />;

  return (
    <div className="min-h-screen bg-background pb-24 overflow-x-hidden">
      
      {/* 1. Hero Header */}
      <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
        <img src={squadDetails.image} className="w-full h-full object-cover shadow-inner" alt={squadDetails.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        <Link href="/my-squads" className="absolute top-6 left-6 p-3 bg-background/80 backdrop-blur-md rounded-2xl hover:bg-primary hover:text-white transition-all">
          <ChevronLeft size={20} />
        </Link>

        <div className="absolute bottom-10 left-6 md:left-12">
          <div className="flex flex-col gap-2">
            <span className="text-primary font-black uppercase text-[10px] tracking-[0.3em] bg-primary/10 w-fit px-3 py-1 rounded-lg">Official Squad</span>
            <h1 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter text-foreground leading-none">
              {squadDetails.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 -mt-6 relative z-10">
        
        {/* 2. Navigation Tabs */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 p-1.5 bg-card border-2 border-border/50 rounded-[2.5rem] w-full md:w-fit shadow-2xl mb-10">
          <TabButton active={activeTab === 'info'} label="Info" onClick={() => setActiveTab('info')} />
          <TabButton active={activeTab === 'planning'} label="Planning" icon={<ClipboardList size={14}/>} onClick={() => setActiveTab('planning')} />
          <TabButton active={activeTab === 'media'} label="Media" icon={<ImageIcon size={14} />} onClick={() => setActiveTab('media')} />
          <TabButton active={activeTab === 'chat'} label="Chat" icon={<MessageCircle size={14} />} onClick={() => setActiveTab('chat')} />
          
          {isAdmin && (
            <TabButton 
              active={activeTab === 'requests'} 
              label={`Requests (${squadDetails.requestCount})`} 
              icon={<UserCheck size={14} />} 
              onClick={() => setActiveTab('requests')}
              variant="admin"
            />
          )}
        </div>

        {/* 3. Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'info' && <InfoTab details={squadDetails} />}
            {activeTab === 'planning' && <PlanningTab squadId={params.id} type="tour" />}
            {activeTab === 'chat' && <ChatSection />}
            
            {/* Media Section with Props Fixed */}
            {activeTab === 'media' && (
              <MediaSection 
                mediaData={squadMedia}
                onAdd={handleAddMedia}
                onEdit={handleEditMedia}
                onDelete={handleDeleteMedia}
              />
            )}
            
            {activeTab === 'requests' && isAdmin && <RequestsTab />}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-[3rem] p-8 shadow-xl sticky top-6">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-primary mb-6 italic">Squad Readiness</h3>
              
              <div className="space-y-4">
                <ProgressItem label="Itinerary" value="90%" />
                <ProgressItem label="Logistics" value="40%" />
                <ProgressItem label="Members" value="75%" />
              </div>
              
              <div className="mt-10 pt-6 border-t border-border space-y-4">
                {isAdmin ? (
                  <>
                    <button onClick={() => setIsEditModalOpen(true)} className="w-full py-5 bg-foreground text-background rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all shadow-lg">
                      <Edit3 size={16} /> Edit Squad
                    </button>
                    <button className="w-full py-5 bg-muted text-red-500 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition-all">
                      <Trash2 size={16} /> Dissolve Squad
                    </button>
                  </>
                ) : (
                  <button className="w-full py-5 bg-red-500 text-white rounded-2xl font-black uppercase italic tracking-widest shadow-xl hover:bg-red-600 transition-all">
                    LEAVE SQUAD
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EditSquadModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} squadData={squadDetails as any} />
      
      <MediaModal 
        isOpen={isMediaModalOpen} 
        onClose={() => setIsMediaModalOpen(false)} 
        onSave={handleSaveMedia}
        editData={editingMedia}
      />
    </div>
  );
}

// --- Helper Components ---

function TabButton({ active, label, onClick, icon, variant }: any) {
  return (
    <button 
      onClick={onClick} 
      className={`
        px-6 md:px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 whitespace-nowrap
        ${active ? 'bg-foreground text-background shadow-lg scale-105' : 'text-muted-foreground hover:bg-muted'}
        ${variant === 'admin' && !active ? 'text-red-500/70' : ''}
      `}
    >
      {icon} {label}
    </button>
  );
}

function ProgressItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="space-y-2 mb-4">
      <div className="flex justify-between text-[9px] font-black uppercase tracking-tighter">
        <span className="text-muted-foreground">{label}</span>
        <span className="text-primary">{value}</span>
      </div>
      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary transition-all duration-1000 ease-out" style={{ width: value }} />
      </div>
    </div>
  );
}

function AccessDeniedScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
      <div className="p-8 bg-primary/10 rounded-full mb-6">
        <Lock size={48} className="text-primary" />
      </div>
      <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-none mb-4">Access Restricted</h2>
      <p className="text-muted-foreground font-medium italic mb-8">You need to be a member of this squad to view details.</p>
      <Link href="/login" className="px-10 py-5 bg-foreground text-background rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-primary transition-all">
        Login to Access
      </Link>
    </div>
  );
}