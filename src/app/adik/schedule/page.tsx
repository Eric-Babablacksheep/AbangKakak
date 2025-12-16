"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Video,
  VideoOff,
  Plus,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface Session {
  id: string;
  time: string;
  subject: string;
  tutorName: string;
  duration: string;
  type:
    | "physics"
    | "mathematics"
    | "english"
    | "chemistry"
    | "history"
    | "biology";
  status: "upcoming" | "available" | "completed";
  date: Date;
  roomLink?: string;
}

const mockSessions: Session[] = [
  // Today's sessions
  {
    id: "1",
    time: "2:00 PM",
    subject: "Physics - Forces & Motion",
    tutorName: "Dr. Ahmad Rahman",
    duration: "60 minutes",
    type: "physics",
    status: "upcoming",
    date: new Date(),
    roomLink: "https://meet.abangkakak.com/room/12345",
  },
  {
    id: "2",
    time: "4:30 PM",
    subject: "Mathematics - Calculus",
    tutorName: "Puan Siti Aishah",
    duration: "45 minutes",
    type: "mathematics",
    status: "available",
    date: new Date(),
    roomLink: "https://meet.abangkakak.com/room/12346",
  },
  // Tomorrow's sessions
  {
    id: "3",
    time: "10:00 AM",
    subject: "English - Essay Writing",
    tutorName: "Mr. David Smith",
    duration: "60 minutes",
    type: "english",
    status: "available",
    date: new Date(Date.now() + 24 * 60 * 60 * 1000),
    roomLink: "https://meet.abangkakak.com/room/12347",
  },
  {
    id: "4",
    time: "2:00 PM",
    subject: "Chemistry - Chemical Bonding",
    tutorName: "Dr. Farah Hassan",
    duration: "45 minutes",
    type: "chemistry",
    status: "available",
    date: new Date(Date.now() + 24 * 60 * 60 * 1000),
    roomLink: "https://meet.abangkakak.com/room/12348",
  },
  // Next Week's sessions
  {
    id: "5",
    time: "11:00 AM",
    subject: "History - Malaysia Independence",
    tutorName: "Cikgu Muhammad",
    duration: "60 minutes",
    type: "history",
    status: "available",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    roomLink: "https://meet.abangkakak.com/room/12349",
  },
  {
    id: "6",
    time: "3:00 PM",
    subject: "Biology - Cell Structure",
    tutorName: "Dr. Nurul Huda",
    duration: "45 minutes",
    type: "biology",
    status: "available",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    roomLink: "https://meet.abangkakak.com/room/12350",
  },
  {
    id: "7",
    time: "5:00 PM",
    subject: "Physics - Electricity",
    tutorName: "Dr. Ahmad Rahman",
    duration: "60 minutes",
    type: "physics",
    status: "available",
    date: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
    roomLink: "https://meet.abangkakak.com/room/12351",
  },
];

