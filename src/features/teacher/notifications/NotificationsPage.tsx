import { useState, useEffect } from "react";
import type { FC } from "react";
import NotificationCard from "../../notifications/NotificationCard";
import type { Notification } from "../../notifications/types";
import { teacherService } from "../services/teacher.service";
import type { TeacherNotification as APITeacherNotification } from "../../../types/teacher";

// Extend Notification type just for this file to group by date
interface UITeacherNotification extends Notification {
  dateGroup: string;
}

const getDateGroup = (dateStr: string) => {
  const d = new Date(dateStr);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - d.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays === 0 && now.getDate() === d.getDate()) return "Today";
  if (diffDays <= 1) return "Yesterday";
  return "Older";
};

const getTimeElapsed = (dateStr: string) => {
  const d = new Date(dateStr);
  const now = new Date();
  const diffHrs = Math.floor((now.getTime() - d.getTime()) / (1000 * 3600));
  if (diffHrs === 0) return "Just now";
  if (diffHrs < 24) return `${diffHrs} hours ago`;
  const diffDays = Math.floor(diffHrs / 24);
  return `${diffDays} days ago`;
};

const NotificationsPage: FC = () => {
  const [notifications, setNotifications] = useState<UITeacherNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All Notifications");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const data = await teacherService.getNotificationsFeed();
        const mapped: UITeacherNotification[] = data.map((n: APITeacherNotification) => {
          let tType: 'alert' | 'info' | 'achievement' = 'info';
          if (n.event_type === 'alert' || n.event_type === 'achievement') {
            tType = n.event_type;
          }
          
          let title = "Information";
          if (tType === 'alert') title = "Alert";
          if (tType === 'achievement') title = "Achievement";

          return {
            id: n.id.toString(),
            type: tType,
            title: title,
            description: n.message || '',
            timeElapsed: getTimeElapsed(n.created_at),
            dateGroup: getDateGroup(n.created_at),
            isUnread: !n.is_read,
            actionRequired: tType === 'alert'
          };
        });
        setNotifications(mapped);
      } catch (err) {
        console.error("Failed to fetch notifications", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const tabs = ["All Notifications", "Unread", "Alerts"];

  const filterNotifications = (notifs: UITeacherNotification[]) => {
    switch (activeTab) {
      case 'Unread':
        return notifs.filter((n) => n.isUnread);
      case 'Alerts':
        return notifs.filter((n) => n.type === 'alert');
      case 'All Notifications':
      default:
        return notifs;
    }
  };

  const filteredNotifications = filterNotifications(notifications);

  const groupedNotifications = filteredNotifications.reduce((acc, notif) => {
    if (!acc[notif.dateGroup]) {
      acc[notif.dateGroup] = [];
    }
    acc[notif.dateGroup].push(notif);
    return acc;
  }, {} as Record<string, UITeacherNotification[]>);

  return (
    <div className="space-y-8 animate-fade-in pb-20 max-w-4xl">
      {/* Header Area */}
      <div className="space-y-1">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Notifications</h1>
        <p className="text-slate-400 font-medium">Stay updated with important alerts and student progress</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 flex items-center gap-8">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-sm font-black transition-colors relative ${
              activeTab === tab ? 'text-[#1600D5]' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#1600D5] rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-10">
        {loading ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm mt-4">
            <p className="text-slate-500 font-bold text-lg">Loading notifications...</p>
          </div>
        ) : Object.entries(groupedNotifications).map(([group, notifs]) => (
          <div key={group} className="space-y-4">
            <h3 className="text-[26px] font-extrabold text-[#1A1C1E] flex items-center gap-4 mb-2">
              {group}
              {group === "Today" && notifs.some(n => n.isUnread) && (
                <span className="bg-[#E1EFFF] text-[#1600D5] text-[11px] font-black uppercase px-2.5 py-1 rounded-full">
                  {notifs.filter(n => n.isUnread).length} New
                </span>
              )}
            </h3>
            
            <div className="space-y-4">
              {notifs.map(notif => (
                <NotificationCard key={notif.id} notification={notif} />
              ))}
            </div>
          </div>
        ))}

        {!loading && filteredNotifications.length === 0 && (
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
