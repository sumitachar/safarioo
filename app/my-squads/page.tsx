"use client"
import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import Link from "next/link";
import CreateSquadModal from "@/components/CreateSquadModal";
import CreatePackageModal from "@/components/CreatePackageModal";
import {
  Users, MapPin, Calendar, Plus, Lock, Building2,
  PlusCircle, History, Star, UserCircle, Settings2, ArrowUpRight,
  Clock, Tag, Target, Plane, Film, Ticket, Coffee, Loader2,
  ChevronRight, ChevronLeft, ShieldCheck, Milestone, BadgeIndianRupee
} from "lucide-react";
import { squadApi } from "@/api/squadApi";
import { setSquads, setActiveCategory, setActiveTab, SquadCategory, SquadTab, SquadBasic as DisplaySquad } from "@/store/slices/squadsSlice";

// ── Types ──
type SquadApiItem = {
  id: number;
  user_id: number;
  post_id: number;
  squad_title: string;
  location: string;
  cost: string;
  departure_date: string;
  departure_time: string;
  duration: string;
  gender: string;
  age_group: string;
  max_member: number;
  tag: string[] | null;
  squad_code: string;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
  images?: string[];
};

export default function MySquadsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);

  // Reading Global Filters from Redux
  const { activeCategory, activeTab } = useSelector((state: RootState) => state.squads);

  const [isSquadModalOpen, setIsSquadModalOpen] = useState(false);
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);

  const [displaySquads, setDisplaySquads] = useState<DisplaySquad[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const categoryOptions: { name: SquadCategory; icon: any }[] = [
    { name: "Travel", icon: <Plane size={14} /> },
    { name: "Movie", icon: <Film size={14} /> },
    { name: "Event", icon: <Ticket size={14} /> },
    { name: "Hangout", icon: <Coffee size={14} /> },
  ];


  console.log("Rendering MySquadsPage with:", { activeCategory, activeTab });

  const observer = useRef<IntersectionObserver | null>(null);
  const lastSquadElementRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  // Reset local lists when Global filters change
  useEffect(() => {
    setDisplaySquads([]);
    setPage(1);
    setHasMore(true);
    setError(null);
  }, [activeCategory, activeTab]);

  useEffect(() => {
    if (!isLoggedIn || !user?.id || activeTab === 'agency') return;

    let isMounted = true;

    const fetchSquads = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await squadApi.getSquads(activeCategory, user.id, page);

        if (!isMounted) return;

        // Handle different API structures (some return .data.data, others might just be .data)
        const apiData = response?.data?.data || response?.data || [];

        if (apiData.length === 0) {
          setHasMore(false);
        } else {
          const transformed: DisplaySquad[] = apiData.map((s: any) => {
            // 1. Resolve Category-Specific Fields
            let title = "";
            let dateStr = "";
            let timeStr = "";
            let code = "";

            switch (activeCategory) {
              case "Movie":
                title = s.movie_title;
                dateStr = s.movie_date;
                timeStr = s.movie_time;
                code = s.movie_code;
                break;
              case "Event":
                title = s.event_title;
                dateStr = s.event_date;
                timeStr = s.event_time;
                code = s.event_code;
                break;
              case "Hangout":
                title = s.hangout_title;
                dateStr = s.hangout_date;
                timeStr = s.hangout_time;
                code = s.hangout_code;
                break;
              case "Travel":
              default:
                title = s.squad_title;
                dateStr = s.departure_date;
                timeStr = s.departure_time;
                code = s.squad_code;
                break;
            }

            // 2. Common Logic for Date & Images
            const dateObj = new Date(dateStr);
            const isFuture = !isNaN(dateObj.getTime()) && dateObj > new Date();
            const imageList = s.images && s.images.length > 0
              ? s.images
              : [`https://picsum.photos/seed/squad-${s.id}/800/500`];

            // 3. Return Standardized Object
            return {
              id: String(s.id),
              title: title || "Untitled Squad",
              location: s.location || "Unknown Location",
              date: isNaN(dateObj.getTime())
                ? "TBD"
                : dateObj.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
              time: timeStr?.slice(0, 5) || "TBD",
              members: String(s.max_member),
              status: isFuture ? "Upcoming" : "Completed",
              images: imageList,
              cost: s.cost || "0",
              duration: s.duration || "N/A",
              gender: s.gender || "Any",
              ageGroup: s.age_group || "All",
              tags: s.tag || [],
              squad_code: code || "N/A",
              user_id: s.user_id,
            };
          });

          console.log("Transformed Squads:", transformed);

          // 4. Filter based on Tab
          let filtered: DisplaySquad[] = transformed;
          if (activeTab === 'hosted') {
            filtered = transformed.filter(s => Number(s.user_id) === Number(user.id));
          } else if (activeTab === 'joined') {
            filtered = transformed.filter(s => Number(s.user_id) !== Number(user.id));
          }

          // 5. Update State and Redux
          setDisplaySquads(prev => {
            const existingIds = new Set(prev.map(s => s.id));
            const uniqueNew = filtered.filter(s => !existingIds.has(s.id));
            return [...prev, ...uniqueNew];
          });

          dispatch(setSquads(transformed));
        }
      } catch (err: any) {
        if (isMounted) {
          console.error("Fetch error:", err);
          setError(err.message || "Failed to load squads.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchSquads();

    return () => { isMounted = false; };
  }, [isLoggedIn, user?.id, activeTab, activeCategory, page, dispatch]);

  if (!mounted) return null;
  if (!isLoggedIn) return <AccessDeniedScreen />;

  return (
    <div className="min-h-screen bg-background pb-24 overflow-x-hidden">
      {/* Header */}
      <div className="bg-muted/30 pt-16 pb-20 px-4 md:px-8 border-b border-border/50 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 w-fit rounded-full">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <p className="text-[10px] font-black uppercase tracking-widest text-primary">Member Hub</p>
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter italic uppercase flex items-center gap-4 leading-none">
              {activeTab === 'agency' ? "Agency Desk" : "My Hub"}
            </h1>
            <p className="text-muted-foreground font-bold text-xs uppercase tracking-[0.2em]">
              Welcome back explorer, <span className="text-foreground">@{user?.name?.split(' ')[0] || 'Traveler'}</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => setIsSquadModalOpen(true)} className="group flex-1 md:flex-none flex items-center justify-center gap-3 bg-foreground text-background px-6 md:px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-xl active:scale-95">
              <Plus size={18} /> New Squad
            </button>
            <button onClick={() => setIsPackageModalOpen(true)} className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-secondary text-white px-6 md:px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg active:scale-95">
              <PlusCircle size={18} /> Add Pro Package
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 -mt-10 relative z-10">
        <div className="flex flex-col gap-6 mb-12">
          {/* Tabs - Now Dispatching to Redux */}
          <div className="flex overflow-x-auto no-scrollbar gap-2 p-2 bg-card/80 backdrop-blur-xl border-2 border-border/50 rounded-[3rem] w-full lg:w-fit shadow-2xl">
            {(['joined', 'hosted'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => dispatch(setActiveTab(tab))}
                className={`px-6 md:px-10 py-4 rounded-4xl text-[10px] font-black transition-all uppercase tracking-widest ${activeTab === tab ? 'bg-foreground text-background shadow-xl' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {tab === 'joined' ? 'Joined' : 'My Hosted'}
              </button>
            ))}
            <button
              onClick={() => dispatch(setActiveTab('agency'))}
              className={`px-6 md:px-10 py-4 rounded-4xl text-[10px] font-black transition-all uppercase tracking-widest flex items-center gap-2 ${activeTab === 'agency' ? 'bg-secondary text-white shadow-xl' : 'text-secondary hover:bg-secondary/10'}`}
            >
              <Building2 size={16} /> Agency
            </button>
          </div>

          {/* Categories - Now Dispatching to Redux */}
          {activeTab !== 'agency' && (
            <div className="flex overflow-x-auto no-scrollbar gap-2 p-2 bg-muted/40 border border-border/40 rounded-[2.5rem] w-full lg:w-fit shadow-lg">
              {categoryOptions.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => dispatch(setActiveCategory(cat.name))}
                  className={`px-5 md:px-8 py-3 rounded-full text-[9px] font-black transition-all uppercase tracking-widest flex items-center gap-2 ${activeCategory === cat.name ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:bg-background/60'}`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {activeTab === 'agency' ? (
            <AgencyView setIsPackageModalOpen={setIsPackageModalOpen} />
          ) : (
            <>
              {displaySquads.map((squad, index) => {
                const isLastElement = displaySquads.length === index + 1;
                return (
                  <SquadCard
                    key={`${squad.id}-${index}`}
                    squad={squad}
                    category={activeCategory}
                    innerRef={isLastElement ? lastSquadElementRef : null}
                  />
                );
              })}

              {loading && (
                <div className="col-span-full text-center py-10">
                  <Loader2 className="w-10 h-10 animate-spin mx-auto text-primary" />
                </div>
              )}

              {error && (
                <div className="col-span-full text-center text-red-500 font-black py-8">
                  {error}
                </div>
              )}

              {!loading && displaySquads.length === 0 && (
                <div className="col-span-full text-center py-20 bg-muted/10 rounded-[4rem] border-2 border-dashed border-muted-foreground/30">
                  <p className="text-muted-foreground font-black uppercase italic text-lg">
                    {activeTab === 'joined'
                      ? `No ${activeCategory} squads you've joined yet.`
                      : `No ${activeCategory} squads found.`}
                  </p>
                  {activeTab === 'joined' && (
                    <p className="text-sm text-muted-foreground mt-2">
                      (This feature may require a separate "joined squads" API endpoint)
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <CreateSquadModal isOpen={isSquadModalOpen} onClose={() => setIsSquadModalOpen(false)} />
      <CreatePackageModal isOpen={isPackageModalOpen} onClose={() => setIsPackageModalOpen(false)} />
    </div>
  );
}



// ── New Component: SquadCard with Carousel Logic ──
function SquadCard({ squad, category, innerRef }: { squad: DisplaySquad; category: string; innerRef: any }) {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const hasImages = squad.images && squad.images.length > 0;

  const nextImg = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImgIdx((prev) => (prev + 1) % squad.images.length);
  };

  const prevImg = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImgIdx((prev) => (prev - 1 + squad.images.length) % squad.images.length);
  };

  const maxCount = parseInt(squad.members) || 10;
  const currentJoined = squad.requestCount || 1;
  const spotsLeft = maxCount - currentJoined;
  const progressPercentage = (currentJoined / maxCount) * 100;
  const genderType = squad.gender.includes("Boys") ? "Only Boys" : squad.gender.includes("Girls") ? "Only Girls" : "Mixed";

  return (
    <div ref={innerRef} className="group relative bg-card border border-border rounded-[2.5rem] p-5 transition-all duration-500 hover:shadow-2xl flex flex-col gap-5 w-full overflow-hidden">

      {/* Image Carousel */}
      {hasImages && (
        <div className="relative h-48 w-full rounded-[1.5rem] overflow-hidden bg-muted group/carousel">
          <img
            src={squad.images[currentImgIdx]}
            alt={squad.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {squad.images.length > 1 && (
            <>
              <button onClick={prevImg} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover/carousel:opacity-100 transition-opacity">
                <ChevronLeft size={16} />
              </button>
              <button onClick={nextImg} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover/carousel:opacity-100 transition-opacity">
                <ChevronRight size={16} />
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {squad.images.map((_, i) => (
                  <div key={i} className={`h-1 rounded-full transition-all ${i === currentImgIdx ? "w-4 bg-primary" : "w-1 bg-white/50"}`} />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-2xl bg-primary/10 flex items-center justify-center text-primary rotate-3">
            <UserCircle size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase italic leading-none">Leader</p>
            <span className="text-xs font-black">@explorer</span>
          </div>
        </div>
        <div className="flex gap-2">
          <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-lg border ${genderType === "Mixed" ? "bg-blue-500/10 text-blue-500 border-blue-500/20" : genderType === "Only Boys" ? "bg-indigo-500/10 text-indigo-500 border-indigo-500/20" : "bg-pink-500/10 text-pink-500 border-pink-500/20"}`}>
            {genderType}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-4">
        <div className="flex justify-between items-start gap-2">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-primary">
              <MapPin size={14} className="animate-bounce" />
              <span className="text-[10px] font-black uppercase italic">Location</span>
            </div>
            <h4 className="text-xl font-black tracking-tight uppercase italic">{squad.title}</h4>
          </div>
          <div className="px-3 py-2 bg-muted/50 rounded-2xl border border-border/50 shrink-0">
            <p className="text-[9px] font-bold text-muted-foreground uppercase leading-none mb-1 text-right">Cost</p>
            <div className="text-sm font-black flex items-center gap-0.5">
              <BadgeIndianRupee size={14} className="text-primary" /> {squad.cost}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 px-3 py-2.5 bg-muted/30 rounded-xl text-[10px] font-black uppercase">
            <Milestone size={14} className="text-secondary" /> Age: {squad.ageGroup}
          </div>
          <div className="flex items-center gap-2 px-3 py-2.5 bg-muted/30 rounded-xl text-[10px] font-black uppercase">
            <ShieldCheck size={14} className="text-green-500" /> Verified
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2 px-3 py-2 bg-background rounded-xl border border-border/50 text-xs font-bold">
            <Calendar size={14} className="text-primary" /> {squad.date}
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-background rounded-xl border border-border/50 text-xs font-bold">
            <Users size={14} className="text-primary" /> {currentJoined}/{maxCount}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-dashed">
        <div className="flex items-center">
          <div className="flex -space-x-2.5 mr-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-8 w-8 rounded-full border-2 border-card overflow-hidden">
                <img src={`https://i.pravatar.cc/150?u=${squad.id}${i}`} className="w-full h-full" alt="avatar" />
              </div>
            ))}
            <div className="h-8 w-8 rounded-full border-2 border-card bg-primary text-white flex items-center justify-center text-[10px] font-black">+{spotsLeft}</div>
          </div>
        </div>
        <Link href={`/my-squads/${squad.squad_code}`} className="h-10 px-4 rounded-xl bg-foreground text-background flex items-center gap-2 font-black hover:bg-primary hover:text-white transition-all text-[10px] uppercase">
          Enter Hub <ChevronRight size={14} />
        </Link>
      </div>

      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[80%] h-1 bg-muted rounded-full overflow-hidden">
        <div className={`h-full transition-all duration-1000 ${progressPercentage > 80 ? 'bg-red-500' : 'bg-primary'}`} style={{ width: `${progressPercentage}%` }} />
      </div>
    </div>
  );
}

// ── Shared StatCard Component ──
function StatCard({ label, value, icon, color }: { label: string; value: string; icon: any; color: 'primary' | 'secondary' }) {
  const isSecondary = color === 'secondary';
  return (
    <div className={`bg-card p-10 rounded-[3rem] border-2 border-border/50 flex items-center justify-between group transition-all hover:border-primary shadow-sm hover:shadow-xl`}>
      <div className="space-y-1">
        <p className="text-[10px] font-black uppercase opacity-60 tracking-widest text-muted-foreground">{label}</p>
        <p className="text-4xl md:text-5xl font-black italic text-foreground tracking-tighter">{value}</p>
      </div>
      <div className={`p-5 rounded-[1.5rem] group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 ${isSecondary ? 'bg-secondary text-white' : 'bg-primary text-white'}`}>
        {icon}
      </div>
    </div>
  );
}

// ── Shared Agency View ──
function AgencyView({ setIsPackageModalOpen }: { setIsPackageModalOpen: any }) {
  return (
    <>
      <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <StatCard label="Live Packages" value="02" icon={<History />} color="secondary" />
        <StatCard label="Avg Rating" value="4.8" icon={<Star />} color="primary" />
        <button onClick={() => setIsPackageModalOpen(true)} className="bg-secondary p-10 rounded-[3rem] text-white flex flex-col justify-center items-start group min-h-[160px]">
          <PlusCircle size={40} className="mb-4 group-hover:rotate-90 transition-transform duration-500" />
          <p className="text-lg font-black uppercase italic leading-tight">List New <br /> Package</p>
        </button>
      </div>
    </>
  );
}

function AccessDeniedScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] px-4 text-center">
      <Lock size={64} className="text-primary mb-8" />
      <h2 className="text-4xl font-black italic uppercase mb-4">Access Restricted</h2>
      <button className="px-12 py-5 bg-foreground text-background rounded-4xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl hover:bg-primary hover:text-white transition-all">
        Login to Portal
      </button>
    </div>
  );
}