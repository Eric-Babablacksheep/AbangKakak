"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  Video,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Session {
  id: string;
  title: string;
  studentName: string;
  startTime: string;
  endTime: string;
  type: "online" | "physical";
  course: string;
}

interface TimeSlot {
  time: string;
  session?: Session;
}

export default function TutorSchedule() {
  const [viewMode, setViewMode] = useState<"day" | "week">("day");
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock sessions data
  const sessions: Session[] = [
    {
      id: "1",
      title: "Physics Session",
      studentName: "Ali bin Ahmad",
      startTime: "10:00",
      endTime: "11:30",
      type: "online",
      course: "SPM Physics",
    },
    {
      id: "2",
      title: "Mathematics Tutorial",
      studentName: "Siti Aishah",
      startTime: "14:00",
      endTime: "15:30",
      type: "physical",
      course: "Form 4 Mathematics",
    },
    {
      id: "3",
      title: "Additional Math",
      studentName: "Mohamed Razif",
      startTime: "16:00",
      endTime: "17:30",
      type: "online",
      course: "Additional Mathematics",
    },
  ];

  // Generate time slots from 8:00 AM to 10:00 PM
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    for (let hour = 8; hour <= 22; hour++) {
      const timeString = `${hour.toString().padStart(2, "0")}:00`;
      const session = sessions.find((s) => s.startTime === timeString);
      slots.push({ time: timeString, session });
    }
    return slots;
  };

  const handleSessionClick = (session: Session) => {
    const sessionDetails = `
Session Details:
-----------------
Title: ${session.title}
Student: ${session.studentName}
Course: ${session.course}
Time: ${session.startTime} - ${session.endTime}
Type: ${session.type === "online" ? "Online Session" : "Physical Meeting"}
${
  session.type === "online"
    ? "Meeting Link: https://meet.abangkakak.com/session/" + session.id
    : "Location: Tuition Center"
}
    `.trim();

    alert(sessionDetails);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(selectedDate);
    if (viewMode === "day") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
    } else {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
    }
    setSelectedDate(newDate);
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">My Schedule</h1>
          <p className="text-gray-400 mt-1">
            Manage your tutoring sessions and appointments
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center space-x-2 bg-slate-800 rounded-lg p-1">
          <button
            onClick={() => setViewMode("day")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === "day"
                ? "bg-orange-500 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Day View
          </button>
          <button
            onClick={() => setViewMode("week")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === "week"
                ? "bg-orange-500 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Week View
          </button>
        </div>
      </div>

      {/* Date Navigation */}
      <div className="flex items-center justify-between mb-6 bg-slate-800 rounded-lg p-4">
        <button
          onClick={() => navigateDate("prev")}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-400" />
        </button>

        <div className="flex items-center space-x-3">
          <Calendar className="w-5 h-5 text-orange-500" />
          <h2 className="text-xl font-semibold text-white">
            {formatDate(selectedDate)}
          </h2>
        </div>

        <button
          onClick={() => navigateDate("next")}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Timeline */}
      <div className="bg-slate-800 rounded-lg overflow-hidden">
        <div className="max-h-96 overflow-y-auto">
          {timeSlots.map((slot, index) => (
            <div
              key={index}
              className={`flex border-b border-slate-700 ${
                index % 2 === 0 ? "bg-slate-800/50" : "bg-slate-800"
              }`}
            >
              {/* Time Column */}
              <div className="w-24 p-4 border-r border-slate-700">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-300">
                    {slot.time}
                  </span>
                </div>
              </div>

              {/* Session Column */}
              <div className="flex-1 p-4 min-h-[80px]">
                {slot.session ? (
                  <div
                    onClick={() => handleSessionClick(slot.session!)}
                    className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-500/30 rounded-lg p-4 cursor-pointer hover:from-orange-500/30 hover:to-orange-600/30 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-white mb-1">
                          {slot.session.title}
                        </h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-300">
                          <div className="flex items-center space-x-1">
                            <Users className="w-3 h-3" />
                            <span>{slot.session.studentName}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Video className="w-3 h-3" />
                            <span>
                              {slot.session.type === "online"
                                ? "Online"
                                : "Physical"}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                          {slot.session.course} • {slot.session.startTime} -{" "}
                          {slot.session.endTime}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-gray-600 text-sm">
                      No session scheduled
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-slate-800 rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Video className="w-6 h-6 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            {sessions.length}
          </h3>
          <p className="text-gray-400 text-sm">Sessions Today</p>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-blue-500" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">4.5h</h3>
          <p className="text-gray-400 text-sm">Total Teaching Time</p>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6 text-orange-500" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            {sessions.length}
          </h3>
          <p className="text-gray-400 text-sm">Students Today</p>
        </div>
      </div>
    </div>
  );
}
