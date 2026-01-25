"use client"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, UserData } from "@/store/slices/authSlice"; 
import { X, Lock, User, Phone, ArrowRight, Compass, ChevronRight, CheckCircle2 } from "lucide-react";

export default function AuthModal({ isOpen, onClose, type, setType }: { 
  isOpen: boolean; 
  onClose: () => void; 
  type: 'login' | 'signup';
  setType: (type: 'login' | 'signup') => void;
}) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    mobile: "",
    password: "",
    fullName: "",
    gender: "Male"
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  // gender কে 'as const' করা হয়েছে যাতে TS এরর না দেয়
  const FAKE_USER = {
    id: "user_123", // id যোগ করা হয়েছে কারণ UserData তে এটি required
    mobile: "8348580207",
    password: "admin123",
    name: "Sumit Achar",
    age: 28,
    gender: "Male" as const, // Fix: Type কাস্টিং
    coins: 100, 
    trustScore: 90,
    verified: true,
    interests: ["Hiking", "Photography"],
    travelVibe: "Adventurer"
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (type === 'login') {
      if (formData.mobile === FAKE_USER.mobile && formData.password === FAKE_USER.password) {
        setSuccess(true);
        
        // Redux Store এ ডেটা পাঠানো হচ্ছে
        // পূর্ণাঙ্গ UserData স্ট্রাকচার বজায় রাখা হয়েছে
        dispatch(loginSuccess({
          ...FAKE_USER,
        } as UserData));

        setTimeout(() => {
          setSuccess(false);
          onClose(); 
        }, 1500);
      } else {
        setError("Invalid mobile number or password!");
      }
    } else {
      setSuccess(true);
      setTimeout(() => { 
        setSuccess(false); 
        setType('login'); 
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-card rounded-[2.5rem] border border-border shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-muted transition-colors z-10">
          <X size={20} />
        </button>

        <div className="p-8 md:p-10 max-h-[90vh] overflow-y-auto">
          {success ? (
            <div className="py-10 text-center space-y-4 animate-in zoom-in-50">
                <div className="h-20 w-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-black">
                  {type === 'login' ? `Welcome, ${FAKE_USER.name}!` : 'Account Created!'}
                </h3>
                <p className="text-muted-foreground font-medium">
                  {type === 'login' ? 'Accessing your travel dashboard...' : 'Please log in to continue.'}
                </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground mb-4 shadow-lg shadow-primary/20">
                  <Compass size={28} />
                </div>
                <h2 className="text-3xl font-black tracking-tight uppercase italic">
                  {type === 'login' ? 'Welcome Back' : 'Join the Squad'}
                </h2>
                {error && <p className="mt-2 text-sm font-bold text-red-500 bg-red-500/10 py-2 rounded-lg animate-bounce">{error}</p>}
              </div>

              <form className="space-y-4" onSubmit={handleAuth}>
                {type === 'signup' && (
                  <div className="space-y-1">
                    <label className="text-xs font-black ml-1 uppercase opacity-60">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                      <input 
                        type="text" 
                        required
                        placeholder="Sumit Achar" 
                        className="w-full pl-11 py-3.5 bg-muted/30 rounded-2xl border-none focus:ring-2 focus:ring-primary transition-all font-bold" 
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-black ml-1 uppercase opacity-60">Mobile Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <input 
                      type="tel" 
                      required
                      value={formData.mobile}
                      onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                      placeholder="8348580207" 
                      className="w-full pl-11 py-3.5 bg-muted/30 rounded-2xl border-none focus:ring-2 focus:ring-primary transition-all font-bold" 
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black ml-1 uppercase opacity-60">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <input 
                      type="password" 
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      placeholder="admin123" 
                      className="w-full pl-11 py-3.5 bg-muted/30 rounded-2xl border-none focus:ring-2 focus:ring-primary transition-all font-bold" 
                    />
                  </div>
                </div>

                {type === 'signup' && (
                   <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-black ml-1 uppercase opacity-60">Age</label>
                            <input type="number" placeholder="28" className="w-full px-4 py-3.5 bg-muted/30 rounded-2xl font-bold border-none" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-black ml-1 uppercase opacity-60">Gender</label>
                            <select className="w-full px-4 py-3.5 bg-muted/30 rounded-2xl font-bold outline-none border-none">
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </div>
                   </div>
                )}

                <button 
                  type="submit"
                  className="w-full py-4 mt-4 font-black rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 bg-foreground text-background dark:bg-primary dark:text-white hover:scale-[1.02] active:scale-95"
                >
                  {type === 'login' ? 'Sign In' : 'Create Profile'} 
                  {type === 'login' ? <ArrowRight size={18} /> : <ChevronRight size={18} />}
                </button>
              </form>

              <div className="mt-8 text-center text-sm font-bold">
                <span className="text-muted-foreground">
                  {type === 'login' ? "Don't have an account?" : "Already a member?"}
                </span>
                <button 
                  onClick={() => setType(type === 'login' ? 'signup' : 'login')}
                  className="ml-2 text-primary font-black hover:underline"
                >
                  {type === 'login' ? 'Create Account' : 'Sign In Instead'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}