import type { FC } from "react";
import { FiAlertTriangle, FiClipboard, FiAward, FiFileText } from "react-icons/fi";
import type { Notification } from "./types";

interface NotificationCardProps {
  notification: Notification;
}

const colorMap = {
  alert: {
    barColor: 'bg-[#FF0000]',
    iconBg: 'bg-[#FFD1D1]',
    iconColor: 'text-[#FF0000]',
    icon: FiAlertTriangle,
  },
  info: {
    barColor: 'bg-[#FF8000]',
    iconBg: 'bg-[#FFEAD1]',
    iconColor: 'text-[#FF8000]',
    icon: FiClipboard,
  },
  achievement: {
    barColor: 'bg-[#1600D5]',
    iconBg: 'bg-[#E2E1FF]',
    iconColor: 'text-[#1600D5]',
    icon: FiAward,
  },
  report: {
    barColor: 'bg-[#1600D5]',
    iconBg: 'bg-[#E2E1FF]',
    iconColor: 'text-[#1600D5]',
    icon: FiFileText,
  }
};

const NotificationCard: FC<NotificationCardProps> = ({ notification }) => {
  const styles = colorMap[notification.type as keyof typeof colorMap] || colorMap.info;
  const Icon = styles.icon;

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_20px_0_rgba(0,0,0,0.05)] border border-slate-200 p-6 flex flex-col md:flex-row gap-5 items-start relative overflow-hidden transition-all hover:shadow-[0_4px_25px_0_rgba(0,0,0,0.08)]">
      {/* Colored Left Bar Anchor */}
      <div className={`absolute left-0 top-0 bottom-0 w-[6px] ${styles.barColor}`} />
      
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${styles.iconBg}`}>
        <Icon className={`w-[24px] h-[24px] ${styles.iconColor}`} />
      </div>
      
      <div className="flex flex-col flex-1">
        <h3 className="text-[#1A1C1E] font-extrabold text-[17px] mb-1.5">{notification.title}</h3>
        <p className="text-[#9E9E9E] text-[15px] font-medium leading-relaxed mb-4">
          {notification.description}
        </p>
        <p className="text-[#BDBDBD] text-[12px] font-bold tracking-tight">{notification.timeElapsed}</p>
      </div>

      <div className="flex shrink-0 items-center justify-end md:ml-4 self-center md:self-start mt-4 md:mt-0 min-h-[40px]">
        {notification.actionLabel ? (
          <a 
            href={notification.actionLink || "#"} 
            className="text-[#1600D5] hover:text-indigo-800 text-[14px] font-black tracking-tight transition-colors"
          >
            {notification.actionLabel}
          </a>
        ) : notification.actionRequired ? (
          <button className="bg-[#FF8000] hover:bg-[#e67300] text-white text-[11px] font-bold uppercase py-2 px-4 rounded-full transition-colors">
            Action Required
          </button>
        ) : notification.isUnread ? (
          <div className="w-[14px] h-[14px] rounded-full bg-[#FF8000]"></div>
        ) : (
          <div className="w-[14px] h-[14px] rounded-full bg-[#9E9E9E]"></div>
        )}
      </div>
    </div>
  );
};

export default NotificationCard;
