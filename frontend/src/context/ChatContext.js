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
    id: "" 
  });

  // Updated: Load user bot for Dashboard
  const fetchUserBot = async (token) => {
    try {
      const res = await fetch('https://chatbot-platform-sgmo.onrender.com/api/widget/user-bot', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      
      if (res.ok && data) {
        // Use spread to maintain any existing fields
        setConfig(prev => ({
          ...prev,
          botName: data.botName || prev.botName,
          welcomeMessage: data.welcomeMessage || prev.welcomeMessage,
          mainColor: data.mainColor || prev.mainColor,
          id: data._id
        }));
      }
    } catch (err) {
      console.error("Failed to load bot:", err);
    }
  };

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const isEmbed = window.location.pathname.includes('/embed');
    
    // Only fetch for dashboard, Embed Page handles its own fetch via URL ID
    if (!isEmbed && token) {
      fetchUserBot(token);
    }
  }, []);

  const updateConfig = async (newConfig, authHeaders = {}) => {
    // If we're still on a dummy or empty ID, don't hit the API
    if (!config.id || config.id === "dummy-bot-id") return; 

    try {
      // Optimistic Update: Update UI instantly
      setConfig(prev => ({ ...prev, ...newConfig }));

      const response = await fetch(`https://chatbot-platform-sgmo.onrender.com/api/widget/config/${config.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders
        },
        body: JSON.stringify(newConfig),
      });

      if (!response.ok) throw new Error('Failed to update DB');
    } catch (err) {
      console.error("Update Error:", err);
      // Optional: Revert UI state here if needed
    }
  };

  return (
    <ChatContext.Provider value={{ config, setConfig, updateConfig }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChatConfig = () => useContext(ChatContext);