
import { useAuth } from "@/contexts/AuthContext";
import { useSubjects } from "@/hooks/useSubjects";
import { useLessons } from "@/hooks/useLessons";
import { useUserProgress } from "@/hooks/useUserProgress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Users, Brain, Award, TrendingUp, Clock } from "lucide-react";

interface DashboardProps {
  onNavigate: (section: string) => void;
}

export const Dashboard = ({ onNavigate }: DashboardProps) => {
  const { user } = useAuth();
  const { data: subjects } = useSubjects();
  const { data: lessons } = useLessons();
  const { data: userProgress } = useUserProgress();

  const completedLessons = userProgress?.filter(p => p.status === 'completed').length || 0;
  const totalLessons = lessons?.length || 0;
  const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const recentLessons = lessons?.slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.user_metadata?.full_name || 'Student'}! 👋
          </h1>
          <p className="text-gray-600">Ready to continue your learning journey?</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Subjects</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{subjects?.length || 0}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lessons Completed</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedLessons}</div>
              <p className="text-xs text-muted-foreground">
                of {totalLessons} total lessons
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{progressPercentage}%</div>
              <Progress value={progressPercentage} className="mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(completedLessons * 20)}min
              </div>
              <p className="text-xs text-muted-foreground">
                this week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Continue Learning</CardTitle>
              <CardDescription>Pick up where you left off</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentLessons.map((lesson) => (
                <div key={lesson.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">{lesson.title}</h4>
                    <p className="text-sm text-gray-600">{lesson.duration} minutes</p>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => onNavigate('lessons')}
                  >
                    Continue
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Jump to your favorite features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => onNavigate('ai-tutor')}
              >
                <Brain className="mr-2 h-4 w-4" />
                Ask AI Tutor
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => onNavigate('quizzes')}
              >
                <Award className="mr-2 h-4 w-4" />
                Take a Quiz
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => onNavigate('peer-rooms')}
              >
                <Users className="mr-2 h-4 w-4" />
                Join Study Room
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
