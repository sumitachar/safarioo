"use client"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { updateProfile, UserData } from "@/store/slices/authSlice"; // UserData ইমপোর্ট করুন
import { 
  X, Sparkles, Instagram, Briefcase, GraduationCap, DollarSign, 
  Users, MessageSquare, Ruler, Star, Heart, Wine, Ban, Dog, Globe, MapPin
} from "lucide-react";

export function EditProfileModal({ onClose }: { onClose: () => void }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [step, setStep] = useState(1);

  // ১. অপশনগুলোকে 'as const' করা যাতে এগুলো নির্দিষ্ট টাইপ হিসেবে কাজ করে
  const ORIENTATIONS = ["Straight", "Gay", "Lesbian", "Bisexual", "Queer", "Asexual"] as const;
  const ZODIACS = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"] as const;
  const INTENTIONS = ["Adventure Partner", "Life Partner", "Casual Vibe", "New Friends"] as const;
  const COMM_STYLES = ["Fast Texter", "Voice Notes King", "Phone Caller", "Video Chat", "Bad at Texting"] as const;

  // ২. formData-তে টাইপ কাস্টিং যোগ করা যাতে TS এরর না দেয়
  const [formData, setFormData] = useState<UserData>({
    ...user,
    bio: user?.bio || "",
    location: user?.location || "",
    height: user?.height || "",
    zodiac: user?.zodiac || "Sagittarius",
    occupation: user?.occupation || "",
    education: user?.education || "",
    budgetRange: user?.budgetRange || "Moderate",
    interests: user?.interests || [],
    languages: user?.languages || [],
    lifestyle: {
        smoking: user?.lifestyle?.smoking || "No",
        drinking: user?.lifestyle?.drinking || "No",
        pets: user?.lifestyle?.pets || "No"
    },
    socialLinks: user?.socialLinks || { instagram: "", website: "" },
    
    sexualOrientation: user?.sexualOrientation || "Straight",
    personalityType: user?.personalityType || "Ambivert",
    communicationStyle: user?.communicationStyle || "Fast Texter",
    datingIntention: user?.datingIntention || "New Friends",
    promptQuestion: user?.promptQuestion || "Perfect first date would be...",
    promptAnswer: user?.promptAnswer || "",
  } as UserData);

  const handleToggle = (list: string[], item: string, key: keyof UserData) => {
    const updated = list.includes(item) ? list.filter(i => i !== item) : [...list, item];
    setFormData({ ...formData, [key]: updated });
  };

  const handleSave = () => {
    dispatch(updateProfile(formData));
    onClose();
  };

  const progress = (step / 6) * 100;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4">
      <div className="relative w-full max-w-2xl bg-card rounded-[3.5rem] border border-border shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        
        <div className="h-2 w-full bg-muted">
          <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>

        <div className="p-8 flex justify-between items-center border-b border-border">
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">
            {step === 1 && "Basic Identity"}
            {step === 2 && "Orientation & Intention"}
            {step === 3 && "Vibe & Style"}
            {step === 4 && "Interests & Languages"}
            {step === 5 && "Lifestyle & Career"}
            {step === 6 && "The Prompt"}
          </h2>
          <button onClick={onClose} className="p-3 bg-muted rounded-full hover:bg-red-500 hover:text-white transition-all"><X size={20}/></button>
        </div>

        <div className="p-10 flex-1 overflow-y-auto custom-scrollbar space-y-8">
          
          {step === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase opacity-60 ml-2 flex items-center gap-2"><MapPin size={12}/> Location</label>
                  <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full p-4 bg-muted/40 rounded-2xl font-bold text-xs outline-none" placeholder="City, Country" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase opacity-60 ml-2 flex items-center gap-2"><Ruler size={12}/> Height (cm)</label>
                  <input type="text" value={formData.height} onChange={e => setFormData({...formData, height: e.target.value})} className="w-full p-4 bg-muted/40 rounded-2xl font-bold text-xs outline-none" placeholder="182" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase opacity-60 ml-2">Bio</label>
                <textarea 
                  value={formData.bio} 
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  className="w-full h-32 px-6 py-4 bg-muted/40 rounded-[2rem] font-medium border-none focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Share your travel philosophy..."
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase opacity-60 flex items-center gap-2 ml-2"><Users size={12}/> Orientation</label>
                <div className="grid grid-cols-3 gap-2">
                  {ORIENTATIONS.map(opt => (
                    <button key={opt} onClick={() => setFormData({...formData, sexualOrientation: opt})}
                      className={`py-3 rounded-xl text-[10px] font-black uppercase border transition-all ${formData.sexualOrientation === opt ? 'bg-primary text-white border-primary' : 'bg-muted/30'}`}>{opt}</button>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase opacity-60 flex items-center gap-2 ml-2"><Heart size={12}/> Looking For</label>
                <div className="grid grid-cols-2 gap-2">
                  {INTENTIONS.map(opt => (
                    <button key={opt} onClick={() => setFormData({...formData, datingIntention: opt})}
                      className={`py-3 rounded-xl text-[10px] font-black uppercase border transition-all ${formData.datingIntention === opt ? 'bg-secondary text-white border-secondary' : 'bg-muted/30'}`}>{opt}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase opacity-60 flex items-center gap-2 ml-2"><Star size={12}/> Zodiac Sign</label>
                <select value={formData.zodiac} onChange={e => setFormData({...formData, zodiac: e.target.value})} className="w-full p-4 bg-muted/40 rounded-2xl font-bold text-xs outline-none appearance-none">
                  {ZODIACS.map(z => <option key={z} value={z}>{z}</option>)}
                </select>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase opacity-60 flex items-center gap-2 ml-2"><MessageSquare size={12}/> Communication Style</label>
                <div className="grid grid-cols-2 gap-2">
                  {COMM_STYLES.map(c => (
                    <button key={c} onClick={() => setFormData({...formData, communicationStyle: c})}
                      className={`py-3 rounded-xl text-[10px] font-black uppercase border transition-all ${formData.communicationStyle === c ? 'bg-primary text-white border-primary' : 'bg-muted/30'}`}>{c}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

         {step === 4 && (
            <div className="space-y-8">
              {/* Interests Section */}
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase opacity-60 flex items-center gap-2 ml-2">
                  <Heart size={12}/> My Passions
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {["Hiking", "Street Food", "Nightlife", "History", "Gaming", "Yoga", "Motorcycles"].map(item => (
                    <button key={item} type="button" onClick={() => handleToggle(formData.interests, item, 'interests')}
                      className={`p-4 rounded-[1.5rem] text-[10px] font-black uppercase border-2 transition-all ${formData.interests.includes(item) ? 'border-primary bg-primary/10 text-primary' : 'border-border'}`}>
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Languages Section - নতুন যোগ করা হয়েছে */}
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase opacity-60 flex items-center gap-2 ml-2">
                  <Globe size={12}/> Languages I Speak
                </label>
                <div className="flex flex-wrap gap-2">
                  {["English", "Bengali", "Hindi", "Spanish", "French", "German"].map(lang => (
                    <button 
                      key={lang} 
                      type="button"
                      onClick={() => handleToggle(formData.languages || [], lang, 'languages')}
                      className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase border transition-all ${formData.languages?.includes(lang) ? 'bg-primary text-white border-primary' : 'bg-muted/30 border-transparent'}`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase opacity-60 flex items-center gap-2 ml-2"><Briefcase size={12}/> Occupation</label>
                  <input type="text" value={formData.occupation} onChange={e => setFormData({...formData, occupation: e.target.value})} className="w-full p-4 bg-muted/40 rounded-2xl font-bold text-xs outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase opacity-60 flex items-center gap-2 ml-2"><GraduationCap size={12}/> Education</label>
                  <input type="text" value={formData.education} onChange={e => setFormData({...formData, education: e.target.value})} className="w-full p-4 bg-muted/40 rounded-2xl font-bold text-xs outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <LifestyleInput icon={<Ban size={12}/>} label="Smoking" value={formData.lifestyle?.smoking || "No"} 
                  onChange={(val) => setFormData({...formData, lifestyle: {...formData.lifestyle!, smoking: val as any}})} />
                <LifestyleInput icon={<Wine size={12}/>} label="Drinking" value={formData.lifestyle?.drinking || "No"} 
                  onChange={(val) => setFormData({...formData, lifestyle: {...formData.lifestyle!, drinking: val as any}})} />
                <LifestyleInput icon={<Dog size={12}/>} label="Pets" value={formData.lifestyle?.pets || "No"} 
                  onChange={(val) => setFormData({...formData, lifestyle: {...formData.lifestyle!, pets: val as any}})} />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase opacity-60 ml-2">Instagram Username</label>
                <div className="flex items-center gap-4 bg-muted/20 p-3 rounded-2xl border border-transparent focus-within:border-pink-500">
                    <Instagram className="text-pink-500" size={20}/>
                    <input type="text" value={formData.socialLinks?.instagram} onChange={e => setFormData({...formData, socialLinks: {...formData.socialLinks!, instagram: e.target.value}})} className="bg-transparent flex-1 text-xs font-bold outline-none" placeholder="@username"/>
                </div>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase opacity-60 ml-2">Select a Profile Prompt</label>
                <select value={formData.promptQuestion} onChange={e => setFormData({...formData, promptQuestion: e.target.value})} className="w-full p-4 bg-muted/40 rounded-2xl font-bold text-xs outline-none">
                  <option>Perfect first date would be...</option>
                  <option>Quickest way to my heart is...</option>
                  <option>My typical Sunday looks like...</option>
                  <option>Travel is incomplete without...</option>
                </select>
                <textarea 
                  value={formData.promptAnswer} 
                  onChange={(e) => setFormData({...formData, promptAnswer: e.target.value})}
                  className="w-full h-32 px-6 py-4 bg-primary/5 rounded-[2rem] font-bold text-lg border-2 border-dashed border-primary/20 focus:border-primary outline-none"
                  placeholder="Answer brilliantly..."
                />
              </div>
            </div>
          )}
        </div>

        <div className="p-8 border-t border-border flex gap-4 bg-card">
          {step > 1 && <button onClick={() => setStep(step - 1)} className="px-8 py-5 bg-muted rounded-2xl font-black text-[10px] uppercase">Back</button>}
          {step < 6 ? (
            <button onClick={() => setStep(step + 1)} className="flex-1 py-5 bg-primary text-white rounded-2xl font-black text-[10px] uppercase shadow-lg shadow-primary/20">Next Step</button>
          ) : (
            <button onClick={handleSave} className="flex-1 py-5 bg-primary text-white rounded-2xl font-black text-[10px] uppercase transition-all hover:bg-primary/90">Save Vibe</button>
          )}
        </div>
      </div>
    </div>
  );
}

function LifestyleInput({ icon, label, value, onChange }: { icon: any, label: string, value: string, onChange: (v: string) => void }) {
  const options = ["No", "Socially", "Regularly", "Sometimes", "Prefer not to say"];
  return (
    <div className="space-y-2">
      <label className="text-[8px] font-black uppercase opacity-50 flex items-center gap-1 ml-1">{icon} {label}</label>
      <select value={value} onChange={e => onChange(e.target.value)} className="w-full p-2 bg-muted/20 rounded-lg text-[9px] font-bold outline-none border border-border">
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}