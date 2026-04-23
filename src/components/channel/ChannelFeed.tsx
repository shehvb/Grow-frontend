import React from 'react';
import type { ChannelPost, ReactionType } from '../../types/channel';
import AnnouncementCard from './AnnouncementCard';
import { FiAlertCircle } from 'react-icons/fi';

interface ChannelFeedProps {
  posts: ChannelPost[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
  onReact: (postId: string, reaction: ReactionType) => void;
  isReactingMap: Record<string, boolean>;
}

const ChannelFeed: React.FC<ChannelFeedProps> = ({ posts, isLoading, error, onRetry, onReact, isReactingMap }) => {
  if (isLoading && posts.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1600D5]"></div>
      </div>
    );
  }

  if (error && posts.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
        <FiAlertCircle className="w-8 h-8 text-red-400 mb-2" />
        <p className="mb-4">{error}</p>
        <button onClick={onRetry} className="px-4 py-2 bg-[#1600D5] text-white rounded-md hover:bg-indigo-700 transition">
          Retry
        </button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        <p>No announcements in this channel yet.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#fcfcfc]">
      <div className="max-w-3xl mx-auto flex flex-col w-full">
        {posts.map((post) => (
          <AnnouncementCard 
            key={post.id} 
            post={post} 
            onReact={onReact} 
            isReacting={!!isReactingMap[post.id]}
          />
        ))}
      </div>
    </div>
  );
};

export default ChannelFeed;
