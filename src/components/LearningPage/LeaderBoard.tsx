
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
 // Sample leaderboard data
  const leaderboardData = {
    weekly: [
      { rank: 1, username: "codeMaster", points: 1250, avatar: "CM", badges: ["Gold", "Expert"] },
      { rank: 2, username: "techNinja", points: 1120, avatar: "TN", badges: ["Silver"] },
      { rank: 3, username: "dataWizard", points: 980, avatar: "DW", badges: ["Bronze", "Rising Star"] },
      { rank: 4, username: "devPioneer", points: 875, avatar: "DP", badges: [] },
      { rank: 5, username: "codeExplorer", points: 820, avatar: "CE", badges: ["Consistent"] },
      { rank: 6, username: "learningMachine", points: 790, avatar: "LM", badges: [] },
      { rank: 7, username: "algorithmAce", points: 760, avatar: "AA", badges: [] },
      { rank: 8, username: "webCrafter", points: 730, avatar: "WC", badges: ["Dedicated"] },
      { rank: 9, username: "cyberStudent", points: 700, avatar: "CS", badges: [] },
      { rank: 10, username: "pythonPro", points: 680, avatar: "PP", badges: [] },
    ],
    monthly: [
      { rank: 1, username: "dataWizard", points: 4250, avatar: "DW", badges: ["Gold", "Rising Star"] },
      { rank: 2, username: "codeMaster", points: 3980, avatar: "CM", badges: ["Silver", "Expert"] },
      { rank: 3, username: "algorithmAce", points: 3720, avatar: "AA", badges: ["Bronze"] },
      { rank: 4, username: "techNinja", points: 3540, avatar: "TN", badges: [] },
      { rank: 5, username: "webCrafter", points: 3320, avatar: "WC", badges: ["Dedicated"] },
      { rank: 6, username: "pythonPro", points: 3150, avatar: "PP", badges: [] },
      { rank: 7, username: "devPioneer", points: 2980, avatar: "DP", badges: [] },
      { rank: 8, username: "codeExplorer", points: 2840, avatar: "CE", badges: ["Consistent"] },
      { rank: 9, username: "learningMachine", points: 2760, avatar: "LM", badges: [] },
      { rank: 10, username: "cyberStudent", points: 2650, avatar: "CS", badges: [] },
    ],
    alltime: [
      { rank: 1, username: "codeMaster", points: 28750, avatar: "CM", badges: ["Legend", "Expert", "Gold"] },
      { rank: 2, username: "dataWizard", points: 25430, avatar: "DW", badges: ["Silver", "Rising Star"] },
      { rank: 3, username: "techNinja", points: 23980, avatar: "TN", badges: ["Bronze"] },
      { rank: 4, username: "algorithmAce", points: 21540, avatar: "AA", badges: ["Veteran"] },
      { rank: 5, username: "webCrafter", points: 19870, avatar: "WC", badges: ["Dedicated"] },
      { rank: 6, username: "pythonPro", points: 18650, avatar: "PP", badges: ["Specialist"] },
      { rank: 7, username: "devPioneer", points: 17980, avatar: "DP", badges: [] },
      { rank: 8, username: "codeExplorer", points: 16740, avatar: "CE", badges: ["Consistent"] },
      { rank: 9, username: "learningMachine", points: 15920, avatar: "LM", badges: ["Determined"] },
      { rank: 10, username: "cyberStudent", points: 14850, avatar: "CS", badges: [] },
    ],
  };
  

  // Badge color mapping
  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Gold': return 'bg-amber-500 text-white';
      case 'Silver': return 'bg-gray-300 text-gray-800';
      case 'Bronze': return 'bg-amber-700 text-white';
      case 'Expert': return 'bg-blue-600 text-white';
      case 'Rising Star': return 'bg-purple-500 text-white';
      case 'Consistent': return 'bg-green-600 text-white';
      case 'Dedicated': return 'bg-indigo-600 text-white';
      case 'Legend': return 'bg-red-600 text-white';
      case 'Veteran': return 'bg-gray-700 text-white';
      case 'Specialist': return 'bg-teal-600 text-white';
      case 'Determined': return 'bg-orange-600 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  // Function to get rank styling
  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'text-amber-500 font-bold';
    if (rank === 2) return 'text-gray-400 font-bold';
    if (rank === 3) return 'text-amber-700 font-bold';
    return 'text-gray-700';
  };
