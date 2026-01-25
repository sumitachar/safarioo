"use client"
import { Mail, MessageSquare, Send, MapPin, PhoneCall } from "lucide-react";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // এখানে আপনার ফর্ম সাবমিশন লজিক যোগ করতে পারেন
    alert("Message Sent! Our team will contact you soon.");
  };

  return (
    <div className="min-h-screen bg-background py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* --- Left Side: Contact Info --- */}
          <div className="space-y-12">
            <div>
              <h1 className="text-6xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.9]">
                Get In <br />
                <span className="text-primary underline decoration-4 underline-offset-8">Touch.</span>
              </h1>
              <p className="text-muted-foreground font-medium mt-8 text-lg italic max-w-md">
                Have questions about your next squad or technical issues? Our support team is here 24/7 to help you out.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <ContactInfoItem 
                icon={<Mail className="text-primary" size={24}/>} 
                label="Email Support" 
                value="help@safarioo.com" 
              />
              <ContactInfoItem 
                icon={<MessageSquare className="text-primary" size={24}/>} 
                label="Live Chat" 
                value="Available on Dashboard" 
              />
              <ContactInfoItem 
                icon={<MapPin className="text-primary" size={24}/>} 
                label="Office" 
                value="Mumbai, Maharashtra" 
              />
              <ContactInfoItem 
                icon={<PhoneCall className="text-primary" size={24}/>} 
                label="Phone" 
                value="+91 98765 43210" 
              />
            </div>
          </div>

          {/* --- Right Side: Form --- */}
          <div className="bg-card border border-border rounded-[3.5rem] p-8 md:p-12 shadow-2xl relative">
            {/* Decorative element */}
            <div className="absolute -top-4 -right-4 h-24 w-24 bg-primary/10 rounded-full blur-3xl" />
            
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase ml-1 opacity-60 tracking-widest">Your Name</label>
                  <input required type="text" placeholder="John Doe" className="w-full px-6 py-4 bg-muted/40 rounded-2xl font-bold border-none outline-none focus:ring-2 focus:ring-primary transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase ml-1 opacity-60 tracking-widest">Email</label>
                  <input required type="email" placeholder="john@example.com" className="w-full px-6 py-4 bg-muted/40 rounded-2xl font-bold border-none outline-none focus:ring-2 focus:ring-primary transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase ml-1 opacity-60 tracking-widest">Subject</label>
                <select className="w-full px-6 py-4 bg-muted/40 rounded-2xl font-bold border-none outline-none focus:ring-2 focus:ring-primary appearance-none">
                  <option>Booking & Squads</option>
                  <option>Coin & Wallet Issues</option>
                  <option>Trust & Safety</option>
                  <option>Agency Partnership</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase ml-1 opacity-60 tracking-widest">Message</label>
                <textarea required placeholder="Write your message here..." className="w-full h-40 px-6 py-4 bg-muted/40 rounded-3xl font-bold border-none outline-none focus:ring-2 focus:ring-primary resize-none transition-all" />
              </div>

              <button type="submit" className="w-full py-6 bg-foreground text-background dark:bg-primary dark:text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-[11px] shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

function ContactInfoItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-3xl hover:bg-muted/30 transition-all border border-transparent hover:border-border">
      <div className="h-14 w-14 bg-card border border-border rounded-2xl flex items-center justify-center shadow-sm shrink-0">
        {icon}
      </div>
      <div className="mt-1">
        <p className="text-[10px] font-black uppercase opacity-50 tracking-widest leading-none mb-1">{label}</p>
        <p className="font-bold italic text-sm">{value}</p>
      </div>
    </div>
  );
}