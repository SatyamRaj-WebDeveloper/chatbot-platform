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
    id: "" // Start empty
  });

  // NEW: Function to load the user's specific bot
  const fetchUserBot = async (token) => {
    try {
      const res = await fetch('https://chatbot-platform-sgmo.onrender.com/api/widget/user-bot', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data) {
        setConfig({
          botName: data.botName,
          welcomeMessage: data.welcomeMessage,
          mainColor: data.mainColor,
          id: data._id // Use the real MongoDB ID
        });
      }
    } catch (err) {
      console.error("Failed to load bot:", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isEmbed = window.location.pathname.includes('/embed');
    
    // If we are in the dashboard and have a token, fetch the real bot
    if (!isEmbed && token) {
      fetchUserBot(token);
    }
  }, []);

  const updateConfig = async (newConfig, authHeaders = {}) => {
    // Prevent calling the API if there is no real ID yet
    if (!config.id || config.id === "dummy-bot-id") return; 

    try {
      const updated = { ...config, ...newConfig };
      setConfig(updated);

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
    }
  };

  return (
    <ChatContext.Provider value={{ config, setConfig, updateConfig }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChatConfig = () => useContext(ChatContext);