export default function Schedule() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleJoinRoom = (session: Session) => {
    if (session.status === "available") {
      setToastMessage(
        `Joining ${session.subject} with ${session.tutorName}...`
      );
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      // In a real app, this would navigate to the video call room
      // window.open(session.roomLink, '_blank')
    }
  };

  const handleBookNewSession = () => {
    setShowModal(false);
    setToastMessage(
      "Session booking request sent! You will receive confirmation soon."
    );
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const getSubjectColor = (type: Session["type"]) => {
    switch (type) {
      case "physics":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "mathematics":
        return "bg-green-100 text-green-700 border-green-200";
      case "english":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "chemistry":
        return "bg-red-100 text-red-700 border-red-200";
      case "history":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "biology":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const groupSessionsByDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeekStart = new Date(today);
    nextWeekStart.setDate(nextWeekStart.getDate() + 7);
    const nextWeekEnd = new Date(today);
    nextWeekEnd.setDate(nextWeekEnd.getDate() + 14);

    const todaySessions = mockSessions.filter(
      (session) => session.date.toDateString() === today.toDateString()
    );

    const tomorrowSessions = mockSessions.filter(
      (session) => session.date.toDateString() === tomorrow.toDateString()
    );

    const nextWeekSessions = mockSessions.filter(
      (session) => session.date >= nextWeekStart && session.date < nextWeekEnd
    );

    return { todaySessions, tomorrowSessions, nextWeekSessions };
  };

  const { todaySessions, tomorrowSessions, nextWeekSessions } =
    groupSessionsByDate();

  const SessionCard = ({ session }: { session: Session }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="font-medium text-gray-900">{session.time}</span>
          </div>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full border ${getSubjectColor(
              session.type
            )}`}
          >
            {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
          </span>
        </div>
        <div className="flex items-center space-x-1 text-sm text-gray-500">
          <Clock className="w-3 h-3" />
          <span>{session.duration}</span>
        </div>
      </div>

      <h3 className="font-semibold text-gray-900 mb-2">{session.subject}</h3>
      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
        <User className="w-4 h-4" />
        <span>{session.tutorName}</span>
      </div>

      <button
        onClick={() => handleJoinRoom(session)}
        disabled={session.status !== "available"}
        className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
          session.status === "available"
            ? "bg-orange-500 text-white hover:bg-orange-600"
            : session.status === "upcoming"
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-green-100 text-green-700 cursor-default"
        }`}
      >
        {session.status === "available" ? (
          <>
            <Video className="w-4 h-4" />
            <span>Join Room</span>
          </>
        ) : session.status === "upcoming" ? (
          <>
            <VideoOff className="w-4 h-4" />
            <span>Not Available Yet</span>
          </>
        ) : (
          <>
            <CheckCircle className="w-4 h-4" />
            <span>Completed</span>
          </>
        )}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 flex items-center space-x-2 px-4 py-3 bg-orange-500 text-white rounded-lg shadow-lg transition-all transform">
          <Video className="w-5 h-5" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Schedule</h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage your tutoring sessions
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
            >
              <Plus className="w-4 h-4" />
              <span>Book New Session</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-8">
        {/* Today's Sessions */}
        <section>
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="w-5 h-5 text-orange-500" />
            <h2 className="text-xl font-semibold text-gray-900">Today</h2>
            <span className="text-sm text-gray-500">
              ({new Date().toLocaleDateString()})
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {todaySessions.length > 0 ? (
              todaySessions.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))
            ) : (
              <div className="col-span-full text-center py-8 bg-white rounded-lg border border-gray-200">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">No sessions scheduled for today</p>
              </div>
            )}
          </div>
        </section>

        {/* Tomorrow's Sessions */}
        <section>
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-semibold text-gray-900">Tomorrow</h2>
            <span className="text-sm text-gray-500">
              ({new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString()}
              )
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tomorrowSessions.length > 0 ? (
              tomorrowSessions.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))
            ) : (
              <div className="col-span-full text-center py-8 bg-white rounded-lg border border-gray-200">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">
                  No sessions scheduled for tomorrow
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Next Week's Sessions */}
        <section>
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="w-5 h-5 text-purple-500" />
            <h2 className="text-xl font-semibold text-gray-900">Next Week</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nextWeekSessions.length > 0 ? (
              nextWeekSessions.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))
            ) : (
              <div className="col-span-full text-center py-8 bg-white rounded-lg border border-gray-200">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">
                  No sessions scheduled for next week
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Book New Session Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Book New Session
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                  <option>Physics</option>
                  <option>Mathematics</option>
                  <option>English</option>
                  <option>Chemistry</option>
                  <option>History</option>
                  <option>Biology</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Time
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                  <option>9:00 AM</option>
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                  <option>2:00 PM</option>
                  <option>3:00 PM</option>
                  <option>4:00 PM</option>
                  <option>5:00 PM</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (Optional)
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  rows={3}
                  placeholder="Any specific topics you'd like to cover?"
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleBookNewSession}
                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
