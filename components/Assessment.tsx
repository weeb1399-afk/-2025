
import React, { useState, useEffect, useCallback } from 'react';
import { geminiService } from '../services/geminiService';
import { Question, DifficultyLevel, AssessmentResult } from '../types';

interface AssessmentProps {
  topic: string;
  onComplete: (result: AssessmentResult) => void;
}

const Assessment: React.FC<AssessmentProps> = ({ topic, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [level, setLevel] = useState<DifficultyLevel>(DifficultyLevel.BEGINNER);
  const [answers, setAnswers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const MAX_STEPS = 5;

  const fetchNextQuestion = useCallback(async (currentLevel: DifficultyLevel, perf: string) => {
    setLoading(true);
    try {
      const q = await geminiService.generateNextQuestion(topic, currentLevel, perf);
      setCurrentQuestion(q);
    } catch (error) {
      console.error("Failed to load question", error);
    } finally {
      setLoading(false);
    }
  }, [topic]);

  useEffect(() => {
    fetchNextQuestion(level, "Initial diagnostic start");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAnswer = async (optionIndex: number) => {
    if (!currentQuestion) return;

    const isCorrect = optionIndex === currentQuestion.correctAnswer;
    const newAnswers = [...answers, { question: currentQuestion.text, isCorrect, level: currentQuestion.difficulty }];
    setAnswers(newAnswers);

    if (step >= MAX_STEPS) {
      setLoading(true);
      const result = await geminiService.analyzeAssessment(topic, newAnswers);
      onComplete(result);
      return;
    }

    // Adaptive logic: If correct, maybe move up. If wrong, move down or stay.
    let nextLevel = level;
    if (isCorrect) {
      if (level === DifficultyLevel.BEGINNER) nextLevel = DifficultyLevel.INTERMEDIATE;
      else if (level === DifficultyLevel.INTERMEDIATE) nextLevel = DifficultyLevel.ADVANCED;
      else if (level === DifficultyLevel.ADVANCED) nextLevel = DifficultyLevel.EXPERT;
    } else {
      if (level === DifficultyLevel.EXPERT) nextLevel = DifficultyLevel.ADVANCED;
      else if (level === DifficultyLevel.ADVANCED) nextLevel = DifficultyLevel.INTERMEDIATE;
      else if (level === DifficultyLevel.INTERMEDIATE) nextLevel = DifficultyLevel.BEGINNER;
    }

    setLevel(nextLevel);
    setStep(prev => prev + 1);
    fetchNextQuestion(nextLevel, `Student just answered ${isCorrect ? 'correctly' : 'incorrectly'} at ${currentQuestion.difficulty} level.`);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600 font-medium">يقوم الذكاء الاصطناعي بتحليل مستواك وتوليد السؤال التالي...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-blue-600 px-8 py-4 flex justify-between items-center text-white">
        <div>
          <h2 className="text-xl font-bold">تقييم مهارات: {topic}</h2>
          <p className="text-sm opacity-80">نظام التشخيص المهاري الذكي (AI Diagnostic)</p>
        </div>
        <div className="text-right">
          <span className="block text-xs uppercase opacity-70">المستوى الحالي</span>
          <span className="font-mono font-bold tracking-wider">{level}</span>
        </div>
      </div>

      <div className="p-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-500">التقدم: {step} من {MAX_STEPS}</span>
            <span className="text-sm font-medium text-blue-600">اختبار تكيفي</span>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${(step / MAX_STEPS) * 100}%` }}></div>
          </div>
        </div>

        {currentQuestion && (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-8 leading-relaxed">
              {currentQuestion.text}
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {currentQuestion.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className="group flex items-center p-4 border-2 border-gray-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-right"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-blue-200 flex items-center justify-center text-gray-500 group-hover:text-blue-700 font-bold ml-4 shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="text-lg text-gray-700 group-hover:text-blue-900 font-medium">{opt}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assessment;
