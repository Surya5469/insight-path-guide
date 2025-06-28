
import { Award, Clock, TrendingUp, Star } from "lucide-react";

export const Quizzes = () => {
  const quizzes = [
    {
      id: 1,
      title: "Algebra Fundamentals",
      subject: "Mathematics",
      questions: 15,
      timeLimit: "20 min",
      highScore: 87,
      attempts: 3,
      status: "available"
    },
    {
      id: 2,
      title: "Chemical Reactions",
      subject: "Science",
      questions: 12,
      timeLimit: "15 min",
      highScore: 92,
      attempts: 2,
      status: "completed"
    },
    {
      id: 3,
      title: "World War II",
      subject: "History",
      questions: 20,
      timeLimit: "25 min",
      highScore: null,
      attempts: 0,
      status: "locked"
    },
    {
      id: 4,
      title: "Physics: Motion",
      subject: "Science",
      questions: 18,
      timeLimit: "30 min",
      highScore: 78,
      attempts: 1,
      status: "available"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Completed</span>;
      case "available":
        return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">Available</span>;
      case "locked":
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">Locked</span>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quizzes</h1>
        <p className="text-gray-600">Test your knowledge and track your progress</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Quizzes Completed</p>
              <p className="text-2xl font-bold text-gray-900">6</p>
            </div>
            <Award className="h-8 w-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Score</p>
              <p className="text-2xl font-bold text-gray-900">85%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Best Score</p>
              <p className="text-2xl font-bold text-gray-900">92%</p>
            </div>
            <Star className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Quiz List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizzes.map((quiz, index) => (
          <div
            key={quiz.id}
            className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md animate-fade-in ${
              quiz.status === "locked" ? "opacity-60" : "cursor-pointer"
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{quiz.title}</h3>
                <p className="text-sm text-gray-600">{quiz.subject}</p>
              </div>
              {getStatusBadge(quiz.status)}
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Award className="h-4 w-4 mr-2" />
                {quiz.questions} questions
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                {quiz.timeLimit}
              </div>
            </div>
            
            {quiz.highScore && (
              <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Best Score:</span>
                <span className="text-lg font-bold text-green-600">{quiz.highScore}%</span>
              </div>
            )}
            
            <button
              disabled={quiz.status === "locked"}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                quiz.status === "locked"
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {quiz.status === "locked" ? "Complete Prerequisites" : quiz.attempts > 0 ? "Retake Quiz" : "Start Quiz"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
