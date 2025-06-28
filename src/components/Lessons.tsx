
import { PlayCircle, CheckCircle, Clock, BookOpen } from "lucide-react";

export const Lessons = () => {
  const lessons = [
    {
      id: 1,
      title: "Introduction to Algebra",
      subject: "Mathematics",
      duration: "15 min",
      status: "completed",
      difficulty: "Beginner"
    },
    {
      id: 2,
      title: "Linear Equations",
      subject: "Mathematics",
      duration: "20 min",
      status: "completed",
      difficulty: "Beginner"
    },
    {
      id: 3,
      title: "Quadratic Functions",
      subject: "Mathematics",
      duration: "25 min",
      status: "in-progress",
      difficulty: "Intermediate"
    },
    {
      id: 4,
      title: "Chemical Bonding",
      subject: "Science",
      duration: "18 min",
      status: "not-started",
      difficulty: "Intermediate"
    },
    {
      id: 5,
      title: "Atomic Structure",
      subject: "Science",
      duration: "22 min",
      status: "completed",
      difficulty: "Beginner"
    },
    {
      id: 6,
      title: "Newton's Laws",
      subject: "Science",
      duration: "30 min",
      status: "not-started",
      difficulty: "Advanced"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "in-progress":
        return <PlayCircle className="h-5 w-5 text-blue-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "border-green-200 bg-green-50";
      case "in-progress":
        return "border-blue-200 bg-blue-50";
      default:
        return "border-gray-200 bg-white";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Lessons</h1>
        <p className="text-gray-600">Continue your learning journey with structured lessons</p>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson, index) => (
          <div
            key={lesson.id}
            className={`border rounded-xl p-6 transition-all duration-200 hover:shadow-md cursor-pointer animate-fade-in ${getStatusColor(lesson.status)}`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {getStatusIcon(lesson.status)}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{lesson.title}</h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-600 flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {lesson.subject}
                    </span>
                    <span className="text-sm text-gray-600 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {lesson.duration}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                      {lesson.difficulty}
                    </span>
                  </div>
                </div>
              </div>
              
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200">
                {lesson.status === "completed" ? "Review" : lesson.status === "in-progress" ? "Continue" : "Start"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
