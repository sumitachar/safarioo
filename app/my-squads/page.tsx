"use client"
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Link from "next/link"; 
import CreateSquadModal from "@/components/CreateSquadModal";
import CreatePackageModal from "@/components/CreatePackageModal";
import { 
  Users, MapPin, Calendar, Plus, Lock, Building2, 
  PlusCircle, History, Star, Briefcase, UserCircle, Settings2, ArrowUpRight
} from "lucide-react";

export default function MySquadsPage() {
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState<'joined' | 'hosted' | 'agency'>('joined');
  const [isSquadModalOpen, setIsSquadModalOpen] = useState(false);
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // ডাটা সোর্স (রিয়েল অ্যাপে এগুলো API থেকে আসবে)
  const joinedSquads = [
    { id: "1", title: "Spiti Stargazing", location: "Himachal", date: "Feb 12", members: "8/12", status: "Active", image: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3" },
    { id: "2", title: "Kerala Backwaters", location: "Alleppey", date: "Mar 05", members: "4/6", status: "Active", image: "https://images.unsplash.com/photo-1593693397690-262ad908d1f6" },
  ];

  const hostedSquads = [
    { id: "101", title: "Manali Trekking", location: "Vashisht", date: "Apr 20", members: "2/10", status: "Pending", image: "https://images.unsplash.com/photo-1596230529625-7ee10f7b09b6" },
  ];

  const agencyPackages = [
    { id: "201", title: "Char Dham VIP Yatra", price: "₹45,000", bookings: 124, status: "Live", rating: 4.9, image: "https://images.unsplash.com/photo-1584810359583-96fc3448beaa" },
    { id: "202", title: "Ladakh Bike Tour", price: "₹32,500", bookings: 86, status: "Sold Out", rating: 4.8, image: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb" },
  ];

  if (!mounted) return null;
  if (!isLoggedIn) return <AccessDeniedScreen />;

  return (
    <div className="min-h-screen bg-background pb-24 overflow-x-hidden">
      
      {/* --- 1. Header (Dynamic Title based on Tab) --- */}
      <div className="bg-muted/30 pt-16 pb-20 px-4 md:px-8 border-b border-border/50 relative overflow-hidden">
        {/* Decorative Background Blob */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 w-fit rounded-full">
               <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
               <p className="text-[10px] font-black uppercase tracking-widest text-primary">Member Hub</p>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase flex items-center gap-4 leading-none">
              {activeTab === 'agency' ? "Agency Desk" : "My Hub"}
            </h1>
            <p className="text-muted-foreground font-bold text-xs uppercase tracking-[0.2em]">
              Welcome back explorer, <span className="text-foreground">@{user?.name?.split(' ')[0] || 'Traveler'}</span>
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button onClick={() => setIsSquadModalOpen(true)} className="group flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-xl active:scale-95">
              <Plus size={18} className="group-hover:rotate-90 transition-transform" /> New Squad
            </button>
            <button onClick={() => setIsPackageModalOpen(true)} className="flex items-center gap-3 bg-secondary text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-secondary/20 hover:shadow-secondary/40 transition-all active:scale-95">
              <PlusCircle size={18} /> Add Pro Package
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 -mt-10 relative z-10">
        
        {/* --- 2. Dashboard Tabs (Glassmorphism Effect) --- */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 p-2 bg-card/80 backdrop-blur-xl border-2 border-border/50 rounded-[3rem] w-full sm:w-fit shadow-2xl mb-16">
          {(['joined', 'hosted'] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-10 py-4 rounded-[2rem] text-[10px] font-black transition-all uppercase tracking-widest whitespace-nowrap ${activeTab === tab ? 'bg-foreground text-background shadow-xl scale-105' : 'text-muted-foreground hover:text-foreground'}`}>
              {tab === 'joined' ? 'Joined' : 'My Hosted'}
            </button>
          ))}
          <div className="w-[2px] bg-border/50 mx-2 self-center h-8 shrink-0" />
          <button onClick={() => setActiveTab('agency')} className={`px-10 py-4 rounded-[2rem] text-[10px] font-black transition-all uppercase tracking-widest flex items-center gap-2 whitespace-nowrap ${activeTab === 'agency' ? 'bg-secondary text-white shadow-xl scale-105' : 'text-secondary hover:bg-secondary/10'}`}>
            <Building2 size={16} /> Agency Desk
          </button>
        </div>

        {/* --- 3. Content Area --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Joined & Hosted Squads List */}
          {(activeTab === 'joined' || activeTab === 'hosted') && (
            (activeTab === 'joined' ? joinedSquads : hostedSquads).map(squad => (
              <div key={squad.id} className="group bg-card border-2 border-border/50 rounded-[3.5rem] overflow-hidden hover:border-primary transition-all flex flex-col shadow-sm hover:shadow-2xl hover:-translate-y-2 duration-500">
                <div className="relative h-64 overflow-hidden shrink-0">
                  <img src={squad.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={squad.title} />
                  <div className="absolute top-6 left-6 bg-background/95 backdrop-blur-md border border-border px-4 py-2 rounded-2xl text-[10px] font-black tracking-widest uppercase">
                    {squad.status}
                  </div>
                </div>
                <div className="p-10 flex flex-col flex-1">
                  <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-6 leading-none group-hover:text-primary transition-colors">{squad.title}</h3>
                  <div className="grid grid-cols-2 gap-y-4 text-muted-foreground text-[10px] font-black uppercase tracking-tighter mb-8">
                    <span className="flex items-center gap-2"><MapPin size={16} className="text-primary"/> {squad.location}</span>
                    <span className="flex items-center gap-2"><Calendar size={16} className="text-primary"/> {squad.date}</span>
                    <span className="flex items-center gap-2"><Users size={16} className="text-primary"/> {squad.members}</span>
                  </div>
                  
                  <Link 
                    href={`/my-squads/${squad.id}`} 
                    className="mt-auto w-full py-5 bg-muted group-hover:bg-foreground group-hover:text-background rounded-[2rem] font-black text-[11px] uppercase tracking-[0.2em] transition-all text-center flex justify-center items-center gap-2"
                  >
                    Enter Squad Hub <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            ))
          )}

          {/* Agency Management Section */}
          {activeTab === 'agency' && (
            <>
              {/* Stats & Quick Action */}
              <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                <StatCard label="Live Packages" value="02" icon={<History />} color="secondary" />
                <StatCard label="Avg Rating" value="4.8" icon={<Star />} color="primary" />
                <button onClick={() => setIsPackageModalOpen(true)} className="bg-secondary p-10 rounded-[3rem] text-white flex flex-col justify-center items-start cursor-pointer hover:shadow-2xl hover:shadow-secondary/30 transition-all group min-h-[160px]">
                  <PlusCircle size={40} className="mb-4 group-hover:rotate-90 transition-transform duration-500" />
                  <p className="text-lg font-black uppercase italic leading-tight tracking-tighter">List New <br/> Pro Package</p>
                </button>
              </div>

              {/* Agency Package Cards */}
              {agencyPackages.map(pkg => (
                <div key={pkg.id} className="col-span-full group bg-card border-2 border-border/50 rounded-[3.5rem] overflow-hidden flex flex-col md:flex-row hover:border-secondary transition-all shadow-lg hover:shadow-2xl duration-500">
                  <div className="w-full md:w-[40%] h-64 md:h-auto overflow-hidden shrink-0">
                    <img src={pkg.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={pkg.title} />
                  </div>
                  <div className="p-10 md:w-[60%] flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${pkg.status === 'Live' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>{pkg.status}</span>
                        <span className="text-3xl font-black text-secondary italic">{pkg.price}</span>
                      </div>
                      <h4 className="text-3xl font-black uppercase italic tracking-tighter leading-tight mb-4 group-hover:text-secondary transition-colors">{pkg.title}</h4>
                      <div className="flex gap-6">
                        <p className="text-[10px] font-black text-muted-foreground uppercase flex items-center gap-2">
                          Confirmed Bookings: <span className="text-foreground text-xs">{pkg.bookings}</span>
                        </p>
                        <p className="text-[10px] font-black text-muted-foreground uppercase flex items-center gap-2">
                          Rating: <span className="flex items-center text-secondary"><Star size={12} fill="currentColor" className="mr-1"/> {pkg.rating}</span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 mt-10">
                      <Link 
                        href={`/my-squads/manage-tour/${pkg.id}`}
                        className="flex-1 py-4 bg-muted hover:bg-secondary hover:text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all text-center flex items-center justify-center"
                      >
                        Manage Dashboard
                      </Link>
                      <button className="p-4 border-2 border-border rounded-2xl hover:bg-muted transition-all active:scale-90">
                        <Settings2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <CreateSquadModal isOpen={isSquadModalOpen} onClose={() => setIsSquadModalOpen(false)} />
      <CreatePackageModal isOpen={isPackageModalOpen} onClose={() => setIsPackageModalOpen(false)} />
    </div>
  );
}

// --- Helper Stat Card ---
function StatCard({ label, value, icon, color }: any) {
  const isSecondary = color === 'secondary';
  return (
    <div className={`bg-card p-10 rounded-[3rem] border-2 border-border/50 flex items-center justify-between group transition-all hover:border-primary shadow-sm hover:shadow-xl`}>
      <div className="space-y-1">
        <p className="text-[10px] font-black uppercase opacity-60 tracking-widest text-muted-foreground">{label}</p>
        <p className="text-5xl font-black italic text-foreground tracking-tighter">{value}</p>
      </div>
      <div className={`p-5 rounded-[1.5rem] group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 ${isSecondary ? 'bg-secondary text-white' : 'bg-primary text-white'}`}>
        {icon}
      </div>
    </div>
  );
}

// --- Access Denied View ---
function AccessDeniedScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] px-4 text-center">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
        <div className="relative p-10 bg-primary/10 rounded-[4rem] border-2 border-primary/20"><Lock size={64} className="text-primary" /></div>
      </div>
      <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-none mb-4">Access Restricted</h2>
      <p className="text-xs uppercase font-bold text-muted-foreground tracking-[0.3em] max-w-xs leading-loose">Authenticity required to manage your private travel hub.</p>
      <button className="mt-10 px-12 py-5 bg-foreground text-background rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] shadow-2xl hover:bg-primary hover:text-white transition-all active:scale-95">Login to Portal</button>
    </div>
  );
}