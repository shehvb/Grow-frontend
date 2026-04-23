export type NotificationType = 'alert' | 'info' | 'achievement' | 'report';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timeElapsed: string;
  isUnread: boolean;
  actionRequired?: boolean;
  actionLabel?: string;
  actionLink?: string;
}
