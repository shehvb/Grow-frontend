import { useState, useRef, useEffect } from "react";
import type { FC } from "react";
import { FiPaperclip, FiMic, FiSend } from "react-icons/fi";
import { useAIStore } from "../../store/aiStore";

const AITutorPage: FC = () => {
  const { chats, activeChatId, sendMessage } = useAIStore();
  const activeChat = chats.find(c => c.id === activeChatId) || null;
  const messages = activeChat?.messages || [];
  
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (text: string = input) => {
    const messageText = text.trim();
    if (!messageText || !activeChatId) return;

    setInput("");
    setIsTyping(true);

    sendMessage(messageText, () => {
      setIsTyping(false);
    });
  };

  // getMockResponse is now handled inside the store for simplicity, 
  // but we could keep it here if needed for specific page logic.

  return (
    <div className="flex flex-col h-full bg-[#F3F3F3] font-sans text-slate-800 overflow-hidden">
      <div className="flex-1 flex flex-col min-h-0">

        {/* Chat Messages Area - Scrollable */}
        <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center">
          {/* Today Pill */}
          <div className="bg-[#E2E2E2] text-[#8C8C8C] text-xs font-bold px-4 py-1.5 rounded-full mb-6 tracking-wide shrink-0">
            Today
          </div>

          <div className="w-full max-w-3xl space-y-8 pb-4">
            {messages.map((msg) => (
              msg.role === "assistant" ? (
                /* AI Message */
                <div key={msg.id} className="flex flex-col items-start gap-1">
                  <div className="flex items-center gap-2 ml-16 mb-1">
                    <span className="font-extrabold text-[#1600D5] text-sm">Grow AI</span>
                    <span className="text-[10px] text-slate-400 font-bold">{msg.timestamp}</span>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#1600D5] flex items-center justify-center text-white shrink-0 shadow-sm transition-transform hover:scale-105">
                      ✨
                    </div>
                    <div className="bg-white rounded-2xl rounded-tl-sm p-6 shadow-sm max-w-[85%] mt-1 border border-white hover:border-blue-50 transition-colors group">
                      <div className="font-bold text-slate-900 leading-relaxed text-sm tracking-wide whitespace-pre-wrap">
                        {msg.content}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* User Message */
                <div key={msg.id} className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-2 mr-16 mb-1">
                    <span className="text-[10px] text-slate-400 font-bold">{msg.timestamp}</span>
                    <span className="font-extrabold text-slate-900 text-sm">You</span>
                  </div>
                  <div className="flex items-start justify-end gap-4 w-full">
                    <div className="bg-[#1600D5] text-white rounded-2xl rounded-tr-sm p-6 shadow-sm max-w-[85%] mt-1 hover:bg-[#1e0cdb] transition-colors">
                      <p className="font-bold leading-relaxed text-sm tracking-wider">
                        {msg.content}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-slate-400 shrink-0 shadow-sm flex items-center justify-center text-white font-bold">
                      M
                    </div>
                  </div>
                </div>
              )
            ))}

            {isTyping && (
              <div className="flex items-start gap-4 animate-pulse">
                <div className="w-12 h-12 rounded-xl bg-[#1600D5] flex items-center justify-center text-white shrink-0 shadow-sm">
                  ✨
                </div>
                <div className="bg-white rounded-2xl rounded-tl-sm px-6 py-4 shadow-sm mt-1">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Bottom Input Area - Fixed at bottom */}
        <div className="bg-white px-8 py-6 border-t border-slate-100 flex flex-col items-center relative shrink-0">
          {/* Suggestions */}
          <div className={`absolute -top-14 left-0 right-0 flex items-center justify-center gap-4 z-20 transition-all ${messages.length > 1 ? 'opacity-0 pointer-events-none' : 'opacity-100 scale-100'}`}>
            <div className="flex items-center gap-4">
              <button onClick={() => handleSend("Explain Chloroplasts")} className="px-5 py-2.5 rounded-full border border-[#FFD9B3] bg-[#FFF0E0] text-[#FF8000] text-xs font-bold shadow-sm hover:bg-[#ffe5cc] transition-colors focus:outline-none">Explain Chloroplasts</button>
              <button onClick={() => handleSend("Give me an example")} className="px-5 py-2.5 rounded-full border border-[#FFD9B3] bg-[#FFF0E0] text-[#FF8000] text-xs font-bold shadow-sm hover:bg-[#ffe5cc] transition-colors focus:outline-none">Give me an example</button>
              <button onClick={() => handleSend("Why is oxygen released?")} className="px-5 py-2.5 rounded-full border border-[#FFD9B3] bg-[#FFF0E0] text-[#FF8000] text-xs font-bold shadow-sm hover:bg-[#ffe5cc] transition-colors focus:outline-none">Why is oxygen released?</button>
            </div>
          </div>

          <div className="w-full max-w-3xl">
            <div className="relative flex items-center bg-white border border-[#DDDDF4] rounded-xl shadow-sm pl-4 pr-2 py-2 focus-within:ring-1 focus-within:ring-[#1600D5] transition-all">
              <button className="text-[#64748b] hover:text-[#0F172A] p-2 transition-colors">
                <FiPaperclip className="w-[18px] h-[18px] text-slate-500 font-bold" />
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask me anything about your course..."
                className="flex-1 bg-transparent py-3 px-3 text-[13px] font-bold text-slate-800 focus:outline-none placeholder:text-[#94A3B8] placeholder:font-bold tracking-wide"
              />
              <button className="text-[#64748b] hover:text-[#0F172A] p-2 transition-colors">
                <FiMic className="w-5 h-5 text-slate-500" />
              </button>
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className="bg-[#1600D5] text-white p-3.5 mx-1 rounded-lg hover:bg-blue-700 transition-colors shadow-sm focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiSend className="w-[18px] h-[18px] ml-0.5" />
              </button>
            </div>

            <p className="text-center text-[10px] text-[#94a3b8] font-bold mt-5 tracking-[0.03em] uppercase">
              GROW AI can make mistakes. Consider checking important information with your course materials
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITutorPage;
