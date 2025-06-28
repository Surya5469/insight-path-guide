
import { BookOpen, Users, Brain, Award, TrendingUp, Clock } from "lucide-react";

interface DashboardProps {
  onNavigate: (section: string) => void;
}

export const Dashboard = ({ onNavigate }: DashboardProps) => {
  const stats = [
    { label: "Subjects", value: "6", icon: BookOpen, color: "bg-blue-500" },
    { label: "Lessons Completed", value: "24", icon: Award, color: "bg-green-500" },
    { label: "Study Sessions", value: "12", icon: Clock, color: "bg-purple-500" },
    { label: "Peer Connections", value: "8", icon: Users, color: "bg-orange-500" },
  ];

  const quickActions = [
    {
      title: "Continue Math",
      subtitle: "Algebra - Chapter 3",
      action: () => onNavigate("lessons"),
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "AI Tutor Help",
      subtitle: "Get instant answers",
      action: () => onNavigate("ai-tutor"),
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Join Study Room",
      subtitle: "Physics discussion",
      action: () => onNavigate("peer-rooms"),
      color: "from-green-500 to-green-600",
    },
    {
      title: "Take Quiz",
      subtitle: "Science - Week 2",
      action: () => onNavigate("quizzes"),
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, Student! 👋
        </h1>
        <p className="text-gray-600">Ready to learn something new today?</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={action.title}
              onClick={action.action}
              className={`bg-gradient-to-br ${action.color} p-6 rounded-xl text-white hover:scale-105 transition-all duration-200 animate-fade-in`}
              style={{ animationDelay: `${(index + 4) * 100}ms` }}
            >
              <h3 className="font-semibold mb-1">{action.title}</h3>
              <p className="text-sm opacity-90">{action.subtitle}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { action: "Completed", subject: "Math - Quadratic Equations", time: "2 hours ago" },
            { action: "Started", subject: "Science - Chemical Bonds", time: "Yesterday" },
            { action: "Joined", subject: "Physics Study Room", time: "2 days ago" },
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.action}</span> {activity.subject}
                </p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
