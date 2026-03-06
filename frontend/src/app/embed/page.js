'use client';
import ChatWidget from '@/components/widget/ChatWidget';
import { ChatProvider } from '../../context/ChatContext.js';

export default function EmbedPage() {
  return (
    <div className="bg-transparent w-full h-full">
      <ChatProvider>
        {/* Pass a prop to hide the bubble and show the full chat window immediately */}
        <ChatWidget forceOpen={true} />
      </ChatProvider>
    </div>
  );
}