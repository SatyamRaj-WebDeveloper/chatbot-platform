// src/app/dashboard/layout.js
import { ChatProvider } from '../../context/ChatContext.js';

export default function DashboardLayout({ children }) {
  return (
    <ChatProvider>
      <div className="bg-[#050505] min-h-screen">
        {children}
      </div>
    </ChatProvider>
  );
}