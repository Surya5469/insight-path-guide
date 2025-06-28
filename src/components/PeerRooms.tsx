
import { useState } from "react";
import { Users, MessageCircle, Video, UserPlus, Clock } from "lucide-react";

export const PeerRooms = () => {
  const [activeTab, setActiveTab] = useState("browse");

  const studyRooms = [
    {
      id: 1,
      name: "Physics Problem Solving",
      subject: "Science",
      participants: 8,
      maxParticipants: 12,
      status: "active",
      topic: "Mechanics and Motion",
      host: "Sarah Chen",
      duration: "2h 15m"
    },
    {
      id: 2,
      name: "Calculus Study Group",
      subject: "Mathematics",
      participants: 5,
      maxParticipants: 8,
      status: "active",
      topic: "Integration Techniques",
      host: "Mike Johnson",
      duration: "1h 30m"
    },
    {
      id: 3,
      name: "History Discussion",
      subject: "History",
      participants: 12,
      maxParticipants: 15,
      status: "full",
      topic: "Industrial Revolution",
      host: "Emma Davis",
      duration: "45m"
    },
    {
      id: 4,
      name: "Chemistry Lab Review",
      subject: "Science",
      participants: 3,
      maxParticipants: 6,
      status: "active",
      topic: "Organic Compounds",
      host: "Alex Rivera",
      duration: "3h 05m"
    }
  ];

  const myRooms = [
    {
      id: 1,
      name: "Math Homework Help",
      participants: 4,
      lastActive: "2 hours ago",
      messages: 23
    },
    {
      id: 2,
      name: "Science Project Team",
      participants: 6,
      lastActive: "1 day ago",
      messages: 67
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "full":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Peer Study Rooms</h1>
        <p className="text-gray-600">Connect with classmates and study together</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab("browse")}
          className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
            activeTab === "browse"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Browse Rooms
        </button>
        <button
          onClick={() => setActiveTab("my-rooms")}
          className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
            activeTab === "my-rooms"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          My Rooms
        </button>
      </div>

      {activeTab === "browse" && (
        <div>
          {/* Create Room Button */}
          <div className="mb-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
              <UserPlus className="h-5 w-5" />
              <span>Create New Room</span>
            </button>
          </div>

          {/* Study Rooms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {studyRooms.map((room, index) => (
              <div
                key={room.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{room.name}</h3>
                    <p className="text-sm text-gray-600">{room.subject} • {room.topic}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(room.status)}`}>
                    {room.status === "full" ? "Full" : "Active"}
                  </span>
                </div>

                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {room.participants}/{room.maxParticipants}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {room.duration}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600">Hosted by <span className="font-medium">{room.host}</span></p>
                </div>

                <div className="flex space-x-2">
                  <button
                    disabled={room.status === "full"}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                      room.status === "full"
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {room.status === "full" ? "Room Full" : "Join Room"}
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <MessageCircle className="h-5 w-5 text-gray-600" />
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <Video className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "my-rooms" && (
        <div className="space-y-4">
          {myRooms.map((room, index) => (
            <div
              key={room.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{room.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {room.participants} members
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {room.messages} messages
                    </div>
                    <span>Last active: {room.lastActive}</span>
                  </div>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200">
                  Enter Room
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
