import type { FC } from "react";
import { useState } from "react";
import { 
  FiAlertTriangle, 
  FiClipboard, 
  FiAward
} from "react-icons/fi";

const NOTIFICATIONS = [
  {
    id: 1,
    type: "alert",
    title: "Missing Assignment",
    description: "Liam Wilson has 3 overdue assignments",
    time: "2 hours ago",
    dateGroup: "Today",
    isNew: true,
    actionRequired: true
  },
  {
    id: 2,
    type: "submission",
    title: "New Assignment Submission",
    description: "Emma Watson submitted 'Algebraic Expressions Worksheet'",
    time: "3 hours ago",
    dateGroup: "Today",
    isNew: true,
    actionRequired: false
  },
  {
    id: 3,
    type: "achievement",
    title: "Student Achievement",
    description: "James Smith earned 'Quiz Master' badge",
    time: "1 day ago",
    dateGroup: "Yesterday",
    isNew: false,
    actionRequired: false
  }
];

const NotificationsPage: FC = () => {
  const [activeTab, setActiveTab] = useState("All Notifications");

  const tabs = ["All Notifications", "Unread", "Alerts"];

  const groupedNotifications = NOTIFICATIONS.reduce((acc, notif) => {
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
        <p className="text-slate-400 font-medium">Stay updated with important alerts</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 flex items-center gap-8">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-sm font-black transition-colors relative ${
              activeTab === tab ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-10">
        {Object.entries(groupedNotifications).map(([group, notifs]) => (
          <div key={group} className="space-y-4">
            <h3 className="text-lg font-black text-slate-800 flex items-center gap-3">
              {group}
              {group === "Today" && (
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 text-[9px] font-black uppercase tracking-wider">
                  2 New
                </span>
              )}
            </h3>
            
            <div className="space-y-4">
              {notifs.map(notif => {
                let borderClass = "";
                let iconClass = "";
                let Icon = FiAlertTriangle;

                if (notif.type === "alert") {
                  borderClass = "border-l-red-500";
                  iconClass = "bg-red-100 text-red-500";
                  Icon = FiAlertTriangle;
                } else if (notif.type === "submission") {
                  borderClass = "border-l-[#FF8000]";
                  iconClass = "bg-orange-100 text-orange-500";
                  Icon = FiClipboard;
                } else if (notif.type === "achievement") {
                  borderClass = "border-l-blue-600";
                  iconClass = "bg-blue-100 text-blue-600";
                  Icon = FiAward;
                }

                return (
                  <div 
                    key={notif.id} 
                    className={`bg-white rounded-3xl p-6 shadow-sm border border-slate-100 border-l-[3px] ${borderClass} flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${iconClass}`}>
                      <Icon className="text-xl" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h4 className="text-sm font-black text-slate-800 mb-1">{notif.title}</h4>
                          <p className="text-xs font-bold text-slate-400 mb-4">{notif.description}</p>
                          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{notif.time}</p>
                        </div>
                        
                        <div className="shrink-0 flex items-center h-full pt-1">
                          {notif.actionRequired ? (
                            <button className="px-3 py-1.5 bg-[#FF8000] text-white text-[9px] font-black uppercase tracking-wider rounded-full hover:bg-orange-600 transition-colors shadow-sm">
                              Action Required
                            </button>
                          ) : notif.isNew ? (
                            <div className="w-3 h-3 rounded-full bg-[#FF8000]" />
                          ) : (
                            <div className="w-3 h-3 rounded-full bg-slate-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
