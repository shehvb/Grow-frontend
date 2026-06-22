import { useState, useRef, useEffect } from "react";
import type { FC } from "react";
import { FiPaperclip, FiMic, FiSend } from "react-icons/fi";
import { useAIStore } from "../../store/aiStore";
import { motion } from "framer-motion";

const aiMsgVariants = {
  hidden: { scale: 0.93, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 180,
      damping: 18
    }
  }
};

const suggContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

const suggItemVariants = {
  hidden: { x: -10, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 150, damping: 15 }
  }
};

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

  // Helper to parse simple markdown formatting in AI responses
  const parseBoldText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={idx} className="font-extrabold text-[#ff8000]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  const parseMessageContent = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, lineIdx) => {
      const trimmed = line.trim();
      
      // 1. Check for horizontal rule/divider
      if (trimmed === "---") {
        return <hr key={lineIdx} className="my-4 border-slate-200" />;
      }

      // 2. Check for H3 heading
      if (line.startsWith("### ")) {
        const headingText = line.substring(4);
        return (
          <h3 key={lineIdx} className="text-base sm:text-lg font-black text-slate-900 mt-4 mb-2 tracking-tight">
            {parseBoldText(headingText)}
          </h3>
        );
      }

      // 3. Check for bullet list item
      if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
        const match = line.match(/^(\s*)([*|-]\s+)(.*)$/);
        const indentClass = match && match[1].length > 0 ? "ml-8" : "ml-4";
        const bulletContent = match ? match[3] : trimmed.substring(2);
        return (
          <div key={lineIdx} className={`flex items-start gap-2 ${indentClass} my-1.5`}>
            <span className="text-[#1600D5] select-none">•</span>
            <span className="text-sm text-slate-800 leading-relaxed font-bold tracking-wide">
              {parseBoldText(bulletContent)}
            </span>
          </div>
        );
      }

      // 4. Normal paragraph (empty or with text)
      if (trimmed === "") {
        return <div key={lineIdx} className="h-2" />;
      }

      return (
        <p key={lineIdx} className="text-sm text-slate-800 leading-relaxed font-bold tracking-wide my-1.5">
          {parseBoldText(line)}
        </p>
      );
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#F3F3F3] font-sans text-slate-800 overflow-hidden">
      <div className="flex-1 flex flex-col min-h-0">

        {/* Chat Messages Area - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col items-center">
          {/* Today Pill */}
          <div className="bg-[#E2E2E2] text-[#8C8C8C] text-xs font-bold px-4 py-1.5 rounded-full mb-6 tracking-wide shrink-0">
            Today
          </div>

          <div className="w-full max-w-3xl space-y-8 pb-4">
            {messages.map((msg) => (
              msg.role === "assistant" ? (
                /* AI Message */
                <motion.div 
                  key={msg.id} 
                  className="flex flex-col items-start gap-1 w-full max-w-full"
                  variants={aiMsgVariants}
                  initial="hidden"
                  animate="visible"
                  style={{ originX: 0, originY: 1 }}
                >
                  <div className="flex items-center gap-2 ml-12 sm:ml-16 mb-1">
                    <span className="font-extrabold text-[#1600D5] text-sm">Grow AI</span>
                    <span className="text-[10px] text-slate-400 font-bold">{msg.timestamp}</span>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#1600D5] flex items-center justify-center text-white shrink-0 shadow-sm transition-transform hover:scale-105">
                      ✨
                    </div>
                    <div className="bg-white rounded-2xl rounded-tl-sm p-4 sm:p-6 shadow-sm max-w-[80%] sm:max-w-[85%] mt-1 border border-white hover:border-blue-50 transition-colors group">
                      <div className="text-slate-900 tracking-wide">
                        {parseMessageContent(msg.content)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* User Message */
                <motion.div 
                  key={msg.id} 
                  className="flex flex-col items-end gap-1 w-full max-w-full"
                  variants={aiMsgVariants}
                  initial="hidden"
                  animate="visible"
                  style={{ originX: 1, originY: 1 }}
                >
                  <div className="flex items-center gap-2 mr-12 sm:mr-16 mb-1">
                    <span className="text-[10px] text-slate-400 font-bold">{msg.timestamp}</span>
                    <span className="font-extrabold text-slate-900 text-sm">You</span>
                  </div>
                  <div className="flex items-start justify-end gap-4 w-full">
                    <div className="bg-[#1600D5] text-white rounded-2xl rounded-tr-sm p-4 sm:p-6 shadow-sm max-w-[80%] sm:max-w-[85%] mt-1 hover:bg-[#1e0cdb] transition-colors">
                      <p className="font-bold leading-relaxed text-sm tracking-wider">
                        {msg.content}
                      </p>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-400 shrink-0 shadow-sm flex items-center justify-center text-white font-bold">
                      M
                    </div>
                  </div>
                </motion.div>
              )
            ))}

            {isTyping && (
              <div className="flex items-start gap-4 animate-pulse w-full">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#1600D5] flex items-center justify-center text-white shrink-0 shadow-sm">
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
        <div className="bg-white px-4 sm:px-8 py-4 sm:py-6 border-t border-slate-100 flex flex-col items-center relative shrink-0">
          <div className={`absolute -top-14 left-0 right-0 overflow-x-auto no-scrollbar flex items-center justify-start sm:justify-center gap-3 px-4 z-20 transition-all ${messages.length > 1 ? 'opacity-0 pointer-events-none' : 'opacity-100 scale-100'}`}>
            <motion.div 
              className="flex items-center gap-3 whitespace-nowrap"
              variants={suggContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.button variants={suggItemVariants} onClick={() => handleSend("Explain Chloroplasts")} className="px-4 py-2 rounded-full border border-[#FFD9B3] bg-[#FFF0E0] text-[#FF8000] text-[11px] font-bold shadow-sm hover:bg-[#ffe5cc] transition-colors focus:outline-none shrink-0">Explain Chloroplasts</motion.button>
              <motion.button variants={suggItemVariants} onClick={() => handleSend("Give me an example")} className="px-4 py-2 rounded-full border border-[#FFD9B3] bg-[#FFF0E0] text-[#FF8000] text-[11px] font-bold shadow-sm hover:bg-[#ffe5cc] transition-colors focus:outline-none shrink-0">Give me an example</motion.button>
              <motion.button variants={suggItemVariants} onClick={() => handleSend("Why is oxygen released?")} className="px-4 py-2 rounded-full border border-[#FFD9B3] bg-[#FFF0E0] text-[#FF8000] text-[11px] font-bold shadow-sm hover:bg-[#ffe5cc] transition-colors focus:outline-none shrink-0">Why is oxygen released?</motion.button>
            </motion.div>
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
