
import React, { useState } from 'react';
import Header from './components/Header';
import Assessment from './components/Assessment';
import SkillGapView from './components/SkillGapView';
import LearningPath from './components/LearningPath';
import DecisionDashboard from './components/DecisionDashboard';
import { AssessmentResult } from './types';

function App() {
  const [currentView, setCurrentView] = useState<'student' | 'admin'>('student');
  const [assessmentState, setAssessmentState] = useState<'intro' | 'testing' | 'results'>('intro');
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [selectedTopic, setSelectedTopic] = useState('تحليل البيانات والذكاء الاصطناعي');

  const startAssessment = () => {
    setAssessmentState('testing');
  };

  const onAssessmentComplete = (result: AssessmentResult) => {
    setAssessmentResult(result);
    setAssessmentState('results');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onViewChange={setCurrentView} currentView={currentView} />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {currentView === 'student' ? (
          <div className="space-y-12">
            {assessmentState === 'intro' && (
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-bold mb-6">
                  الجيل القادم من التعليم الذكي 🚀
                </div>
                <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                  اكتشف إمكاناتك من خلال <span className="text-blue-600 underline decoration-blue-200 decoration-8 underline-offset-8">التشخيص المهاري الذكي</span>
                </h1>
                <p className="text-xl text-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto">
                  نظامنا يستخدم الذكاء الاصطناعي لبناء اختبارات تكيفية تدرك مستواك بدقة، وتصمم لك مساراً تعليمياً يتوافق مع فجواتك المهارية ومتطلبات سوق العمل.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={startAssessment}
                    className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-3"
                  >
                    بدء التقييم التكيفي
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                  </button>
                  <button className="px-10 py-4 bg-white text-gray-700 border-2 border-gray-100 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all">
                    تصفح بنك المهارات
                  </button>
                </div>
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
                  {[
                    { label: 'أطر عالمية (SFIA/WEF)', icon: '🌍' },
                    { label: 'تقييم تكيفي ذكي', icon: '🧠' },
                    { label: 'تحليل الفجوات الرقمية', icon: '📊' },
                    { label: 'مسارات تعليمية ديناميكية', icon: '🛣️' },
                  ].map((feat, i) => (
                    <div key={i} className="p-4">
                      <div className="text-3xl mb-2">{feat.icon}</div>
                      <div className="text-sm font-bold text-gray-700">{feat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {assessmentState === 'testing' && (
              <Assessment 
                topic={selectedTopic} 
                onComplete={onAssessmentComplete} 
              />
            )}

            {assessmentState === 'results' && assessmentResult && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800">تحليلك المهاري جاهز</h2>
                    <p className="text-gray-500">لقد أكملت التقييم بنجاح. إليك تفاصيل مستواك والمسار المقترح.</p>
                  </div>
                  <button 
                    onClick={() => setAssessmentState('intro')}
                    className="text-blue-600 font-bold hover:underline"
                  >
                    إعادة التقييم
                  </button>
                </div>
                
                <div className="grid grid-cols-1 gap-12">
                  <SkillGapView result={assessmentResult} />
                  <LearningPath modules={assessmentResult.recommendations} />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">لوحة دعم القرار التفاعلية</h2>
              <p className="text-gray-500 mt-2">نظرة شاملة على الجاهزية الرقمية والفجوات المهارية للمؤسسة.</p>
            </div>
            <DecisionDashboard />
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-100 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-[10px] font-bold">S</div>
            <span className="font-bold text-gray-900">SkillWise AI 2024</span>
          </div>
          <div className="flex gap-8 text-sm text-gray-400 font-medium">
            <a href="#" className="hover:text-blue-600 transition-colors">عن المنصة</a>
            <a href="#" className="hover:text-blue-600 transition-colors">السياسات</a>
            <a href="#" className="hover:text-blue-600 transition-colors">اتصل بنا</a>
          </div>
          <div className="text-sm text-gray-400">
            يعتمد على نماذج الذكاء الاصطناعي الأكثر تقدماً
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
