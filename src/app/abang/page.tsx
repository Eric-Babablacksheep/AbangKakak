"use client";

import { useState, useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Phone,
  MessageSquare,
  Users,
  Settings,
  Volume2,
  Brain,
  Lightbulb,
  Languages,
} from "lucide-react";

interface AIMessage {
  id: string;
  type: "audio" | "translation" | "suggestion" | "tip";
  content: string;
  timestamp: Date;
  accent?: string;
}

export default function AbangLiveSession() {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [aiMessages, setAiMessages] = useState<AIMessage[]>([
    {
      id: "1",
      type: "audio",
      content: "Gomo tu gapo?",
      timestamp: new Date(Date.now() - 30000),
      accent: "Kelantanese",
    },
    {
      id: "2",
      type: "translation",
      content: "What is force/fighting?",
      timestamp: new Date(Date.now() - 25000),
    },
    {
      id: "3",
      type: "suggestion",
      content:
        "Explain using Pascal's Principle. Mandatory Keyword: 'Pressure'.",
      timestamp: new Date(Date.now() - 20000),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Simulate new AI messages
    const timer = setTimeout(() => {
      const newMessage: AIMessage = {
        id: Date.now().toString(),
        type: "audio",
        content: "Cikgu, boleh terang balik pasang formula tu?",
        timestamp: new Date(),
        accent: "Northern",
      };
      setAiMessages((prev) => [...prev, newMessage]);

      setTimeout(() => {
        const translation: AIMessage = {
          id: (Date.now() + 1).toString(),
          type: "translation",
          content: "Teacher, can you explain the formula again?",
          timestamp: new Date(),
        };
        setAiMessages((prev) => [...prev, translation]);

        setTimeout(() => {
          const tip: AIMessage = {
            id: (Date.now() + 2).toString(),
            type: "tip",
            content:
              "Student needs reinforcement. Use real-world example: hydraulic car lift.",
            timestamp: new Date(),
          };
          setAiMessages((prev) => [...prev, tip]);
        }, 2000);
      }, 1500);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [aiMessages]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getMessageIcon = (type: AIMessage["type"]) => {
    switch (type) {
      case "audio":
        return <Volume2 className="w-4 h-4 text-blue-500" />;
      case "translation":
        return <Languages className="w-4 h-4 text-green-500" />;
      case "suggestion":
      case "tip":
        return <Lightbulb className="w-4 h-4 text-orange-500" />;
      default:
        return <MessageSquare className="w-4 h-4 text-gray-500" />;
    }
  };

  const getMessageStyle = (type: AIMessage["type"]) => {
    switch (type) {
      case "audio":
        return "bg-blue-50 border-blue-200";
      case "translation":
        return "bg-green-50 border-green-200";
      case "suggestion":
      case "tip":
        return "bg-orange-50 border-orange-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      {/* Session Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-white font-semibold">
            Live Session: Physics - Forces & Pressure
          </h1>
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <Users className="w-4 h-4" />
            <span>Ahmad Rahman</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-orange-500 font-mono font-medium">
            {formatTime(sessionTime)}
          </span>
          <button className="p-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Main Stage (70%) */}
        <div className="flex-1 relative bg-black flex items-center justify-center">
          {/* Student Video Feed Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Users className="w-16 h-16 text-gray-600" />
              </div>
              <p className="text-gray-400 text-lg">Ahmad Rahman</p>
              <p className="text-gray-500 text-sm">Waiting for video feed...</p>
            </div>
          </div>

          {/* Self Video (Picture-in-Picture) */}
          <div className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-lg border-2 border-gray-700 flex items-center justify-center">
            {isVideoOff ? (
              <div className="text-center">
                <VideoOff className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                <p className="text-gray-500 text-xs">Camera Off</p>
              </div>
            ) : (
              <div className="w-full h-full bg-gray-700 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-1">
                    <Users className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-gray-400 text-xs">You</p>
                </div>
              </div>
            )}
          </div>

          {/* Overlay Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-4 rounded-full transition-colors ${
                  isMuted
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-gray-700 hover:bg-gray-600 text-white"
                }`}
              >
                {isMuted ? (
                  <MicOff className="w-6 h-6" />
                ) : (
                  <Mic className="w-6 h-6" />
                )}
              </button>

              <button
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`p-4 rounded-full transition-colors ${
                  isVideoOff
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-gray-700 hover:bg-gray-600 text-white"
                }`}
              >
                {isVideoOff ? (
                  <VideoOff className="w-6 h-6" />
                ) : (
                  <Video className="w-6 h-6" />
                )}
              </button>

              <button className="p-4 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors">
                <Phone className="w-6 h-6 transform rotate-135" />
              </button>
            </div>
          </div>
        </div>

        {/* AI Co-Pilot Sidebar (30%) */}
        <div className="w-96 bg-slate-800 border-l border-slate-700 flex flex-col">
          {/* AI Co-Pilot Header */}
          <div className="p-4 border-b border-slate-700">
            <div className="flex items-center space-x-2 mb-2">
              <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
                <Brain className="w-5 h-5 text-blue-400" />
              </div>
              <h2 className="text-white font-semibold">AI Co-Pilot</h2>
            </div>
            <p className="text-gray-400 text-sm">
              Real-time translation & teaching assistance
            </p>
          </div>

          {/* AI Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {aiMessages.map((message) => (
              <div
                key={message.id}
                className={`p-3 rounded-lg border ${getMessageStyle(
                  message.type
                )}`}
              >
                <div className="flex items-start space-x-2">
                  {getMessageIcon(message.type)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-gray-600 capitalize">
                        {message.type}
                        {message.accent && ` (${message.accent})`}
                      </span>
                      <span className="text-xs text-gray-500">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-800">
                      {message.type === "audio" &&
                        `🔊 Student: "${message.content}"`}
                      {message.type === "translation" &&
                        `🤖 **Translation:** "${message.content}"`}
                      {(message.type === "suggestion" ||
                        message.type === "tip") &&
                        `💡 **${
                          message.type === "suggestion" ? "Suggestion" : "Tip"
                        }:** ${message.content}`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* AI Co-Pilot Footer */}
          <div className="p-4 border-t border-slate-700">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Brain className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-400">
                  AI Status
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Speech Recognition</span>
                  <span className="text-green-400">● Active</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Translation</span>
                  <span className="text-green-400">● Active</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Pedagogical Tips</span>
                  <span className="text-green-400">● Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
