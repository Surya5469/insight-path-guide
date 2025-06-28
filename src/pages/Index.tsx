
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Dashboard } from "@/components/Dashboard";
import { Subjects } from "@/components/Subjects";
import { Lessons } from "@/components/Lessons";
import { Quizzes } from "@/components/Quizzes";
import { AITutor } from "@/components/AITutor";
import { PeerRooms } from "@/components/PeerRooms";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard onNavigate={setActiveSection} />;
      case "subjects":
        return <Subjects />;
      case "lessons":
        return <Lessons />;
      case "quizzes":
        return <Quizzes />;
      case "ai-tutor":
        return <AITutor />;
      case "peer-rooms":
        return <PeerRooms />;
      default:
        return <Dashboard onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation activeSection={activeSection} onNavigate={setActiveSection} />
      <main className="pt-16">
        {renderSection()}
      </main>
    </div>
  );
};

export default Index;
