// components/course/CourseTabs.tsx

type Tab = {
  id: string;
  label: string;
  icon: string;
};

type CourseTabsProps = {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  tabs: Tab[];
};

export default function CourseTabs({ activeTab, setActiveTab, tabs }: CourseTabsProps) {
  return (
    <div className="bg-white border-b sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className={tab.icon}></i>
              </div>
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}