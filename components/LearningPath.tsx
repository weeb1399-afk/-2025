
import React from 'react';
import { TrainingModule } from '../types';

interface LearningPathProps {
  modules: TrainingModule[];
}

const LearningPath: React.FC<LearningPathProps> = ({ modules }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-bold text-gray-800">المسار التدريبي المخصص (AI Recommendation)</h3>
        <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full font-medium">تم تحديثه بناءً على أداء الاختبار</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-2 h-full bg-blue-500"></div>
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded uppercase tracking-wider">{module.level}</span>
              <span className="text-xs text-gray-400 font-medium">{module.duration}</span>
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">{module.title}</h4>
            <p className="text-sm text-gray-500 mb-6 line-clamp-2 leading-relaxed">{module.description}</p>
            <button className="w-full py-3 bg-gray-50 group-hover:bg-blue-600 group-hover:text-white text-gray-700 font-bold rounded-xl transition-all flex items-center justify-center gap-2">
              ابدأ التعلم الآن
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningPath;
