'use client';
import { useState, useEffect } from 'react';
import { useChatConfig } from '@/context/ChatContext';

export default function DashboardPage() {
  const { config, setConfig } = useChatConfig();

  // 1. Create local state to "buffer" the typing
  const [localConfig, setLocalConfig] = useState({
    botName: config.botName,
    welcomeMessage: config.welcomeMessage,
    mainColor: config.mainColor
  });

  // 2. Keep local state in sync if global config changes externally
  useEffect(() => {
    setLocalConfig({
      botName: config.botName,
      welcomeMessage: config.welcomeMessage,
      mainColor: config.mainColor
    });
  }, [config.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Update local state IMMEDIATELY for smooth typing
    setLocalConfig(prev => ({ ...prev, [name]: value }));

    // Update global context for the "Live Preview"
    // We use a small delay or direct update here so the preview matches
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8">
      {/* Configuration Column */}
      <div className="flex-1 space-y-6">
        <h1 className="text-2xl font-bold">Bot Dashboard</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Bot Name</label>
            <input
              name="botName"
              className="w-full p-2 border rounded bg-gray-800 text-white"
              value={localConfig.botName} // Link to LOCAL state
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Welcome Message</label>
            <textarea
              name="welcomeMessage"
              className="w-full p-2 border rounded bg-gray-800 text-white"
              value={localConfig.welcomeMessage} // Link to LOCAL state
              onChange={handleInputChange}
            />
          </div>
          
          {/* Rest of your UI (Color picker, etc.) */}
        </div>
      </div>

      {/* Live Preview Column - Uses global 'config' for the widget display */}
      <div className="w-80">
         <h2 className="text-lg font-semibold mb-4">Live Preview</h2>
         <div style={{ borderColor: config.mainColor }} className="border-2 rounded-xl p-4">
            <div style={{ backgroundColor: config.mainColor }} className="p-2 text-white">
               {config.botName}
            </div>
            <div className="p-4 bg-gray-100 text-black">
               {config.welcomeMessage}
            </div>
         </div>
      </div>
    </div>
  );
}