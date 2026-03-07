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
  const updateConfig = async (newConfig, authHeaders = {}) => {
    try {
      // Merge existing config with new changes locally for instant preview
      const updated = { ...config, ...newConfig };
      setConfig(updated);
  
      // Call the database with the Authorization header
      const response = await fetch(`https://chatbot-platform-sgmo.onrender.com/api/widget/config/${config.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders // This passes the Bearer token from the dashboard
        },
        body: JSON.stringify(newConfig),
      });
  
      if (!response.ok) throw new Error('Failed to update DB');
    } catch (err) {
      console.error("Update Error:", err);
    }
  };

  return (
    <ChatContext.Provider value={{ config, setConfig, updateConfig }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChatConfig = () => useContext(ChatContext);