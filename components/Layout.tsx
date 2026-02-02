
import React from 'react';
import { AppSection } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeSection: AppSection;
  onSectionChange: (section: AppSection) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeSection, onSectionChange }) => {
  const menuItems = [
    { id: AppSection.STRATEGY, label: 'Brand Strategy', icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
    { id: AppSection.IDENTITY, label: 'Visual Identity', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: AppSection.SERVICES, label: 'Service Portfolio', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { id: AppSection.AI_TOOLS, label: 'AI Brand Labs', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.989-2.386l-.548-.547z' },
    { id: AppSection.COLLATERAL, label: 'Collateral & Decks', icon: 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-navy text-white flex flex-col shadow-2xl z-50">
        <div className="p-8 border-b border-blue-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold rounded flex items-center justify-center text-navy font-bold text-xl">F</div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">FALCON GROUP</h1>
              <p className="text-[10px] text-gold tracking-widest uppercase font-semibold">International</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                activeSection === item.id 
                  ? 'bg-gold text-navy shadow-lg font-semibold scale-[1.02]' 
                  : 'hover:bg-blue-900/30 text-blue-100 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 mt-auto border-t border-blue-900/50 bg-blue-950/20">
          <div className="flex items-center gap-3 text-sm text-blue-300">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            System Operational
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="text-slate-500 font-medium">
            Portal / <span className="text-navy">{menuItems.find(m => m.id === activeSection)?.label}</span>
          </div>
          <div className="flex gap-4">
            <button className="px-4 py-1.5 border border-slate-200 rounded-full text-sm font-medium hover:bg-slate-50">Docs</button>
            <button className="px-4 py-1.5 bg-navy text-white rounded-full text-sm font-medium hover:bg-blue-900 shadow-md">Export Assets</button>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
