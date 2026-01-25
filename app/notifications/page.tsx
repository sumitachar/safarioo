"use client"
import { Bell, CheckCircle2, MessageSquare, Star, Trash2 } from "lucide-react";

export default function NotificationsPage() {
  const notifications = [
    { id: 1, type: 'review', text: "Arjun Jaitley gave you a 5-star review!", time: "2 hours ago", read: false, icon: <Star className="text-yellow-500" size={18} /> },
    { id: 2, type: 'message', text: "You have a new message from The Himalayan Agency", time: "5 hours ago", read: true, icon: <MessageSquare className="text-blue-500" size={18} /> },
    { id: 3, type: 'system', text: "Identity Verified! Welcome to the Trusted Traveler squad.", time: "1 day ago", read: true, icon: <CheckCircle2 className="text-green-500" size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-background p-6 md:p-12 max-w-4xl mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">Alerts</h1>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Manage your traveler activity</p>
        </div>
        <button className="p-3 bg-muted rounded-2xl hover:bg-red-500/10 hover:text-red-500 transition-all">
          <Trash2 size={20} />
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((notif) => (
          <div key={notif.id} className={`p-6 rounded-[2rem] border transition-all flex items-center gap-5 ${notif.read ? 'bg-card border-border' : 'bg-primary/5 border-primary/20 shadow-lg shadow-primary/5'}`}>
            <div className={`h-14 w-14 rounded-2xl flex items-center justify-center ${notif.read ? 'bg-muted' : 'bg-white shadow-sm'}`}>
              {notif.icon}
            </div>
            <div className="flex-1">
              <p className={`text-sm italic tracking-tight ${notif.read ? 'font-medium' : 'font-black'}`}>{notif.text}</p>
              <span className="text-[10px] font-bold opacity-50 uppercase mt-1 block tracking-widest">{notif.time}</span>
            </div>
            {!notif.read && <div className="h-2 w-2 bg-primary rounded-full" />}
          </div>
        ))}
      </div>
    </div>
  );
}