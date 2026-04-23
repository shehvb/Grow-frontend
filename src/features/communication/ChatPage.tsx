import React, { useEffect } from 'react';
import { useChatStore } from '../../store/useChatStore';
import ChatFeed from '../../components/chat/ChatFeed';
import ChatInput from '../../components/chat/ChatInput';

const ChatPage: React.FC = () => {
  const { 
    teachers, 
    messages, 
    activeTeacherId,
    isLoadingMessages,
    isSending,
    error,
    fetchMessages,
    sendMessage 
  } = useChatStore();

  const activeMessages = activeTeacherId ? messages[activeTeacherId] || [] : [];
  const activeTeacher = teachers.find(t => t.id === activeTeacherId);

  useEffect(() => {
    if (activeTeacherId && !messages[activeTeacherId]) {
      fetchMessages(activeTeacherId);
    }
  }, [activeTeacherId, messages, fetchMessages]);

  if (!activeTeacherId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <p className="text-gray-400">Select a teacher from the sidebar to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#f8f9fc] overflow-hidden">
      {/* Chat Header */}
      <div className="px-6 py-4 bg-white border-b border-gray-100 flex items-center shrink-0">
        <div className="w-10 h-10 rounded-full bg-gray-200 mr-4"></div>
        <div>
          <h2 className="font-semibold text-[16px]">{activeTeacher?.name}</h2>
          <p className="text-[12px] text-gray-500">{activeTeacher?.subject}</p>
        </div>
      </div>

      <ChatFeed 
        messages={activeMessages} 
        isLoading={isLoadingMessages} 
        error={error} 
        onRetry={() => fetchMessages(activeTeacherId)} 
      />
      
      <ChatInput 
        onSend={(content) => sendMessage(activeTeacherId, content)} 
        isSending={isSending} 
      />
    </div>
  );
};

export default ChatPage;
