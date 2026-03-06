'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [config, setConfig] = useState({
    botName: "Support Bot",
    welcomeMessage: "Hi! How can I help you today?",
    mainColor: "#3b82f6",
    position: 'right',
    avatarUrl: "",
    id: "dummy-bot-id" 
  });

  useEffect(() => {
    const isEmbed = window.location.pathname.includes('/embed');
    if (!isEmbed) {
      const savedConfig = localStorage.getItem('chatbot_config');
      if (savedConfig) {
        setConfig(JSON.parse(savedConfig));
      }
    }
  }, []);

  // UPDATED: Added shouldSave parameter to prevent fetch errors while typing
  const updateConfig = async (newConfig, shouldSave = true) => {
    // 1. Always update state for the Live Preview
    setConfig(prev => ({ ...prev, ...newConfig }));

    // 2. Only hit the Render API if shouldSave is true
    if (shouldSave) {
      try {
        const response = await fetch('https://chatbot-platform-sgmo.onrender.com/api/widget/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...newConfig, userId: 'user_1' }) 
        });
        const result = await response.json();
        
        if (result.success) {
          const updatedData = {
            ...result.data,
            id: result.data._id // Map MongoDB _id to config.id
          };
          setConfig(updatedData);
          localStorage.setItem('chatbot_config', JSON.stringify(updatedData));
        }
      } catch (err) {
        console.error("Save failed", err); // This catches the "Failed to fetch"
      }
    }
  };

  return (
    <ChatContext.Provider value={{ config, setConfig, updateConfig }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChatConfig = () => useContext(ChatContext);