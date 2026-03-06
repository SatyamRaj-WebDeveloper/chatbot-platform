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
      const response = await fetch('http://localhost:5000/api/widget/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...newConfig, userId: 'user_1' }) 
      });
      const result = await response.json();
      
      if (result.success) {
          // CRITICAL FIX: Update the 'id' in state with the MongoDB _id
          setConfig({
              ...result.data,
              id: result.data._id // Map MongoDB _id to your config.id
          });
          localStorage.setItem('chatbot_config', JSON.stringify({
              ...result.data,
              id: result.data._id
          }));
      }
  } catch (err) {
      console.error("Save failed", err);
  }
};

  return (
    <ChatContext.Provider value={{ config, updateConfig }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChatConfig = () => useContext(ChatContext);