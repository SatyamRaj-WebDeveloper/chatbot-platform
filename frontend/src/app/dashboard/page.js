'use client';
import DashboardPage from '@/components/dashboard/page'; 
import { ChatProvider } from '@/context/ChatContext';

export default function Page() {
  return (
    <ChatProvider>
      <DashboardPage />
    </ChatProvider>
  );
}