'use client';
import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ChatWidget from '../../components/widjet/ChatWidget.js';
import { ChatProvider, useChatConfig } from '../../context/ChatContext.js';

// This component is now safely inside the Provider
function EmbedContent() {
  const searchParams = useSearchParams();
  const botId = searchParams.get('id');
  
  // Accessing the context functions
  const { setConfig } = useChatConfig();

  useEffect(() => {
    const fetchBotData = async () => {
      if (!botId) return;
      
      try {
        const response = await fetch(`http://localhost:5000/api/widget/config/${botId}`);
        const data = await response.json();
        
        if (data && setConfig) {
          // Dynamic update based on the database ID
          setConfig({
            botName: data.botName,
            welcomeMessage: data.welcomeMessage,
            mainColor: data.mainColor,
            position: data.position,
            id: data._id
          });
        }
      } catch (err) {
        console.error("Error fetching bot config:", err);
      }
    };

    fetchBotData();
  }, [botId, setConfig]);

  return (
    <div className="bg-transparent w-full h-full">
      <ChatWidget forceOpen={true} isPreview={false} />
    </div>
  );
}

// Wrap the entire page in the Provider at the highest level
export default function EmbedPage() {
  return (
    <ChatProvider>
      <Suspense fallback={<div className="bg-transparent" />}>
        <EmbedContent />
      </Suspense>
    </ChatProvider>
  );
}