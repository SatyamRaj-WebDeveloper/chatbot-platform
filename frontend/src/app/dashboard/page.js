'use client';
import DashboardPage from '../../components/dashboard/page.js'; 
import { ChatProvider } from '../../../src/context/ChatContext.js';

export default function Page() {
  return (
    <ChatProvider>
      <DashboardPage />
    </ChatProvider>
  );
}