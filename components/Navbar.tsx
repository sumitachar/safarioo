"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { logout } from "@/store/slices/authSlice";
import { 
  User, Compass, Menu, X, Bell, LayoutGrid, Users, Building2, 
  BookOpen, Sparkles, LogOut, Coins, Wallet, Headset 
} from "lucide-react";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openAuth = (type: 'login' | 'signup') => {
    setAuthType(type);
    setIsAuthOpen(true);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
  };

  const publicLinks = [
    { name: "Feed", href: "/", icon: <LayoutGrid size={18} /> },
    { name: "Agencies", href: "/agencies", icon: <Building2 size={18} /> },
    { name: "Stories", href: "/blogs", icon: <BookOpen size={18} /> },
    { name: "Contact", href: "/contact", icon: <Headset size={18} /> }, 
  ];

  const protectedLinks = [
    { name: "My Squads", href: "/my-squads", icon: <Users size={18} /> },
  ];

  return (
    <>
      <nav className={`sticky top-0 z-[100] w-full transition-all duration-300 ${
        scrolled 
        ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm py-2" 
        : "bg-transparent py-4"
      }`}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 group-hover:rotate-[10deg] transition-transform duration-300">
              <Compass size={26} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-foreground uppercase leading-none">
                Safarioo<span className="text-secondary">.</span>
              </span>
              <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Discover Bharat</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 bg-muted/30 p-1 rounded-2xl border border-border/50">
            {publicLinks.map((link) => (
              <Link key={link.name} href={link.href} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black transition-all ${pathname === link.href ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                {link.icon} {link.name}
              </Link>
            ))}
            {isLoggedIn && protectedLinks.map((link) => (
              <Link key={link.name} href={link.href} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black transition-all ${pathname === link.href ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                {link.icon} {link.name}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <Link href="/wallet" className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full hover:bg-yellow-500/20 transition-all">
                   <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center text-[10px] text-white font-black italic">S</div>
                   <span className="text-xs font-black text-yellow-600">{user?.coins || 0}</span>
                </Link>

                <Link href="/notifications" className="relative p-2.5 text-muted-foreground hover:text-primary hidden sm:block">
                  <Bell size={22} />
                  <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-red-500 rounded-full border-2 border-background"></span>
                </Link>
                
                <Link href={`/profile/${user?.id || 'me'}`} className="flex items-center gap-2 rounded-2xl border border-border bg-card p-1 pr-4 text-sm font-bold hover:border-primary/50 transition-all">
                  <div className="h-8 w-8 rounded-xl bg-secondary/20 overflow-hidden flex items-center justify-center text-secondary">
                    {user?.profileImage ? (
                      <img src={user.profileImage} className="w-full h-full object-cover" alt="" />
                    ) : <User size={18} />}
                  </div>
                  <span className="hidden sm:inline">{user?.name.split(' ')[0]}</span>
                </Link>

                <button onClick={handleLogout} className="p-2.5 text-muted-foreground hover:text-red-500 transition-colors hidden sm:block">
                   <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button onClick={() => openAuth('login')} className="px-5 py-2.5 text-sm font-black text-foreground hover:text-primary transition-colors hidden sm:block">Log in</button>
                <button onClick={() => openAuth('signup')} className="group flex items-center gap-2 rounded-2xl bg-foreground text-background dark:bg-primary dark:text-white px-6 py-3 text-sm font-black shadow-xl hover:opacity-90 transition-all active:scale-95">
                  <Sparkles size={16} className="animate-pulse" /> Join Now
                </button>
              </div>
            )}

            <button className="lg:hidden p-2.5 rounded-xl bg-muted/50 text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Overlay Menu */}
        {isMenuOpen && (
          <div className="absolute top-[calc(100%+1px)] left-0 w-full bg-background/95 backdrop-blur-2xl border-b border-border p-6 shadow-2xl lg:hidden flex flex-col gap-4 animate-in slide-in-from-top duration-300">
            {isLoggedIn && (
               <Link href="/wallet" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-black italic">S</div>
                    <div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase leading-none">Safarioo Coins</p>
                      <p className="text-lg font-black text-yellow-600">{user?.coins || 0}</p>
                    </div>
                  </div>
                  <Wallet size={20} className="text-yellow-500" />
               </Link>
            )}

            <div className="grid grid-cols-2 gap-3">
              {publicLinks.map((link) => (
                <Link key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-card border border-border group active:scale-95 transition-all">
                  <div className="p-2 bg-primary/10 text-primary rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">{link.icon}</div>
                  <span className="text-xs font-black uppercase">{link.name}</span>
                </Link>
              ))}
              {isLoggedIn && protectedLinks.map((link) => (
                <Link key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-primary/5 border border-primary/20">
                  <div className="p-2 bg-primary text-white rounded-xl">{link.icon}</div>
                  <span className="text-xs font-black uppercase text-primary">{link.name}</span>
                </Link>
              ))}
            </div>
            
            <hr className="border-border my-2" />
            
            <div className="flex flex-col gap-3">
              {isLoggedIn ? (
                <>
                  <Link href="/notifications" onClick={() => setIsMenuOpen(false)} className="w-full rounded-2xl bg-muted py-4 text-center font-black flex items-center justify-center gap-2 hover:bg-primary/10 transition-all"><Bell size={18}/> Notifications</Link>
                  <Link href={`/profile/${user?.id || 'me'}`} onClick={() => setIsMenuOpen(false)} className="w-full rounded-2xl bg-foreground text-background dark:bg-card dark:text-foreground py-4 text-center font-black">View My Profile</Link>
                  <button onClick={handleLogout} className="w-full py-4 text-center font-black text-red-500 flex items-center justify-center gap-2 hover:bg-red-50 transition-all"><LogOut size={18} /> Logout</button>
                </>
              ) : (
                <>
                  <button onClick={() => openAuth('login')} className="w-full py-4 text-center font-black text-lg">Login</button>
                  <button onClick={() => openAuth('signup')} className="w-full rounded-2xl bg-primary py-4 text-center font-black text-white shadow-lg">Join Safarioo</button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} type={authType} setType={setAuthType} />
    </>
  );
}