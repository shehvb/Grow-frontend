import { useState, useEffect } from "react";
import type { FC } from "react";
import { useLocation } from "react-router-dom";
import NotificationCard from "./NotificationCard";
import { useNotificationStore } from "../../store/useNotificationStore";

const NotificationsPage: FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'alerts'>('all');
  const location = useLocation();
  const isParent = location.pathname.startsWith('/parent');

  const { notifications, isLoading, error, fetchNotifications } = useNotificationStore();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const title = isParent ? "Notifications" : "Notifications Center";
  const subtitle = isParent 
    ? "Stay updated with your child's academic progress, school events, and achievements."
    : "Stay updated with Mazen's progress, upcoming deadlines, and system alerts.";

  // Assume backend provides timestamps. If not, we fall back to today for now.
  const todayNotifications = notifications.filter(n => {
    if (!n.timeElapsed) return true;
    return n.timeElapsed.toLowerCase().includes('hour') || n.timeElapsed.toLowerCase().includes('min');
  });

  const yesterdayNotifications = notifications.filter(n => {
    if (!n.timeElapsed) return false;
    return n.timeElapsed.toLowerCase().includes('day') || n.timeElapsed.toLowerCase().includes('yesterday');
  });

  const filterNotifications = (notifs: typeof notifications) => {
    switch (activeTab) {
      case 'unread':
        return notifs.filter((n) => n.isUnread);
      case 'alerts':
        return notifs.filter((n) => n.type === 'alert');
      case 'all':
      default:
        return notifs;
    }
  };

  const filteredToday = filterNotifications(todayNotifications);
  const filteredYesterday = filterNotifications(yesterdayNotifications);

  if (isLoading && notifications.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1600D5]"></div>
      </div>
    );
  }

  if (error && notifications.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 space-y-10 pt-8 pb-16">
      <div className="space-y-3">
        <h1 className="text-[36px] font-extrabold text-[#1A1C1E] tracking-tight">{title}</h1>
        <p className="text-[#9E9E9E] font-medium text-[16px] max-w-sm leading-snug">
          {subtitle}
        </p>
      </div>

      <div className="border-b border-slate-200 mb-8 pt-4 overflow-x-auto no-scrollbar">
        <nav className="flex space-x-8 min-w-max">
          <button
            onClick={() => setActiveTab('all')}
            className={`pb-3 px-1 border-b-[3px] font-bold text-base transition-colors ${
              activeTab === 'all'
                ? 'border-[#1600D5] text-[#1600D5]'
                : 'border-transparent text-[#9E9E9E] hover:text-slate-700'
            }`}
          >
            All Notifications
          </button>
          <button
            onClick={() => setActiveTab('unread')}
            className={`pb-3 px-1 border-b-[3px] font-bold text-base transition-colors ${
              activeTab === 'unread'
                ? 'border-[#1600D5] text-[#1600D5]'
                : 'border-transparent text-[#9E9E9E] hover:text-slate-700'
            }`}
          >
            Unread
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className={`pb-3 px-1 border-b-[3px] font-bold text-base transition-colors ${
              activeTab === 'alerts'
                ? 'border-[#1600D5] text-[#1600D5]'
                : 'border-transparent text-[#9E9E9E] hover:text-slate-700'
            }`}
          >
            Alerts
          </button>
        </nav>
      </div>

      <div className="space-y-10 mt-6">
        {/* Today Section */}
        {filteredToday.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-[26px] font-extrabold text-[#1A1C1E]">Today</h2>
              {filteredToday.some(n => n.isUnread) && (
                <span className="bg-[#E1EFFF] text-[#1600D5] text-[11px] font-black uppercase px-2.5 py-1 rounded-full">
                  {filteredToday.filter(n => n.isUnread).length} New
                </span>
              )}
            </div>
            <div className="space-y-4">
              {filteredToday.map((notif) => (
                <NotificationCard key={notif.id} notification={notif} />
              ))}
            </div>
          </div>
        )}

        {/* Yesterday Section */}
        {filteredYesterday.length > 0 && (
          <div>
            <h2 className="text-2xl font-extrabold text-slate-500 mb-4">Yesterday</h2>
            <div className="space-y-4">
              {filteredYesterday.map((notif) => (
                <NotificationCard key={notif.id} notification={notif} />
              ))}
            </div>
          </div>
        )}

        {filteredToday.length === 0 && filteredYesterday.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm mt-4">
            <p className="text-slate-500 font-bold text-lg">No notifications found.</p>
            <p className="text-slate-400 text-sm mt-1">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
