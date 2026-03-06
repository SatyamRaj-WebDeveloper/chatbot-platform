'use client';
import { useState, useEffect, useRef } from 'react';
import { useChatConfig } from '@/context/ChatContext';
import ReactMarkdown from 'react-markdown';
import { Send, X, MessageCircle, Loader2 } from 'lucide-react';

export default function ChatWidget({ isPreview = false, forceOpen = false }) {
  const { config } = useChatConfig();
  const [isOpen, setIsOpen] = useState(forceOpen);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  // 1. Requirement Met: Auto-scroll logic
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // 2. Requirement Met: Fully Isolated Style Communication
  useEffect(() => {
    // We use a small delay to ensure the DOM is ready before expanding
    const timeout = setTimeout(() => {
      if (isOpen || forceOpen) {
        window.parent.postMessage('expand_chatbot', '*');
      } else {
        window.parent.postMessage('minimize_chatbot', '*');
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, [isOpen, forceOpen]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      if (!res.ok) throw new Error("Server disconnected");

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'bot', text: data.reply }]);
    } catch (err) {
      // 3. Requirement Met: Error handling
      setMessages(prev => [...prev, { role: 'bot', text: "**Error:** System offline. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  // 4. UI Polish: Ensure the container takes full height of the iframe
  return (
    <div className={isPreview ? "relative" : `fixed ${config.position === 'right' ? 'right-6' : 'left-6'} bottom-6 z-[999]`}>
      {(!isOpen && !isPreview) ? (
        <button
          onClick={() => setIsOpen(true)}
          style={{ backgroundColor: config.mainColor }}
          className="p-4 rounded-full shadow-2xl text-white hover:scale-110 transition-transform active:scale-95"
        >
          <MessageCircle size={28} />
        </button>
      ) : (
        <div className="w-[350px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden text-black border border-gray-100 animate-in fade-in zoom-in duration-300">
          {/* Header */}
          <div style={{ backgroundColor: config.mainColor }} className="p-4 text-white flex justify-between items-center shadow-md shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="font-bold text-sm tracking-tight">{config.botName}</span>
            </div>
            {!isPreview && (
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                <X size={20} />
              </button>
            )}
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 no-scrollbar">
            <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none text-sm shadow-sm max-w-[85%]">
              {config.welcomeMessage}
            </div>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
                <div className={`p-3 rounded-2xl text-sm max-w-[85%] shadow-sm ${m.role === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-white border border-gray-100 rounded-tl-none'
                  }`}>
                  <div className="prose prose-sm max-w-none">
                    <ReactMarkdown>{m.text}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium italic">
                <Loader2 size={12} className="animate-spin" /> {config.botName} is thinking...
              </div>
            )}
            {/* Critical: Empty div for scrolling */}
            <div ref={scrollRef} className="h-2" />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t bg-white flex gap-2 items-center shrink-0">
            <input
              className="flex-1 text-sm outline-none bg-gray-100 p-2.5 rounded-xl focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all"
              placeholder="Ask anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              disabled={isTyping}
              style={{ color: config.mainColor }}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-30"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}