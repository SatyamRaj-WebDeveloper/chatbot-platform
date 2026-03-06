'use client';
import DashboardPage from '../../components/dashboard/page.js'; 
import { ChatProvider } from '@/context/ChatContext';

export default function Page() {
  return (
    <ChatProvider>
      <DashboardPage />
    </ChatProvider>
  );
}