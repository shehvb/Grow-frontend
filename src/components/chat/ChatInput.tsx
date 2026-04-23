import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';

interface ChatInputProps {
  onSend: (message: string) => void;
  isSending: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, isSending }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && !isSending && content.length <= 500) {
      onSend(content.trim());
      setContent('');
    }
  };

  const isTooLong = content.length > 500;

  return (
    <div className="w-full bg-white border-t border-gray-100 p-4 shrink-0">
      <form onSubmit={handleSubmit} className="flex items-center gap-3 w-full bg-[#f8f9fc] rounded-full p-2 border border-gray-200 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your message...."
          className="flex-1 bg-transparent border-none focus:outline-none px-4 text-[14px] text-gray-700 placeholder-gray-400"
          disabled={isSending}
        />
        <button
          type="submit"
          disabled={!content.trim() || isSending || isTooLong}
          className="w-10 h-10 rounded-full bg-[#FF8000] text-white flex items-center justify-center flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-[#e67300]"
        >
          <FiSend className="w-5 h-5 -ml-1 mt-0.5" />
        </button>
      </form>
      {isTooLong && (
        <p className="text-red-500 text-xs mt-2 ml-4">Message exceeds 500 characters limit.</p>
      )}
    </div>
  );
};

export default ChatInput;
