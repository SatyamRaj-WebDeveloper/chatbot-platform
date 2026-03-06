'use client';
import { ChatProvider } from '../../context/chatContext.js';

export default function DashboardLayout({ children }) {
  return (
    <ChatProvider>
      <div className="min-h-screen bg-[#050505] text-white">
        {children}
      </div>
    </ChatProvider>
  );
}