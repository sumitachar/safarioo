"use client"
import { useState, useEffect } from "react";
import { 
  Calendar, Users, MapPin, Edit3, Save, Plus, Trash2, 
  Map as MapIcon, Image as ImageIcon, Camera, ArrowLeft,
  ChevronRight, ListChecks, MessageSquare, PieChart, Globe
} from "lucide-react";
import Link from "next/link";

export default function ManageTourDashboard({ params }: { params: { id: string } }) {
  const [activeSection, setActiveSection] = useState<'details' | 'itinerary' | 'bookings'>('details');
  const [isEditing, setIsEditing] = useState(false);
  const [tour, setTour] = useState({
    title: "Char Dham Yatra",
    location: "Uttarakhand, India",
    price: "25000",
    maxSquad: "15",
    description: "Full spiritual circuit including VIP Darshans and luxury stays.",
    coordinates: "30.0668° N, 79.0193° E"
  });

  const handleSave = () => {
    setIsEditing(false);
    // Logic to update DB via API
  };

  return (
    <div className="min-h-screen bg-background">
      {/* --- Floating Action Header --- */}
      <div className="sticky top-0 z-[100] bg-background/80 backdrop-blur-xl border-b border-border px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/my-squads" className="p-2 hover:bg-muted rounded-full transition-all">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h2 className="text-sm font-black uppercase italic tracking-tighter leading-none">{tour.title}</h2>
              <p className="text-[10px] font-bold text-primary uppercase tracking-widest mt-1">Tour ID: {params.id}</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 bg-foreground text-background px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                <Edit3 size={14}/> Edit Tour
              </button>
            ) : (
              <button onClick={handleSave} className="flex items-center gap-2 bg-green-500 text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-green-500/20 transition-all">
                <Save size={14}/> Update Now
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* --- Left Sidebar: Navigation & Quick Stats --- */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-card border border-border rounded-[2.5rem] p-6 space-y-2 shadow-sm">
              <NavButton active={activeSection === 'details'} onClick={() => setActiveSection('details')} icon={<Globe size={18}/>} label="General Info" />
              <NavButton active={activeSection === 'itinerary'} onClick={() => setActiveSection('itinerary')} icon={<ListChecks size={18}/>} label="Itinerary Map" />
              <NavButton active={activeSection === 'bookings'} onClick={() => setActiveSection('bookings')} icon={<PieChart size={18}/>} label="Bookings & Revenue" />
            </div>

            <div className="bg-primary p-8 rounded-[2.5rem] text-white space-y-4">
               <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Quick Action</p>
               <h3 className="text-xl font-black italic uppercase leading-none">Broadcast to All Joiners</h3>
               <button className="w-full py-3 bg-white/20 backdrop-blur-md rounded-xl font-black text-[10px] uppercase hover:bg-white hover:text-primary transition-all flex items-center justify-center gap-2">
                 <MessageSquare size={14}/> Open Chat Room
               </button>
            </div>
          </div>

          {/* --- Right Main Content: Dynamic Area --- */}
          <div className="lg:col-span-9 space-y-8">
            
            {activeSection === 'details' && (
              <div className="animate-in slide-in-from-right-4 duration-500 space-y-8">
                {/* 1. Basic Details Form */}
                <div className="bg-card border border-border rounded-[3rem] p-8 md:p-12 space-y-8 shadow-xl">
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter flex items-center gap-3">
                    <InfoIcon /> General Content
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Tour Name" value={tour.title} isEditing={isEditing} />
                    <InputField label="Starting Location" value={tour.location} isEditing={isEditing} />
                    <InputField label="Base Price (INR)" value={tour.price} isEditing={isEditing} />
                    <InputField label="Max Participants" value={tour.maxSquad} isEditing={isEditing} />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-60 ml-2">Deep Description</label>
                    {isEditing ? (
                      <textarea className="w-full bg-muted/50 border-2 border-border rounded-2xl p-4 font-bold outline-none focus:border-primary" rows={4} value={tour.description} />
                    ) : (
                      <p className="p-4 bg-muted/20 rounded-2xl font-medium text-muted-foreground italic leading-relaxed">"{tour.description}"</p>
                    )}
                  </div>
                </div>

                {/* 2. Media Manager */}
                <div className="bg-card border border-border rounded-[3rem] p-8 md:p-12 space-y-6 shadow-xl">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter flex items-center gap-3">
                      <ImageIcon className="text-secondary" /> Gallery Feed
                    </h3>
                    <button className="p-3 bg-muted rounded-full hover:bg-primary hover:text-white transition-all">
                      <Plus size={20}/>
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="group relative aspect-square bg-muted rounded-2xl overflow-hidden border border-border">
                        <img src={`https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=300`} className="w-full h-full object-cover" />
                        <button className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={12}/></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'itinerary' && (
              <div className="animate-in slide-in-from-right-4 duration-500 space-y-8">
                {/* Visual Route Map */}
                <div className="bg-card border border-border rounded-[3rem] overflow-hidden shadow-xl">
                  <div className="p-8 border-b border-border bg-muted/20 flex justify-between items-center">
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter flex items-center gap-3"><MapIcon className="text-primary"/> Route Preview</h3>
                    <button className="px-4 py-2 bg-foreground text-background rounded-xl text-[10px] font-black uppercase">Update Pins</button>
                  </div>
                  <div className="h-[450px] bg-muted relative">
                    {/* Placeholder for Map. Use Leaflet or Google Maps here */}
                    <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/79.0,30.0,6,0/1000x600?access_token=YOUR_MAPBOX_TOKEN')] bg-cover bg-center grayscale opacity-50" />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="p-6 bg-background/90 backdrop-blur-md rounded-[2rem] border-2 border-primary/20 text-center shadow-2xl">
                          <MapIcon size={40} className="mx-auto text-primary mb-3 animate-pulse" />
                          <p className="text-xs font-black uppercase tracking-widest italic">Live Map Interface</p>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase mt-1">Pins: Haridwar → Kedarnath → Badrinath</p>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'bookings' && (
               <div className="bg-card border border-border rounded-[3rem] p-12 text-center shadow-xl animate-in zoom-in-95">
                  <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users size={40} />
                  </div>
                  <h3 className="text-4xl font-black italic uppercase tracking-tighter">124 Bookings</h3>
                  <p className="text-muted-foreground font-bold uppercase tracking-widest text-[10px] mt-2">Revenue Generated: ₹31,00,000</p>
                  <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-muted/30 rounded-3xl border border-border">
                       <p className="text-xs font-black uppercase opacity-60">Pending</p>
                       <p className="text-2xl font-black mt-1">12</p>
                    </div>
                    <div className="p-6 bg-muted/30 rounded-3xl border border-border">
                       <p className="text-xs font-black uppercase opacity-60">Confirmed</p>
                       <p className="text-2xl font-black mt-1">112</p>
                    </div>
                    <div className="p-6 bg-muted/30 rounded-3xl border border-border">
                       <p className="text-xs font-black uppercase opacity-60">Refunds</p>
                       <p className="text-2xl font-black mt-1">0</p>
                    </div>
                  </div>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Internal Helper Components ---

function NavButton({ active, label, icon, onClick }: any) {
  return (
    <button onClick={onClick} className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all ${active ? 'bg-foreground text-background shadow-lg translate-x-2' : 'hover:bg-muted text-muted-foreground'}`}>
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
      </div>
      <ChevronRight size={14} className={active ? 'opacity-100' : 'opacity-0'} />
    </button>
  );
}

function InputField({ label, value, isEditing }: any) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black uppercase tracking-widest opacity-60 ml-2">{label}</label>
      {isEditing ? (
        <input className="w-full bg-muted/50 border-2 border-border rounded-xl px-4 py-3 font-bold text-sm outline-none focus:border-primary" defaultValue={value} />
      ) : (
        <div className="px-4 py-3 bg-muted/20 rounded-xl font-bold text-sm border border-transparent italic">{value}</div>
      )}
    </div>
  );
}

function InfoIcon() {
  return (
    <div className="p-2 bg-primary/10 rounded-lg">
      <Globe className="text-primary" size={20} />
    </div>
  );
}