function LeaderBoard() {
  const [leaderboardTimeframe, setLeaderboardTimeframe] = useState('weekly');
const currentLeaderboard = leaderboardData[leaderboardTimeframe as keyof typeof leaderboardData];

  return (
        <section>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <i className="fas fa-trophy mr-3"></i>
                  Leaderboard
                </h2>
                
                <Tabs 
                  value={leaderboardTimeframe} 
                  onValueChange={setLeaderboardTimeframe}
                  className="bg-white/20 rounded-lg p-1"
                >
                  <TabsList className="grid grid-cols-3 w-[300px]">
                    <TabsTrigger value="weekly" className="!rounded-button whitespace-nowrap cursor-pointer">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly" className="!rounded-button whitespace-nowrap cursor-pointer">Monthly</TabsTrigger>
                    <TabsTrigger value="alltime" className="!rounded-button whitespace-nowrap cursor-pointer">All Time</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            
            <div className="p-6">
              {/* Top 3 Performers */}
              <div className="flex flex-col md:flex-row justify-center items-center md:items-end space-y-6 md:space-y-0 md:space-x-8 mb-10">
                {/* 2nd Place */}
                <div className="order-1 md:order-1 text-center">
                  <div className="relative">
                    <div className="w-20 h-20 md:w-24 md:h-24 mx-auto bg-gray-200 rounded-full overflow-hidden border-4 border-gray-300 shadow-md">
                      <Avatar className="w-full h-full">
                        <AvatarImage src={`https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20with%20neutral%20expression%2C%20high%20quality%20photography%2C%20soft%20lighting%2C%20professional%20backdrop%2C%20clean%20professional%20look&width=200&height=200&seq=avatar${currentLeaderboard[1].username}&orientation=squarish`} />
                        <AvatarFallback>{currentLeaderboard[1].avatar}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                      <span className="text-gray-800 font-bold">2</span>
                    </div>
                  </div>
                  <h3 className="mt-4 font-semibold text-gray-800">{currentLeaderboard[1].username}</h3>
                  <p className="text-gray-500 font-medium">{currentLeaderboard[1].points.toLocaleString()} pts</p>
                  <div className="flex justify-center mt-2 space-x-1">
                    {currentLeaderboard[1].badges.map((badge:any, idx:any) => (
                      <Badge key={idx} className={`${getBadgeColor(badge)} text-xs`}>{badge}</Badge>
                    ))}
                  </div>
                </div>
                
                {/* 1st Place */}
                <div className="order-0 md:order-2 text-center transform md:translate-y-0 scale-110">
                  <div className="relative">
                    <div className="w-24 h-24 md:w-32 md:h-32 mx-auto bg-amber-100 rounded-full overflow-hidden border-4 border-amber-500 shadow-lg">
                      <Avatar className="w-full h-full">
                        <AvatarImage src={`https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20with%20neutral%20expression%2C%20high%20quality%20photography%2C%20soft%20lighting%2C%20professional%20backdrop%2C%20clean%20professional%20look&width=200&height=200&seq=avatar${currentLeaderboard[0].username}&orientation=squarish`} />
                        <AvatarFallback>{currentLeaderboard[0].avatar}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                      <span className="text-white font-bold text-lg">1</span>
                    </div>
                  </div>
                  <h3 className="mt-4 font-bold text-xl text-gray-900">{currentLeaderboard[0].username}</h3>
                  <p className="text-blue-600 font-semibold">{currentLeaderboard[0].points.toLocaleString()} pts</p>
                  <div className="flex justify-center mt-2 space-x-1 flex-wrap">
                    {currentLeaderboard[0].badges.map((badge:any, idx:any) => (
                      <Badge key={idx} className={`${getBadgeColor(badge)} text-xs mt-1`}>{badge}</Badge>
                    ))}
                  </div>
                </div>
                
                {/* 3rd Place */}
                <div className="order-2 md:order-3 text-center">
                  <div className="relative">
                    <div className="w-20 h-20 md:w-24 md:h-24 mx-auto bg-amber-50 rounded-full overflow-hidden border-4 border-amber-700 shadow-md">
                      <Avatar className="w-full h-full">
                        <AvatarImage src={`https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20with%20neutral%20expression%2C%20high%20quality%20photography%2C%20soft%20lighting%2C%20professional%20backdrop%2C%20clean%20professional%20look&width=200&height=200&seq=avatar${currentLeaderboard[2].username}&orientation=squarish`} />
                        <AvatarFallback>{currentLeaderboard[2].avatar}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-amber-700 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                      <span className="text-white font-bold">3</span>
                    </div>
                  </div>
                  <h3 className="mt-4 font-semibold text-gray-800">{currentLeaderboard[2].username}</h3>
                  <p className="text-gray-500 font-medium">{currentLeaderboard[2].points.toLocaleString()} pts</p>
                  <div className="flex justify-center mt-2 space-x-1">
                    {currentLeaderboard[2].badges.map((badge:any, idx:any) => (
                      <Badge key={idx} className={`${getBadgeColor(badge)} text-xs`}>{badge}</Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              {/* Rest of Leaderboard */}
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Badges</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentLeaderboard.slice(3).map((user:any) => (
                      <tr key={user.rank} className="hover:bg-gray-50 transition-colors cursor-pointer">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`font-medium ${getRankStyle(user.rank)}`}>{user.rank}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <Avatar>
                                <AvatarImage src={`https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20with%20neutral%20expression%2C%20high%20quality%20photography%2C%20soft%20lighting%2C%20professional%20backdrop%2C%20clean%20professional%20look&width=100&height=100&seq=avatar${user.username}&orientation=squarish`} />
                                <AvatarFallback>{user.avatar}</AvatarFallback>
                              </Avatar>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.username}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 font-medium">{user.points.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-1 flex-wrap">
                            {user.badges.length > 0 ? (
                              user.badges.map((badge:any, idx:any) => (
                                <Badge key={idx} className={`${getBadgeColor(badge)} text-xs mt-1`}>{badge}</Badge>
                              ))
                            ) : (
                              <span className="text-sm text-gray-500">-</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 text-center">
                <Button variant="outline" className="!rounded-button whitespace-nowrap cursor-pointer">
                  View Full Leaderboard
                  <i className="fas fa-chevron-right ml-2"></i>
                </Button>
              </div>
            </div>
          </div>
        </section>  )
}

export default LeaderBoard