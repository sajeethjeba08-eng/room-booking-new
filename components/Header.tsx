import React from 'react';
import { Home, Menu, User } from 'lucide-react';

interface HeaderProps {
  onGoHome: () => void;
}

const Header: React.FC<HeaderProps> = ({ onGoHome }) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo Area */}
        <button onClick={onGoHome} className="flex items-center gap-2 group">
          <div className="bg-red-600 text-white p-1.5 rounded font-bold text-xl tracking-tighter group-hover:bg-red-700 transition-colors">
            QS
          </div>
          <span className="font-bold text-gray-800 text-lg tracking-tight">QuickStay</span>
        </button>

        {/* Placeholder Nav Items (Visual only for demo) */}
        <div className="flex items-center gap-4 text-gray-600">
          <div className="hidden md:flex items-center gap-4 text-sm font-medium">
            <span className="cursor-pointer hover:text-red-600">List your property</span>
            <span className="cursor-pointer hover:text-red-600">English</span>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <User className="w-5 h-5" />
          </button>
          <button className="md:hidden p-2 hover:bg-gray-100 rounded-full">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;