
import React from 'react';

interface HeaderProps {
  onViewChange: (view: 'student' | 'admin') => void;
  currentView: string;
}

const Header: React.FC<HeaderProps> = ({ onViewChange, currentView }) => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">S</div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">SkillWise AI</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onViewChange('student')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'student' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
            >
              بوابة المتدرب
            </button>
            <button 
              onClick={() => onViewChange('admin')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'admin' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
            >
              لوحة القيادة (للمسؤولين)
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
