"use client";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/slices/authSlice";
import { X, User, Phone, Compass, CheckCircle2, Mail, AtSign, Loader2, KeyRound } from "lucide-react";
import { authApi } from "@/api/authApi";
import { userApi } from "@/api/userApi";

export default function AuthModal({ isOpen, onClose, type, setType }: {
  isOpen: boolean; 
  onClose: () => void; 
  type: 'login' | 'signup';
  setType: (type: 'login' | 'signup') => void;
}) {
  const dispatch = useDispatch();

  const initialFormState = {
    username: "",
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "Male"
  };

  const [formData, setFormData] = useState(initialFormState);
  const [otp, setOtp] = useState("");
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean | null>(null);

  // --- Reset Function ---
  const resetAll = useCallback(() => {
    setFormData(initialFormState);
    setOtp("");
    setShowOtpScreen(false);
    setError("");
    setSuccess(false);
    setIsUsernameAvailable(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!isOpen) {
        resetAll();
    }
  }, [isOpen, resetAll]);

  // যখনই টাইপ (Login/Signup) পরিবর্তন হবে, এরর ক্লিয়ার হবে
  useEffect(() => {
    setError("");
  }, [type]);

  // Username Availability Check Logic
  useEffect(() => {
    if (!isOpen || formData.username.length < 3 || type === 'login' || showOtpScreen) {
      setIsUsernameAvailable(null);
      return;
    }
    const checkUsername = async () => {
      setIsCheckingUsername(true);
      try {
        const response = await userApi.checkUsername(formData.username);
        setIsUsernameAvailable(response.available);
      } catch (err) { console.error("Username check failed", err); } 
      finally { setIsCheckingUsername(false); }
    };
    const debounceTimer = setTimeout(checkUsername, 500);
    return () => clearTimeout(debounceTimer);
  }, [formData.username, isOpen, type, showOtpScreen]);

  if (!isOpen) return null;

  // --- Handlers ---
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (type === 'login') {
        const res = await authApi.login({
          login: formData.mobile,
          password: formData.password
        });

        if (res.user && res.token) {
          dispatch(loginSuccess({ user: res.user, token: res.token }));
          setSuccess(true);
          setTimeout(() => { onClose(); }, 1500);
        } else {
          throw new Error("Invalid response from server!");
        }

      } else {
        // Signup Validation
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match!");
        }
        if (isUsernameAvailable === false) {
          throw new Error("Username is already taken!");
        }

        const { confirmPassword, ...signupData } = formData;
        await authApi.signup(signupData);
        setShowOtpScreen(true);
      }
    } catch (err: any) {
      // API error handling
      setError(err.message || err.response?.data?.message || "Authentication failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await userApi.verifyOtp({ email: formData.email, otp: otp });
      setSuccess(true);
      setTimeout(() => {
        setType('login');
        setShowOtpScreen(false);
        setSuccess(false);
        setOtp("");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Invalid OTP! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-card rounded-[2.5rem] border border-border shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-muted transition-colors z-10">
          <X size={20} />
        </button>

        <div className="p-8 md:p-10 overflow-y-auto custom-scrollbar">
          {success ? (
            <div className="py-10 text-center space-y-4 animate-in zoom-in duration-300">
              <div className="h-20 w-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-2xl font-black">{type === 'login' ? 'Welcome Back!' : 'Email Verified!'}</h3>
              <p className="text-muted-foreground font-medium">
                {type === 'login' ? 'Preparing your next adventure...' : 'You can now sign in to your account.'}
              </p>
            </div>
          ) : showOtpScreen ? (
            /* ================= OTP UI ================= */
            <div className="animate-in slide-in-from-right duration-500">
               <div className="text-center mb-8">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white mb-4 shadow-lg shadow-orange-500/20">
                  <KeyRound size={28} />
                </div>
                <h2 className="text-3xl font-black tracking-tight uppercase italic">Verify Email</h2>
                <p className="text-xs font-bold text-muted-foreground mt-2">Enter the code sent to <span className="text-primary">{formData.email}</span></p>
                {error && <p className="mt-4 text-[10px] font-black text-red-500 bg-red-500/10 py-2 px-3 rounded-lg uppercase tracking-widest">{error}</p>}
              </div>

              <form className="space-y-6" onSubmit={handleVerifyOtp}>
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="0 0 0 0 0 0"
                  className="w-full text-center text-3xl tracking-[0.5rem] md:tracking-[1rem] py-5 bg-muted/30 rounded-2xl border-2 border-transparent focus:border-primary transition-all font-black outline-none"
                />
                <button type="submit" disabled={loading || otp.length < 4} className="w-full py-4 font-black rounded-2xl shadow-xl bg-primary text-white disabled:opacity-50 active:scale-95 transition-transform">
                  {loading ? <Loader2 className="animate-spin mx-auto" size={20} /> : 'Verify & Continue'}
                </button>
              </form>
            </div>
          ) : (
            /* ================= LOGIN / SIGNUP FORM ================= */
            <>
              <div className="text-center mb-6">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground mb-4 shadow-lg shadow-primary/20">
                  <Compass size={28} />
                </div>
                <h2 className="text-3xl font-black tracking-tight uppercase italic">
                  {type === 'login' ? 'Welcome to Safarioo' : 'Join the Squad'}
                </h2>
                {error && <p className="mt-2 text-[10px] font-black text-red-500 bg-red-500/10 py-2 px-3 rounded-lg uppercase tracking-widest text-center">{error}</p>}
              </div>

              <form className="space-y-4" onSubmit={handleAuth}>
                {type === 'signup' && (
                  <div className="animate-in fade-in duration-500 space-y-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black ml-1 uppercase opacity-60 flex justify-between">
                            Username
                            {isCheckingUsername && <Loader2 size={12} className="animate-spin" />}
                            {isUsernameAvailable === true && <span className="text-green-500 lowercase">available</span>}
                            {isUsernameAvailable === false && <span className="text-red-500 lowercase">taken</span>}
                        </label>
                        <div className="relative">
                            <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                            <input type="text" required value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value.toLowerCase().replace(/\s/g, '') })} placeholder="username" className={`w-full pl-11 py-3.5 bg-muted/30 rounded-2xl border-2 transition-all font-bold outline-none ${isUsernameAvailable === false ? 'border-red-500/50' : 'border-transparent focus:border-primary/50'}`} />
                        </div>
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-[10px] font-black ml-1 uppercase opacity-60">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                        <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Your Name" className="w-full pl-11 py-3.5 bg-muted/30 rounded-2xl border-2 border-transparent focus:border-primary/50 transition-all font-bold outline-none" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black ml-1 uppercase opacity-60">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                        <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="email@example.com" className="w-full pl-11 py-3.5 bg-muted/30 rounded-2xl border-2 border-transparent focus:border-primary/50 transition-all font-bold outline-none" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[10px] font-black ml-1 uppercase opacity-60">
                    {type === 'login' ? 'Email or Mobile' : 'Mobile Number'}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <input type="text" required value={formData.mobile} onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} placeholder={type === 'login' ? "Email or Phone" : "91XXXXXXXX"} className="w-full pl-11 py-3.5 bg-muted/30 rounded-2xl border-2 border-transparent focus:border-primary/50 transition-all font-bold outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black ml-1 uppercase opacity-60">Password</label>
                        <input type="password" required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="••••••••" className="w-full px-5 py-3.5 bg-muted/30 rounded-2xl border-2 border-transparent focus:border-primary/50 transition-all font-bold outline-none" />
                    </div>
                    {type === 'signup' && (
                        <div className="space-y-1">
                            <label className="text-[10px] font-black ml-1 uppercase opacity-60">Confirm</label>
                            <input type="password" required value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} placeholder="••••••••" className={`w-full px-5 py-3.5 bg-muted/30 rounded-2xl border-2 font-bold outline-none transition-all ${formData.confirmPassword && formData.password !== formData.confirmPassword ? 'border-red-500/50' : 'border-transparent focus:border-primary/50'}`} />
                        </div>
                    )}
                </div>

                {type === 'signup' && (
                    <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-top-2 duration-300">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black ml-1 uppercase opacity-60">Birthday</label>
                            <input type="date" required value={formData.dob} onChange={(e) => setFormData({ ...formData, dob: e.target.value })} className="w-full px-4 py-3.5 bg-muted/30 rounded-2xl font-bold border-none text-xs outline-none" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black ml-1 uppercase opacity-60">Gender</label>
                            <select value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="w-full px-4 py-3.5 bg-muted/30 rounded-2xl font-bold border-none text-xs h-[52px] outline-none">
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                )}

                <button type="submit" disabled={loading} className="w-full py-4 mt-4 font-black rounded-2xl bg-foreground text-background dark:bg-primary dark:text-white transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50 shadow-lg shadow-primary/10">
                  {loading ? <Loader2 className="animate-spin mx-auto" size={20} /> : (type === 'login' ? 'Sign In' : 'Join Safarioo')}
                </button>
              </form>

              <div className="mt-8 text-center text-[10px] font-black uppercase tracking-widest">
                <span className="text-muted-foreground">{type === 'login' ? "Don't have an account?" : "Already a member?"}</span>
                <button 
                    onClick={() => setType(type === 'login' ? 'signup' : 'login')} 
                    className="ml-2 text-primary hover:underline transition-all"
                >
                  {type === 'login' ? 'Create Account' : 'Sign In'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}