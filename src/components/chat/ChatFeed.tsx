import React, { useEffect, useRef } from 'react';
import type { ChatMessage } from '../../types/chat';
import MessageBubble from './MessageBubble';
import { FiAlertCircle } from 'react-icons/fi';

interface ChatFeedProps {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

const ChatFeed: React.FC<ChatFeedProps> = ({ messages, isLoading, error, onRetry }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (isLoading && messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1600D5]"></div>
      </div>
    );
  }

  if (error && messages.length === 0) {
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

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        <p>No messages yet. Send a message to start the conversation!</p>
      </div>
    );
  }

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 scroll-smooth">
      <div className="flex flex-col">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} isStudent={msg.senderId === 'student1'} />
        ))}
      </div>
    </div>
  );
};

export default ChatFeed;
