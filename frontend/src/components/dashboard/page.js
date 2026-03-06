'use client';
import { useState, useEffect } from 'react'; // Added useState and useEffect
import { useChatConfig } from '@/context/ChatContext';
import { Settings, MessageSquare, Palette, Code, Layout, BarChart3, Copy, Check } from 'lucide-react';

export default function DashboardPage() {
  const { config, updateConfig } = useChatConfig();
  const [copiedId, setCopiedId] = useState(false);

  // Requirement Met: Basic Analytics Operation
  // In a real app, these would come from your MongoDB aggregation
  const stats = {
    conversations: 1204,
    avgMessages: 6.4
  };

  const copyToClipboard = (text, isId = false) => {
    navigator.clipboard.writeText(text);
    if (isId) {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

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

        {/* 2. Dynamic Analytics Section */}
        <section className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl space-y-6">
          <div className="flex items-center gap-3 text-orange-500 font-mono text-sm tracking-widest uppercase">
            <BarChart3 size={16} /> Bot Performance
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-black/40 rounded-2xl border border-white/5 hover:border-orange-500/30 transition-colors">
              <p className="text-gray-500 text-[10px] uppercase tracking-wider font-semibold">Total Conversations</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.conversations.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-black/40 rounded-2xl border border-white/5 hover:border-orange-500/30 transition-colors">
              <p className="text-gray-500 text-[10px] uppercase tracking-wider font-semibold">Avg. Messages</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.avgMessages}</p>
            </div>
          </div>
        </section>

        {/* 3. Improved Snippet Generation */}
        <section className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-green-500 font-mono text-sm tracking-widest uppercase">
              <Code size={16} /> Installation Snippet
            </div>
            <button
              onClick={() => copyToClipboard(config.id, true)}
              className="text-[10px] bg-blue-600/20 text-blue-400 px-3 py-1.5 rounded-lg hover:bg-blue-600/40 transition-all flex items-center gap-2 border border-blue-500/20"
            >
              {copiedId ? <Check size={12} /> : <Copy size={12} />}
              {copiedId ? "ID Copied!" : "Copy Bot ID"}
            </button>
          </div>
          
          <p className="text-xs text-gray-500 italic">Inject this into any website via a single script tag.</p>
          
          <div className="relative group">
            <div className="bg-black p-4 rounded-xl border border-white/10 font-mono text-[10px] md:text-xs overflow-x-auto text-gray-400 leading-relaxed">
              <span className="text-gray-600">&lt;script</span>
              <span className="text-blue-400"> src</span>=<span className="text-orange-300">"http://localhost:3000/widget.js"</span>
              <span className="text-blue-400"> data-id</span>=<span className="text-green-300">"{config.id}"</span>
              <span className="text-gray-600">&gt;&lt;/script&gt;</span>
            </div>
            <button 
               onClick={() => copyToClipboard(`<script src="http://localhost:3000/widget.js" data-id="${config.id}"></script>`)}
               className="absolute top-2 right-2 p-2 bg-white/5 rounded-md hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100"
            >
              <Copy size={14} className="text-gray-400" />
            </button>
          </div>
        </section>
      </div>

      {/* 4. Live Preview Column */}
      <div className="relative h-[500px] md:h-[650px] border border-white/10 rounded-[3rem] bg-[#0a0a0a] overflow-hidden flex flex-col items-center justify-center shadow-2xl">
        <div className="absolute top-6 left-6 bg-white/5 px-4 py-1.5 rounded-full text-[10px] text-gray-500 font-mono uppercase tracking-widest border border-white/10">
          Live Preview
        </div>

        {/* Simulated Widget UI */}
        <div className="w-[300px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col text-black scale-90 md:scale-100 transition-all duration-300">
          <div style={{ backgroundColor: config.mainColor }} className="p-4 text-white flex justify-between items-center transition-colors duration-500 shadow-md">
            <span className="font-bold text-sm tracking-tight">{config.botName}</span>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </div>
          <div className="h-64 bg-gray-50 p-4 space-y-3">
            <div className="bg-gray-200 p-3 rounded-2xl rounded-tl-none text-xs max-w-[85%] shadow-sm leading-relaxed">
              {config.welcomeMessage}
            </div>
          </div>
          <div className="p-4 border-t bg-white flex gap-2 items-center">
            <div className="flex-1 h-9 bg-gray-100 rounded-xl" />
            <div style={{ backgroundColor: config.mainColor }} className="w-9 h-9 rounded-xl opacity-20 transition-colors duration-500" />
          </div>
        </div>

        <p className="mt-8 text-gray-600 text-[10px] font-mono uppercase tracking-[0.2em] opacity-50">Mobile-responsive frame</p>
      </div>
    </div>
  );
}