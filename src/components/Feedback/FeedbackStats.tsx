
export default function FeedbackStats() {
  const stats = [
    {
      icon: 'ri-feedback-line',
      label: 'Total Feedback',
      value: '2,847',
      change: '+12%',
      positive: true
    },
    {
      icon: 'ri-star-fill',
      label: 'Average Rating',
      value: '4.8',
      change: '+0.2',
      positive: true
    },
    {
      icon: 'ri-time-line',
      label: 'Response Time',
      value: '< 24h',
      change: '-15%',
      positive: true
    },
    {
      icon: 'ri-thumb-up-line',
      label: 'Satisfaction',
      value: '96%',
      change: '+3%',
      positive: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center`}>
              <i className={`${stat.icon} text-xl text-blue-600`}></i>
            </div>
            <span className={`text-sm font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
              {stat.change}
            </span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}