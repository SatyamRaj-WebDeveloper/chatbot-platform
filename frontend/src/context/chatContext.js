'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [config, setConfig] = useState({
    botName: "Support Bot",
    welcomeMessage: "Hi! How can I help you today?",
    mainColor: "#3b82f6", // Delta4 Blue
    position: 'right',
    avatarUrl: "",
    id: "dummy-bot-id" // In production, this comes from the DB
  });

  // State Persistence Improvement: Load from localStorage
  useEffect(() => {
    const savedConfig = localStorage.getItem('chatbot_config');
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
  }, []);

 // src/context/ChatContext.js
const updateConfig = async (newConfig) => {
  try {
      // 1. Update local state immediately for "Live Preview"
      setConfig(prev => ({ ...prev, ...newConfig }));

      // 2. Persist to MongoDB
      const response = await fetch('http://localhost:5000/api/widget/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
              ...newConfig, 
              userId: 'user_1' // Match the userId in your controller
          })
      });

      if (!response.ok) throw new Error("Save failed");
      
      // 3. Optional: Also save to LocalStorage as a backup (Improvement)
      localStorage.setItem('chatbot_config', JSON.stringify({ ...config, ...newConfig }));
  } catch (err) {
      console.error("Persistence Error:", err);
  }
};

  return (
    <ChatContext.Provider value={{ config, updateConfig }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChatConfig = () => useContext(ChatContext);