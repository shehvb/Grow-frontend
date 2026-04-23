import React from 'react';
import type { ChannelPost, ReactionType } from '../../types/channel';
import ReactionButtons from './ReactionButtons';

interface AnnouncementCardProps {
  post: ChannelPost;
  onReact: (postId: string, reaction: ReactionType) => void;
  isReacting: boolean;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ post, onReact, isReacting }) => {
  return (
    <div className="bg-white border text-left border-gray-100 rounded-xl p-6 shadow-sm mb-6 transition-all hover:shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-[#E2E8F0] flex items-center justify-center shrink-0">
           {/* Fallback avatar */}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 text-[15px]">{post.teacherName}</h4>
           <div className="text-[12px] text-gray-500">
            {new Date(post.createdAt).toLocaleDateString([], {
              weekday: 'long',
              hour: '2-digit', 
              minute: '2-digit'
            })}
           </div>
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="font-bold text-gray-900 text-[16px] mb-2">{post.title}</h3>
        <p className="text-gray-700 text-[14px] leading-relaxed whitespace-pre-wrap">{post.content}</p>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <ReactionButtons 
           reactions={post.reactions}
           onReact={(reaction) => onReact(post.id, reaction)}
           isReacting={isReacting}
        />
      </div>
    </div>
  );
};

export default AnnouncementCard;
