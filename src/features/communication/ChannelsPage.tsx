import React, { useEffect } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { useChannelStore } from '../../store/useChannelStore';
import ChannelFeed from '../../components/channel/ChannelFeed';

const ChannelsPage: React.FC = () => {
  const {
    channels,
    posts,
    activeChannelId,
    isLoadingPosts,
    isReacting,
    error,
    fetchPosts,
    toggleReaction,
    setActiveChannel
  } = useChannelStore();

  const activePosts = activeChannelId ? posts[activeChannelId] || [] : [];
  const activeChannel = channels.find(c => c.id === activeChannelId);

  useEffect(() => {
    if (activeChannelId && !posts[activeChannelId]) {
      fetchPosts(activeChannelId);
    }
  }, [activeChannelId, posts, fetchPosts]);

  if (!activeChannelId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <p className="text-gray-400">Select a channel to view announcements</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 h-full bg-[#f8f9fc] overflow-hidden">
      {/* Channel Header */}
      <div className="px-4 sm:px-6 py-4 bg-white border-b border-gray-100 flex items-center shrink-0">
        <button 
          onClick={() => setActiveChannel(null)} 
          className="md:hidden mr-3 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <FiChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="min-w-0">
          <h2 className="font-semibold text-[15px] sm:text-[16px] truncate">#{activeChannel?.name}</h2>
          <p className="text-[11px] sm:text-[12px] text-gray-500 truncate mt-0.5">Read-only announcements from teachers</p>
        </div>
      </div>

      <ChannelFeed 
        posts={activePosts} 
        isLoading={isLoadingPosts} 
        error={error} 
        onRetry={() => fetchPosts(activeChannelId)} 
        onReact={(postId, reaction) => toggleReaction(activeChannelId, postId, reaction)}
        isReactingMap={isReacting}
      />
    </div>
  );
};

export default ChannelsPage;
