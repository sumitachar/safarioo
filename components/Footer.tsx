"use client"
import Link from "next/link";
import { Compass, Facebook, Instagram, Twitter, Youtube, Send, Globe, Mail, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          
          {/* 1. Brand & About */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
                <Compass size={24} />
              </div>
              <span className="text-2xl font-black tracking-tight text-foreground uppercase">
                Safarioo<span className="text-secondary">.</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              India&apos;s most vibrant travel community. We connect solo explorers, squads, and verified agencies to make every journey unforgettable. 
            </p>
            <div className="flex gap-4">
              <Link href="#" className="p-2 rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <Instagram size={18} />
              </Link>
              <Link href="#" className="p-2 rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <Facebook size={18} />
              </Link>
              <Link href="#" className="p-2 rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <Twitter size={18} />
              </Link>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">Explore</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/explore" className="hover:text-primary transition-colors">Trending Destinations</Link></li>
                <li><Link href="/groups" className="hover:text-primary transition-colors">Join a Squad</Link></li>
                <li><Link href="/blogs" className="hover:text-primary transition-colors">Travel Stories</Link></li>
                <li><Link href="/hotels" className="hover:text-primary transition-colors">Verified Hotels</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">For Partners</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/agency/join" className="hover:text-primary transition-colors">Register as Agency</Link></li>
                <li><Link href="/hotel/list" className="hover:text-primary transition-colors">List your Hotel</Link></li>
                <li><Link href="/creator/program" className="hover:text-primary transition-colors">Creator Program</Link></li>
                <li><Link href="/advertise" className="hover:text-primary transition-colors">Advertisement</Link></li>
              </ul>
            </div>
          </div>

          {/* 3. Newsletter */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">Get Travel Tips</h4>
            <p className="text-sm text-muted-foreground">Subscribe to get the best deals and group trip alerts.</p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full bg-background border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              />
              <button className="absolute right-2 top-1.5 p-1.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                <Send size={18} />
              </button>
            </form>
            <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2"><Mail size={14} className="text-secondary" /> hello@Safarioo.com</div>
                <div className="flex items-center gap-2"><Phone size={14} className="text-secondary" /> +91 98765 43210</div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-muted-foreground">
          <p>© {currentYear} Safarioo Media. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground">Terms of Service</Link>
            <div className="flex items-center gap-1 cursor-pointer hover:text-foreground">
              <Globe size={14} /> English (India)
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}