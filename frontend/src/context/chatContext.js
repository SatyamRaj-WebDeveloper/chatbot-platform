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

  const updateConfig = (newConfig) => {
    const updated = { ...config, ...newConfig };
    setConfig(updated);
    localStorage.setItem('chatbot_config', JSON.stringify(updated));
  };

  return (
    <ChatContext.Provider value={{ config, updateConfig }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChatConfig = () => useContext(ChatContext);