'use client';
import { useChatConfig } from '../../context/chatContext.js';
import { Settings, MessageSquare, Palette, Code } from 'lucide-react';

export default function DashboardPage() {
  const { config, updateConfig } = useChatConfig();

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      
      {/* Configuration Column */}
      <div className="space-y-8">
        <header>
          <h1 className="text-4xl font-bold tracking-tighter">Bot Dashboard</h1>
          <p className="text-gray-500 mt-2">Customize your chatbot's identity and behavior.</p>
        </header>

        <section className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-6">
          <div className="flex items-center gap-3 text-blue-500 font-mono text-sm tracking-widest uppercase">
            <Palette size={16} /> Appearance
          </div>
          
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-400">Bot Name</label>
            <input 
              type="text" 
              value={config.botName}
              onChange={(e) => updateConfig({ botName: e.target.value })}
              className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-blue-500 transition-all"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-400">Main Theme Color</label>
            <div className="flex gap-4 items-center">
              <input 
                type="color" 
                value={config.mainColor}
                onChange={(e) => updateConfig({ mainColor: e.target.value })}
                className="w-12 h-12 bg-transparent border-none outline-none cursor-pointer"
              />
              <span className="font-mono text-sm text-gray-500 uppercase">{config.mainColor}</span>
            </div>
          </div>
        </section>

        {/* Snippet Generation */}
        <section className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-4">
          <div className="flex items-center gap-3 text-green-500 font-mono text-sm tracking-widest uppercase">
            <Code size={16} /> Installation
          </div>
          <p className="text-sm text-gray-500">Copy this snippet to embed your bot on any website.</p>
          <div className="bg-black p-4 rounded-xl border border-white/10 font-mono text-xs overflow-x-auto select-all">
            {`<script src="${process.env.NEXT_PUBLIC_API_URL}/widget.js" data-id="${config.id}"></script>`}
          </div>
        </section>
      </div>

      {/* Live Preview Column */}
      <div className="relative h-[600px] border border-white/10 rounded-[3rem] bg-black overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute top-4 left-4 bg-white/10 px-4 py-1.5 rounded-full text-[10px] text-gray-500 font-mono uppercase">
          Live Preview
        </div>
        
        {/* The Actual Widget Preview Component goes here */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full mx-auto" style={{ backgroundColor: config.mainColor }}></div>
          <h3 className="text-xl font-bold">{config.botName}</h3>
          <p className="text-gray-500 max-w-[200px] mx-auto text-sm">{config.welcomeMessage}</p>
        </div>
      </div>
    </div>
  );
}