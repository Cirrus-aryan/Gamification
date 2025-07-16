import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
function Sidebar({setActiveTab,activeTab}: { setActiveTab: (tab: string) => void, activeTab: string }) {
  return (
<aside className="w-64 bg-slate-900 text-white flex flex-col">
          <div className="p-6 border-b border-slate-700">
            <div className="flex items-center space-x-2">
              <i className="fas fa-graduation-cap text-blue-400 text-2xl"></i>
              <h1 className="text-xl font-bold">EduLearn Admin</h1>
            </div>
          </div>
          
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="px-4 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Main
            </div>
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center px-4 py-3 text-left ${activeTab === 'dashboard' ? 'bg-slate-800 text-blue-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
            >
              <i className="fas fa-chart-line w-5 h-5 mr-3"></i>
              <span>Dashboard</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('courses')}
              className={`w-full flex items-center px-4 py-3 text-left ${activeTab === 'courses' ? 'bg-slate-800 text-blue-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
            >
              <i className="fas fa-book w-5 h-5 mr-3"></i>
              <span>Courses</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center px-4 py-3 text-left ${activeTab === 'users' ? 'bg-slate-800 text-blue-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
            >
              <i className="fas fa-users w-5 h-5 mr-3"></i>
              <span>Users</span>
            </button>
            
            <div className="px-4 mt-6 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Management
            </div>
            
            <button 
              onClick={() => setActiveTab('reports')}
              className={`w-full flex items-center px-4 py-3 text-left ${activeTab === 'reports' ? 'bg-slate-800 text-blue-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
            >
              <i className="fas fa-chart-bar w-5 h-5 mr-3"></i>
              <span>Reports</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center px-4 py-3 text-left ${activeTab === 'settings' ? 'bg-slate-800 text-blue-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
            >
              <i className="fas fa-cog w-5 h-5 mr-3"></i>
              <span>Settings</span>
            </button>
          </nav>
          
          <div className="p-4 border-t border-slate-700">
            <div className="flex items-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20of%20a%20middle%20aged%20person%20with%20neutral%20expression%20in%20business%20attire%2C%20high%20quality%20photography%2C%20clean%20background%2C%20professional%20lighting&width=100&height=100&seq=admin1&orientation=squarish" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-slate-400">admin@edulearn.com</p>
              </div>
            </div>
          </div>
        </aside>  )
}

export default Sidebar