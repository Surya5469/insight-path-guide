
import { BookOpen, Calculator, Atom, Globe, Palette, Music } from "lucide-react";

export const Subjects = () => {
  const subjects = [
    {
      name: "Mathematics",
      icon: Calculator,
      color: "from-blue-500 to-blue-600",
      progress: 75,
      lessons: 12,
      description: "Algebra, Geometry, Calculus"
    },
    {
      name: "Science",
      icon: Atom,
      color: "from-green-500 to-green-600",
      progress: 60,
      lessons: 8,
      description: "Physics, Chemistry, Biology"
    },
    {
      name: "History",
      icon: Globe,
      color: "from-purple-500 to-purple-600",
      progress: 45,
      lessons: 6,
      description: "World History, Ancient Civilizations"
    },
    {
      name: "Art",
      icon: Palette,
      color: "from-pink-500 to-pink-600",
      progress: 80,
      lessons: 10,
      description: "Drawing, Painting, Design"
    },
    {
      name: "Literature",
      icon: BookOpen,
      color: "from-indigo-500 to-indigo-600",
      progress: 55,
      lessons: 9,
      description: "Poetry, Novels, Essays"
    },
    {
      name: "Music",
      icon: Music,
      color: "from-orange-500 to-orange-600",
      progress: 30,
      lessons: 5,
      description: "Theory, Composition, Practice"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Subjects</h1>
        <p className="text-gray-600">Explore your learning journey across different subjects</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject, index) => {
          const Icon = subject.icon;
          return (
            <div
              key={subject.name}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`bg-gradient-to-br ${subject.color} p-4 rounded-lg mb-4 group-hover:scale-105 transition-transform duration-200`}>
                <Icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{subject.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{subject.description}</p>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">{subject.lessons} lessons</span>
                <span className="text-sm font-medium text-gray-700">{subject.progress}%</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`bg-gradient-to-r ${subject.color} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${subject.progress}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
