'use client';
import { useEffect, Suspense , useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ChatWidget from '../../components/widget/ChatWidget.js';
import { ChatProvider, useChatConfig } from '@/context/ChatContext';

// This component is now safely inside the Provider
function EmbedContent() {
  const searchParams = useSearchParams();
  const botId = searchParams.get('id');
  const { setConfig } = useChatConfig();
  const [ready, setReady] = useState(false);

  // CRITICAL FIX: Expand the iframe IMMEDIATELY on mount
  useEffect(() => {
    window.parent.postMessage('expand_chatbot', '*');
  }, []);

  useEffect(() => {
    const fetchBotData = async () => {
      if (!botId) return;
      try {
        const response = await fetch(`https://chatbot-platform-sgmo.onrender.com/api/widget/config/${botId}`);
        const result = await response.json(); 
        
        // Correctly accessing the nested data from your MongoDB response
        const botData = result.data || result; 
  
        if (botData) {
          setConfig({
            botName: botData.botName || "Support Bot",
            welcomeMessage: botData.welcomeMessage || "Hi!",
            mainColor: botData.mainColor || "#3b82f6",
            position: botData.position || 'right',
            id: botData._id
          });
          setReady(true);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setReady(true); 
      }
    }; // End of fetchBotData definition
  
    fetchBotData(); // Now it actually runs
  }, [botId, setConfig]); // Correct closing of useEffect

  // Use a full-size transparent div while loading to maintain the iframe size
  if (!ready) return <div className="w-full h-full bg-transparent" />;

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