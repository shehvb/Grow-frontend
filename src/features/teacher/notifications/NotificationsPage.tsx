import type { FC } from "react";
import { useState } from "react";
import NotificationCard from "../../notifications/NotificationCard";
import type { Notification } from "../../notifications/types";

// Extend Notification type just for this file to group by date
interface TeacherNotification extends Notification {
  dateGroup: string;
}

const NOTIFICATIONS: TeacherNotification[] = [
  {
    id: "1",
    type: "alert",
    title: "Missing Assignment",
    description: "Liam Wilson has 3 overdue assignments",
    timeElapsed: "2 hours ago",
    dateGroup: "Today",
    isUnread: true,
    actionRequired: true
  },
  {
    id: "2",
    type: "info",
    title: "New Assignment Submission",
    description: "Emma Watson submitted 'Algebraic Expressions Worksheet'",
    timeElapsed: "3 hours ago",
    dateGroup: "Today",
    isUnread: true,
    actionRequired: false
  },
  {
    id: "3",
    type: "achievement",
    title: "Student Achievement",
    description: "James Smith earned 'Quiz Master' badge",
    timeElapsed: "1 day ago",
    dateGroup: "Yesterday",
    isUnread: false,
    actionRequired: false
  }
];

const NotificationsPage: FC = () => {
  const [activeTab, setActiveTab] = useState("All Notifications");

  const tabs = ["All Notifications", "Unread", "Alerts"];

  const filterNotifications = (notifications: typeof NOTIFICATIONS) => {
    switch (activeTab) {
      case 'Unread':
        return notifications.filter((n) => n.isUnread);
      case 'Alerts':
        return notifications.filter((n) => n.type === 'alert');
      case 'All Notifications':
      default:
        return notifications;
    }
  };

  const filteredNotifications = filterNotifications(NOTIFICATIONS);

  const groupedNotifications = filteredNotifications.reduce((acc, notif) => {
    if (!acc[notif.dateGroup]) {
      acc[notif.dateGroup] = [];
    }
    acc[notif.dateGroup].push(notif);
    return acc;
  }, {} as Record<string, typeof NOTIFICATIONS>);

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
        {Object.entries(groupedNotifications).map(([group, notifs]) => (
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

        {filteredNotifications.length === 0 && (
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
