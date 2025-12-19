
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { AssessmentResult } from '../types';

interface SkillGapViewProps {
  result: AssessmentResult;
}

const SkillGapView: React.FC<SkillGapViewProps> = ({ result }) => {
  const chartData = result.skillGaps.map(gap => ({
    name: gap.skill,
    current: gap.currentLevel,
    target: gap.targetLevel,
    demand: gap.marketDemand / 10, // Scale to 1-10
  }));

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-6 text-gray-800 border-r-4 border-blue-500 pr-3">مقارنة المستوى الفعلي بالمطلوب</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="current" fill="#3B82F6" name="المستوى الحالي" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" fill="#10B981" name="المستوى المستهدف" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-6 text-gray-800 border-r-4 border-indigo-500 pr-3">تحليل الاحتياج المستقبلي (3-5 سنوات)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis />
                <Radar
                  name="نمو الطلب في السوق"
                  dataKey="demand"
                  stroke="#6366F1"
                  fill="#6366F1"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold mb-6 text-gray-800 border-r-4 border-orange-500 pr-3">تفاصيل الفجوة المهارية</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="text-gray-400 text-sm border-b">
                <th className="pb-4 font-medium">المهارة</th>
                <th className="pb-4 font-medium text-center">المستوى الحالي</th>
                <th className="pb-4 font-medium text-center">المستوى المطلوب</th>
                <th className="pb-4 font-medium text-center">الفجوة الرقمية</th>
                <th className="pb-4 font-medium text-center">نمو المهارة (5 سنوات)</th>
              </tr>
            </thead>
            <tbody>
              {result.skillGaps.map((gap, i) => (
                <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="py-4 font-bold text-gray-700">{gap.skill}</td>
                  <td className="py-4 text-center">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold">L{gap.currentLevel}</span>
                  </td>
                  <td className="py-4 text-center">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold">L{gap.targetLevel}</span>
                  </td>
                  <td className="py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-orange-500 h-full" 
                          style={{ width: `${Math.max(0, (gap.targetLevel - gap.currentLevel) * 20)}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-orange-600">%{Math.round(Math.max(0, (gap.targetLevel - gap.currentLevel) / gap.targetLevel) * 100)}</span>
                    </div>
                  </td>
                  <td className="py-4 text-center">
                    <span className={`text-sm font-bold ${gap.futureGrowth > 70 ? 'text-green-600' : 'text-gray-600'}`}>
                      {gap.futureGrowth}% +
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SkillGapView;
