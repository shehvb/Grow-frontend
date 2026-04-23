import React from 'react';
import type { ChatMessage } from '../../types/chat';

interface MessageBubbleProps {
  message: ChatMessage;
  isStudent: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isStudent }) => {
  const isMine = message.senderId === 'student1' && isStudent;
  const deliveryStatus = message.status === 'failed' ? 'text-red-500' : message.status === 'pending' ? 'text-gray-400' : 'text-gray-500';

  return (
    <div className={`flex w-full mb-4 ${isMine ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[70%] flex flex-col ${isMine ? 'items-end' : 'items-start'}`}>
        <div 
          className={`relative px-4 py-2 text-[15px] shadow-sm
            ${isMine 
              ? 'bg-white border-r-4 border-[#FF8000] rounded-l-xl rounded-br-none text-gray-800' 
              : 'bg-white border-l-4 border-[#1600D5] rounded-r-xl rounded-bl-none text-gray-800'
            }
          `}
        >
          <p className="whitespace-pre-wrap word-break">{message.content}</p>
        </div>
        
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[11px] text-gray-400 font-medium">
            {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          {isMine && (
             <span className={`text-[10px] ${deliveryStatus}`}>
               {message.status === 'failed' ? 'Failed' : message.status === 'pending' ? 'Sending...' : ''}
             </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
