'use client';
import { useEffect, Suspense , useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ChatWidget from '../../components/widjet/ChatWidget.js';
import { ChatProvider, useChatConfig } from '@/context/ChatContext.js';

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
        const data = await response.json();
        
        if (data) {
          setConfig({
            botName: data.botName,
            welcomeMessage: data.welcomeMessage,
            mainColor: data.mainColor,
            position: data.position || 'right',
            id: data._id
          });
          setReady(true);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setReady(true); // Default to "Support Bot" if fetch fails so the user sees something
      }
    };
    fetchBotData();
  }, [botId, setConfig]);

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