import type { Notification } from './types';

export const studentTodayNotifications: Notification[] = [
  {
    id: 'notif_1',
    type: 'alert',
    title: 'Math Assignment - Algebra II',
    description: 'Your missed the submission deadline for the Quadratic Equations assignment.',
    timeElapsed: '2 hours ago',
    isUnread: true,
    actionRequired: true,
  },
  {
    id: 'notif_2',
    type: 'info',
    title: 'Weekly Progress Report Ready',
    description: 'Mazen has excelled in Mathematics this week! Click to view the full breakdown of his performance and areas for improvement.',
    timeElapsed: '3 hours ago',
    isUnread: true,
  }
];

export const studentYesterdayNotifications: Notification[] = [
  {
    id: 'notif_3',
    type: 'achievement',
    title: 'Achievement Unlocked: 7-Day Streak!',
    description: 'Mazen has completed learning activities for 7 consecutive days. Keep up the great momentum!',
    timeElapsed: '1 day ago',
    isUnread: false,
  }
];

export const parentTodayNotifications: Notification[] = [
  {
    id: 'p_notif_1',
    type: 'alert',
    title: 'Math Assignment - Algebra II',
    description: 'Your child missed the submission deadline for the Quadratic Equations assignment.',
    timeElapsed: '2 hours ago',
    isUnread: true,
    actionRequired: true,
  },
  {
    id: 'p_notif_2',
    type: 'info',
    title: 'New Grade Posted: History Essay',
    description: 'Mazen received an A- (92%) on The Industrial Revolution.',
    timeElapsed: '3 hours ago',
    isUnread: true,
  }
];

export const parentYesterdayNotifications: Notification[] = [
  {
    id: 'p_notif_3',
    type: 'report',
    title: 'School Report Cards Available',
    description: "School report cards for Q3 are now available for download. Review your child's academic performance and teacher comments.",
    timeElapsed: '1 day ago',
    isUnread: false,
    actionLabel: 'Download PDF',
    actionLink: '#',
  }
];

// Aliases for compatibility
export const todayNotifications = studentTodayNotifications;
export const yesterdayNotifications = studentYesterdayNotifications;

