'use client';
import { useChatConfig } from '../../context/ChatContext.js'; // Ensure path is correct
import { Settings, MessageSquare, Palette, Code, Layout, BarChart3 } from 'lucide-react';

export default function DashboardPage() {
  const { config, updateConfig } = useChatConfig();

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      
      {/* 1. Configuration Column */}
      <div className="space-y-8">
        <header>
          <h1 className="text-4xl font-bold tracking-tighter text-white">Bot Dashboard</h1>
          <p className="text-gray-500 mt-2 text-sm md:text-base">Customize your chatbot's identity and behavior.</p>
        </header>

        <section className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl space-y-6">
          <div className="flex items-center gap-3 text-blue-500 font-mono text-sm tracking-widest uppercase">
            <Palette size={16} /> Appearance & Identity
          </div>
          
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-400">Bot Name</label>
            <input 
              type="text" 
              placeholder="e.g. Support Bot"
              value={config.botName}
              onChange={(e) => updateConfig({ botName: e.target.value })}
              className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-blue-500 text-white transition-all"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-400">Welcome Message</label>
            <textarea 
              rows="2"
              value={config.welcomeMessage}
              onChange={(e) => updateConfig({ welcomeMessage: e.target.value })}
              className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-blue-500 text-white transition-all resize-none"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-400">Main Theme Color</label>
            <div className="flex gap-4 items-center">
              <input 
                type="color" 
                value={config.mainColor}
                onChange={(e) => updateConfig({ mainColor: e.target.value })}
                className="w-12 h-12 bg-transparent border-none outline-none cursor-pointer rounded-full"
              />
              <span className="font-mono text-sm text-gray-500 uppercase tracking-widest">{config.mainColor}</span>
            </div>
          </div>
        </section>

        {/* 2. Basic Analytics Section */}
        <section className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl space-y-6">
          <div className="flex items-center gap-3 text-orange-500 font-mono text-sm tracking-widest uppercase">
            <BarChart3 size={16} /> Bot Performance
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
              <p className="text-gray-500 text-[10px] uppercase">Conversations</p>
              <p className="text-xl font-bold text-white">1,204</p>
            </div>
            <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
              <p className="text-gray-500 text-[10px] uppercase">Avg. Messages</p>
              <p className="text-xl font-bold text-white">6.4</p>
            </div>
          </div>
        </section>

        {/* 3. Snippet Generation */}
        <section className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl space-y-4">
          <div className="flex items-center gap-3 text-green-500 font-mono text-sm tracking-widest uppercase">
            <Code size={16} /> Installation Snippet
          </div>
          <p className="text-xs text-gray-500 italic">Inject this into any website via a single script tag.</p>
          <div className="bg-black p-4 rounded-xl border border-white/10 font-mono text-[10px] md:text-xs overflow-x-auto select-all text-gray-300">
            {`<script src="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/widget.js" data-id="${config.id}"></script>`}
          </div>
        </section>
      </div>

      {/* 4. Live Preview Column */}
      <div className="relative h-[500px] md:h-[650px] border border-white/10 rounded-[3rem] bg-[#0a0a0a] overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute top-6 left-6 bg-white/5 px-4 py-1.5 rounded-full text-[10px] text-gray-500 font-mono uppercase tracking-widest border border-white/10">
          Live Preview
        </div>
        
        {/* Simulated Widget UI */}
        <div className="w-[300px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col text-black scale-90 md:scale-100">
           <div style={{ backgroundColor: config.mainColor }} className="p-4 text-white flex justify-between items-center transition-colors duration-500">
             <span className="font-bold text-sm">{config.botName}</span>
             <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
           </div>
           <div className="h-64 bg-gray-50 p-4 space-y-3">
              <div className="bg-gray-200 p-3 rounded-lg text-xs max-w-[80%]">
                {config.welcomeMessage}
              </div>
           </div>
           <div className="p-4 border-t bg-white flex gap-2">
              <div className="flex-1 h-8 bg-gray-100 rounded-lg" />
              <div style={{ backgroundColor: config.mainColor }} className="w-8 h-8 rounded-lg opacity-50 transition-colors duration-500" />
           </div>
        </div>

        <p className="mt-8 text-gray-600 text-xs font-mono">Mobile-responsive isolated frame</p>
      </div>
    </div>
  );
}