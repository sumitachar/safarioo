"use client";

import { useState, useEffect } from "react";
import { use } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

// ─── Lucide icons ────────────────────────────────────────
import {
  User,
  ShieldCheck,
  Settings,
  CheckCircle2,
  Flame,
  Heart,
  Zap,
  Wine,
  Ban,
  Dog,
  Languages,
  Sparkles,
  Users,
  Star,
  MessageCircle,
  Ruler,
  Briefcase,
  GraduationCap,
  MapPin,
  Instagram,
  Globe,
  DollarSign,
} from "lucide-react";

import { StoryForm } from "@/components/profile/StoryForm";
import { MessageModal } from "@/components/profile/MessageModal";
import { EditProfileModal } from "@/components/profile/EditProfileModal";

// ─── আমরা authSlice থেকে UserData ইমপোর্ট করব ────────
import { UserData } from "@/store/slices/authSlice";   // ← এটা খুব জরুরি

// ────────────────────────────────────────────────
// Type Definitions (আগের DisplayUser মুছে ফেলা হয়েছে)
// ────────────────────────────────────────────────

interface ProfileParams {
  id: string;
}

// ────────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────────

export default function ProfilePage({ params }: { params: Promise<ProfileParams> }) {
  const resolvedParams = use(params);
  const profileId = resolvedParams.id;

  const { isLoggedIn, user: currentUser } = useSelector((state: RootState) => state.auth);

  // username দিয়ে চেক করা ঠিক আছে (Navbar-এও username ব্যবহার করা হয়েছে)
  const isOwnProfile =
    isLoggedIn &&
    (currentUser?.username === profileId || profileId.toLowerCase() === "me");

  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"stories" | "reviews">("stories");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  // publicUser-কে এখন UserData টাইপ দিয়েছি
  const [publicUser, setPublicUser] = useState<UserData | null>(null);

  useEffect(() => {
    setMounted(true);

    if (!isOwnProfile) {
      // ডেমো ডাটা — UserData টাইপের সাথে মিল রেখে লিখতে হবে
      setPublicUser({
        id: Number(profileId) || 999, // id number হওয়া উচিত (অথবা string রাখা যায়)
        name: "Arjun Mehra",
        username: "arjun_travels",           // ← যোগ করা হয়েছে
        age: 27,
        gender: "Male",
        profileImage:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
        trust_score: "89",                    // string হিসেবে (API অনুযায়ী)
        bio: "Part-time coder, full-time wanderer. Chasing sunsets, street food, and stories that don't end at borders. Currently plotting my next escape to Spiti Valley.",
        location: "Bangalore, India",
        verified: true,
        travelVibe: "Off-the-beaten-path",
        budgetRange: "Moderate",
        occupation: "Full Stack Developer",
        education: "IIT Delhi",
        interests: ["Trekking", "Street Food", "Motorcycles", "Wild Camping", "Indie Music", "Sunsets"],
        languages: ["English", "Hindi", "Punjabi"],
        lifestyle: { smoking: "Socially", drinking: "Sometimes", pets: "Dogs" },
        socialLinks: { instagram: "arjun_travels", website: "arjun.dev" },
        sexualOrientation: "Straight",
        personalityType: "Adventurer",
        communicationStyle: "Voice Notes King",
        zodiac: "Sagittarius",
        height: "182",
        datingIntention: "Adventure Partner → Maybe More",
        promptQuestion: "Perfect first date would be...",
        promptAnswer: "Midnight bike ride to a secret viewpoint + chai from a roadside tapri",

        // API core fields যা দরকার নেই সেগুলো ডিফল্ট দিয়ে রাখা যায়
        email: "",
        mobile: null,
        dob: null,
        coin: "0",
        status: "Active",
        created_at: "",
        updated_at: "",
      } as UserData);
    }
  }, [isOwnProfile, profileId]);

  // displayUser এখন UserData | null
  const displayUser: UserData | null = isOwnProfile ? currentUser : publicUser;

  if (!mounted || !displayUser) return null;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* HERO SECTION */}
      <div className="relative h-137.5 md:h-175 w-full bg-muted overflow-hidden">
        {displayUser.profileImage ? (
          <img
            src={displayUser.profileImage}
            className="w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-1000"
            alt={`${displayUser.name}'s profile`}
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-primary/10 to-primary/30 flex items-center justify-center">
            {/* <User size={120} className="text-primary/20" /> */}
            <img
              src={"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"}
              className="w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-1000"
              alt={`${displayUser.name}'s profile`}
            />
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent z-10" />

        <div className="absolute bottom-12 left-6 md:left-12 z-20 space-y-4">
          <div className="flex items-center gap-4">
            <h1 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter drop-shadow-2xl">
              {displayUser.name}, {displayUser.age ?? "—"}
            </h1>
            {displayUser.verified && (
              <CheckCircle2 className="text-blue-400 fill-blue-400" size={36} aria-label="Verified user" />
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="px-5 py-2 bg-primary text-white text-[10px] font-black rounded-full uppercase italic flex items-center gap-2 shadow-lg">
              <Flame size={14} /> {displayUser.travelVibe || "Explorer"}
            </span>
            <span className="px-5 py-2 bg-white/20 backdrop-blur-xl border border-white/30 text-white text-[10px] font-black rounded-full uppercase italic">
              {displayUser.sexualOrientation || "Not shared"}
            </span>
            <span className="px-5 py-2 bg-white/20 backdrop-blur-xl border border-white/30 text-white text-[10px] font-black rounded-full uppercase italic">
              {displayUser.personalityType || "Ambivert"}
            </span>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="absolute top-8 md:top-12 right-6 md:right-12 z-30 flex gap-3 md:gap-4">
          {!isOwnProfile ? (
            <>
              <button
                aria-label="Like profile"
                className="h-14 w-14 md:h-16 md:w-16 bg-white/20 backdrop-blur-xl border border-white/30 text-white hover:text-rose-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 hover:bg-white transition-all duration-300"
              >
                <Heart size={28} className="md:w-8" fill="none" strokeWidth={2.5} />
              </button>

              <button
                onClick={() => setIsMessageModalOpen(true)}
                className="px-6 md:px-10 h-14 md:h-16 bg-primary text-white rounded-full font-black text-[10px] md:text-xs uppercase shadow-xl flex items-center gap-2 md:gap-3 hover:shadow-primary/40 hover:scale-105 transition-all duration-300"
              >
                <Zap size={20} fill="currentColor" /> Match & Chat
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="px-6 md:px-8 h-12 md:h-14 bg-black/40 backdrop-blur-md border border-white/20 text-white rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-primary transition-all flex items-center gap-2"
            >
              <Settings size={18} /> Update Vibe
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* SIDEBAR */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-card border border-border rounded-[3rem] p-8 space-y-8 shadow-sm">
            <div>
              <h3 className="text-[10px] font-black uppercase text-primary tracking-widest italic mb-6">
                Profile Basics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <LifestyleBadge icon={<Star size={14} />} label="Zodiac" value={displayUser.zodiac} />
                <LifestyleBadge
                  icon={<MessageCircle size={14} />}
                  label="Chat Style"
                  value={displayUser.communicationStyle}
                />
                <LifestyleBadge
                  icon={<Ruler size={14} />}
                  label="Height"
                  value={displayUser.height ? `${displayUser.height} cm` : "—"}
                />
                <LifestyleBadge icon={<DollarSign size={14} />} label="Budget" value={displayUser.budgetRange} />
              </div>
            </div>

            <div className="pt-8 border-t border-border space-y-6">
              <InfoItem
                icon={<ShieldCheck size={20} />}
                label="Trust Level"
                value={displayUser.trust_score ? `${displayUser.trust_score}% Verified` : "—"}
              />
              <InfoItem icon={<MapPin size={20} />} label="Lives In" value={displayUser.location || "—"} />
              <InfoItem icon={<Briefcase size={20} />} label="Working As" value={displayUser.occupation || "—"} />
              <InfoItem
                icon={<GraduationCap size={20} />}
                label="Studied At"
                value={displayUser.education || "—"}
              />
            </div>
          </div>

          <div className="bg-card border border-border rounded-4xl md:rounded-[3rem] p-5 md:p-8 shadow-sm">
            <h3 className="text-[10px] font-black uppercase text-primary tracking-widest italic mb-6">
              Lifestyle & Socials
            </h3>

            {/* Lifestyle Badges Grid: Mobile 1 column, SM and up 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6">
              <LifestyleBadge
                icon={<Ban size={14} />}
                label="Smoke"
                value={displayUser.lifestyle?.smoking}
              />
              <LifestyleBadge
                icon={<Wine size={14} />}
                label="Drink"
                value={displayUser.lifestyle?.drinking}
              />
              <LifestyleBadge
                icon={<Dog size={14} />}
                label="Pets"
                value={displayUser.lifestyle?.pets}
              />
              <LifestyleBadge
                icon={<Languages size={14} />}
                label="Languages"
                value={displayUser.languages?.join(", ") || "—"}
              />
            </div>

            {/* Social Links Section */}
            <div className="space-y-3">
              {displayUser.socialLinks?.instagram && (
                <a
                  href={`https://instagram.com/${displayUser.socialLinks.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-pink-500/10 rounded-xl md:rounded-2xl text-pink-500 font-bold text-[10px] md:text-xs uppercase italic transition-all hover:bg-pink-500/20 active:scale-95"
                >
                  <Instagram size={18} className="shrink-0" />
                  <span className="truncate">@{displayUser.socialLinks.instagram}</span>
                </a>
              )}

              {displayUser.socialLinks?.website && (
                <a
                  href={`https://${displayUser.socialLinks.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-blue-500/10 rounded-xl md:rounded-2xl text-blue-500 font-bold text-[10px] md:text-xs uppercase italic transition-all hover:bg-blue-500/20 active:scale-95"
                >
                  <Globe size={18} className="shrink-0" />
                  <span className="truncate">{displayUser.socialLinks.website}</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="lg:col-span-8 space-y-12">
          {/* Bio */}
          <div className="bg-card border border-border rounded-[3.5rem] p-12 relative overflow-hidden group">
            <Sparkles
              className="absolute top-8 right-8 text-primary opacity-10 group-hover:opacity-30 transition-opacity"
              size={50}
            />
            <h3 className="text-[10px] font-black uppercase text-primary mb-6 tracking-[0.4em] italic">
              The Vibe
            </h3>
            <p className="text-3xl font-medium italic opacity-80 leading-snug">
              {displayUser.bio || "Searching for an adventure partner..."}
            </p>
          </div>

          {/* Prompt */}
          {displayUser.promptQuestion && displayUser.promptAnswer && (
            <div className="bg-primary/5 border border-primary/20 rounded-[3.5rem] p-12 space-y-4">
              <p className="text-[11px] font-black uppercase text-primary opacity-60 italic tracking-widest">
                {displayUser.promptQuestion}
              </p>
              <p className="text-4xl font-black italic uppercase tracking-tighter text-foreground leading-none">
                "{displayUser.promptAnswer}"
              </p>
            </div>
          )}

          {/* Looking For */}
          <div className="bg-secondary/10 border border-secondary/20 rounded-[3rem] p-10 flex items-center justify-between">
            <div>
              <h3 className="text-[10px] font-black uppercase text-secondary mb-2 tracking-widest italic">
                Looking For
              </h3>
              <p className="text-2xl font-black italic uppercase tracking-tighter text-foreground">
                {displayUser.datingIntention || "Adventure & Friendships"}
              </p>
            </div>
            <Users size={40} className="text-secondary opacity-20" />
          </div>

          {/* Interests */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase text-muted-foreground ml-6 tracking-widest">
              My Passions
            </h3>
            <div className="flex flex-wrap gap-3">
              {displayUser.interests?.map((tag) => (
                <span
                  key={tag}
                  className="px-8 py-4 bg-muted/40 border border-border text-[11px] font-black rounded-full uppercase hover:border-primary hover:bg-primary/5 transition-all"
                >
                  {tag}
                </span>
              )) ?? <span className="text-muted-foreground italic">No passions listed</span>}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-12 border-b border-border pt-6">
            {["stories", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as "stories" | "reviews")}
                className={`pb-6 text-[11px] font-black uppercase tracking-[0.2em] italic flex items-center gap-2 transition-all ${activeTab === tab
                    ? "border-b-4 border-primary text-primary"
                    : "text-muted-foreground opacity-50 hover:opacity-100"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "stories" ? (
            <div className="py-24 text-center bg-card rounded-[4rem] border-2 border-dashed border-border group hover:border-primary/40 transition-all">
              <h3 className="text-2xl font-black italic uppercase tracking-tighter opacity-30">
                No Memories Posted
              </h3>
              {isOwnProfile && (
                <button
                  onClick={() => setIsStoryModalOpen(true)}
                  className="mt-8 px-10 py-4 bg-primary text-white rounded-2xl font-black text-[11px] uppercase shadow-xl hover:scale-105 transition-all"
                >
                  Add First Story
                </button>
              )}
            </div>
          ) : (
            <div className="py-20 text-center opacity-30 font-black uppercase text-xs italic">
              No reviews from past travel buddies yet
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {isEditModalOpen && <EditProfileModal onClose={() => setIsEditModalOpen(false)} />}
      {isStoryModalOpen && <StoryForm onClose={() => setIsStoryModalOpen(false)} />}
      {isMessageModalOpen && (
        <MessageModal userName={displayUser.name} onClose={() => setIsMessageModalOpen(false)} />
      )}
    </div>
  );
}

// ────────────────────────────────────────────────
// Reusable Components
// ────────────────────────────────────────────────

function LifestyleBadge({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) {
  return (
    <div className="flex items-center gap-3 p-5 bg-muted/30 rounded-4xl border border-transparent hover:border-primary/20 transition-all group">
      <div className="text-primary group-hover:scale-110 transition-transform">{icon}</div>
      <div>
        <p className="text-[9px] font-bold uppercase opacity-40 leading-none mb-1">{label}</p>
        <p className="text-[11px] font-black uppercase italic truncate max-w-22.5">
          {value || "—"}
        </p>
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) {
  return (
    <div className="flex items-center gap-6 group cursor-default">
      <div className="h-14 w-14 bg-muted rounded-[1.5rem] flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-all shadow-inner">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-2">
          {label}
        </p>
        <p className="font-black text-md uppercase italic tracking-tight">{value ?? "—"}</p>
      </div>
    </div>
  );
}