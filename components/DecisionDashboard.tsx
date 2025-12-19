
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const DecisionDashboard: React.FC = () => {
  const readinessData = [
    { name: 'جاهزية رقمية', value: 68 },
    { name: 'فجوة مهارية', value: 32 },
  ];
  const COLORS = ['#3B82F6', '#E5E7EB'];

  const trendData = [
    { month: 'يناير', value: 45 },
    { month: 'فبراير', value: 52 },
    { month: 'مارس', value: 48 },
    { month: 'أبريل', value: 61 },
    { month: 'مايو', value: 68 },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'نسبة الجاهزية الرقمية', val: '68%', change: '+12%', icon: '🚀' },
          { label: 'حجم الفجوة المهارية', val: '32%', change: '-5%', icon: '📉' },
          { label: 'الموظفين المكتملين', val: '1,240', change: '+84', icon: '👥' },
          { label: 'متوسط تحسن الأداء', val: '24%', change: '+4%', icon: '📈' },
        ].map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl">{card.icon}</span>
              <span className={`text-xs font-bold px-2 py-1 rounded ${card.change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {card.change}
              </span>
            </div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">{card.label}</h4>
            <p className="text-3xl font-bold text-gray-800">{card.val}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-6 text-gray-800">توزيع المهارات المفقودة</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={readinessData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {readinessData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-full"></div><span className="text-xs text-gray-500">مكتسب</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-gray-200 rounded-full"></div><span className="text-xs text-gray-500">فجوة</span></div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-6 text-gray-800">تطور الجاهزية المؤسسية</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#3B82F6" fillOpacity={1} fill="url(#colorVal)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold mb-6 text-gray-800">المهارات المستقبلية الأكثر طلباً (توقعات AI)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { skill: 'تحليل البيانات الضخمة', growth: '94%', category: 'Data & AI' },
            { skill: 'الحوسبة السحابية', growth: '88%', category: 'Infrastructure' },
            { skill: 'الأمن السيبراني الهجين', growth: '82%', category: 'Security' },
            { skill: 'تطبيقات الويب 3', growth: '76%', category: 'Blockchain' },
          ].map((item, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded mb-2 inline-block">{item.category}</span>
              <h5 className="font-bold text-gray-800 mb-1">{item.skill}</h5>
              <p className="text-sm text-gray-500">معدل النمو المتوقع: <span className="text-green-600 font-bold">{item.growth}</span></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DecisionDashboard;
