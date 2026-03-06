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

  // Auto-scroll improvement
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

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
      // Error handling improvement
      setMessages(prev => [...prev, { role: 'bot', text: "**Error:** System offline. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

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
        <div className="w-[350px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden text-black border border-gray-100">
          {/* Header */}
          <div style={{ backgroundColor: config.mainColor }} className="p-4 text-white flex justify-between items-center shadow-md">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
               <span className="font-bold text-sm tracking-tight">{config.botName}</span>
            </div>
            {!isPreview && <X size={20} className="cursor-pointer hover:rotate-90 transition-transform" onClick={() => setIsOpen(false)} />}
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 no-scrollbar">
            <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none text-sm shadow-sm max-w-[85%]">
              {config.welcomeMessage}
            </div>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-2xl text-sm max-w-[85%] shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white border border-gray-100 rounded-tl-none'
                }`}>
                  <ReactMarkdown className="prose prose-sm">{m.text}</ReactMarkdown>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium italic">
                <Loader2 size={12} className="animate-spin" /> {config.botName} is thinking...
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t bg-white flex gap-2 items-center">
            <input 
              className="flex-1 text-sm outline-none bg-gray-100 p-2.5 rounded-xl focus:bg-gray-50 transition-colors" 
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