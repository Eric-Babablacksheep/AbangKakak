"use client";

import { useState } from "react";
import {
  Trophy,
  Star,
  Target,
  Zap,
  BookOpen,
  Calendar,
  Award,
  Lock,
  Flame,
  Brain,
  Clock,
  CheckCircle,
  TrendingUp,
  Medal,
} from "lucide-react";

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress?: number;
  category: "streak" | "learning" | "mastery" | "special";
  unlockedDate?: string;
}

interface AchievementStats {
  totalXP: number;
  questionsSolved: number;
  hoursLearned: number;
  currentStreak: number;
  level: number;
  nextLevelXP: number;
}

const mockBadges: Badge[] = [
  // Unlocked badges
  {
    id: "1",
    name: "7-Day Streak",
    description: "Study for 7 consecutive days",
    icon: <Flame className="w-8 h-8" />,
    unlocked: true,
    category: "streak",
    unlockedDate: "2024-12-10",
  },
  {
    id: "2",
    name: "Quiz Master",
    description: "Answer 100 questions correctly",
    icon: <Brain className="w-8 h-8" />,
    unlocked: true,
    category: "mastery",
    unlockedDate: "2024-12-08",
  },
  {
    id: "3",
    name: "Early Bird",
    description: "Complete 5 sessions before 9 AM",
    icon: <Clock className="w-8 h-8" />,
    unlocked: true,
    category: "special",
    unlockedDate: "2024-12-05",
  },
  {
    id: "4",
    name: "Physics Pro",
    description: "Complete Physics course with 90%+ score",
    icon: <Target className="w-8 h-8" />,
    unlocked: true,
    category: "mastery",
    unlockedDate: "2024-12-03",
  },
  // Locked badges with progress
  {
    id: "5",
    name: "30-Day Streak",
    description: "Study for 30 consecutive days",
    icon: <Flame className="w-8 h-8" />,
    unlocked: false,
    progress: 23,
    category: "streak",
  },
  {
    id: "6",
    name: "Math Wizard",
    description: "Complete Mathematics course with 95%+ score",
    icon: <Star className="w-8 h-8" />,
    unlocked: false,
    progress: 82,
    category: "mastery",
  },
  {
    id: "7",
    name: "Knowledge Seeker",
    description: "Spend 100 hours learning",
    icon: <BookOpen className="w-8 h-8" />,
    unlocked: false,
    progress: 71,
    category: "learning",
  },
  {
    id: "8",
    name: "Perfect Score",
    description: "Get 100% on 10 different quizzes",
    icon: <Trophy className="w-8 h-8" />,
    unlocked: false,
    progress: 7,
    category: "mastery",
  },
  {
    id: "9",
    name: "Night Owl",
    description: "Complete 5 sessions after 9 PM",
    icon: <Zap className="w-8 h-8" />,
    unlocked: false,
    progress: 3,
    category: "special",
  },
  {
    id: "10",
    name: "Speed Learner",
    description: "Complete a course in half the expected time",
    icon: <TrendingUp className="w-8 h-8" />,
    unlocked: false,
    progress: 45,
    category: "special",
  },
  {
    id: "11",
    name: "All-Rounder",
    description: "Complete courses in 4 different subjects",
    icon: <Award className="w-8 h-8" />,
    unlocked: false,
    progress: 3,
    category: "learning",
  },
  {
    id: "12",
    name: "Century Club",
    description: "Solve 1000 questions",
    icon: <Medal className="w-8 h-8" />,
    unlocked: false,
    progress: 847,
    category: "mastery",
  },
];

const mockStats: AchievementStats = {
  totalXP: 2847,
  questionsSolved: 847,
  hoursLearned: 71,
  currentStreak: 23,
  level: 12,
  nextLevelXP: 3000,
};

export default function Achievements() {
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "streak" | "learning" | "mastery" | "special"
  >("all");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleBadgeClick = (badge: Badge) => {
    if (badge.unlocked) {
      setToastMessage(
        `Badge "${badge.name}" unlocked on ${badge.unlockedDate}!`
      );
    } else {
      setToastMessage(`${badge.progress || 0}% complete: ${badge.description}`);
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const filteredBadges =
    selectedCategory === "all"
      ? mockBadges
      : mockBadges.filter((badge) => badge.category === selectedCategory);

  const getCategoryColor = (category: Badge["category"]) => {
    switch (category) {
      case "streak":
        return "text-orange-500";
      case "learning":
        return "text-blue-500";
      case "mastery":
        return "text-purple-500";
      case "special":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const getCategoryBgColor = (category: Badge["category"]) => {
    switch (category) {
      case "streak":
        return "bg-orange-100";
      case "learning":
        return "bg-blue-100";
      case "mastery":
        return "bg-purple-100";
      case "special":
        return "bg-green-100";
      default:
        return "bg-gray-100";
    }
  };

  const progressPercentage = (mockStats.totalXP / mockStats.nextLevelXP) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 flex items-center space-x-2 px-4 py-3 bg-orange-500 text-white rounded-lg shadow-lg transition-all transform">
          <Trophy className="w-5 h-5" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Achievements</h1>
              <p className="text-sm text-gray-600 mt-1">
                Track your learning progress and earn badges
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  Level {mockStats.level}
                </p>
                <p className="text-xs text-gray-500">
                  {mockStats.totalXP} / {mockStats.nextLevelXP} XP
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {mockStats.level}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Star className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {mockStats.totalXP.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Total XP</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Target className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {mockStats.questionsSolved.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Questions Solved</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Clock className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {mockStats.hoursLearned}
                </p>
                <p className="text-sm text-gray-600">Hours Learned</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <Flame className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {mockStats.currentStreak}
                </p>
                <p className="text-sm text-gray-600">Day Streak</p>
              </div>
            </div>
          </div>
        </div>

        {/* Level Progress */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900">
              Level Progress
            </h3>
            <span className="text-sm text-gray-600">
              Level {mockStats.level} → Level {mockStats.level + 1}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div
              className="bg-gradient-to-r from-orange-400 to-orange-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{mockStats.totalXP} XP</span>
            <span>
              {mockStats.nextLevelXP - mockStats.totalXP} XP to next level
            </span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex items-center space-x-2 mb-6 overflow-x-auto">
          {[
            { value: "all", label: "All Badges" },
            { value: "streak", label: "Streak" },
            { value: "learning", label: "Learning" },
            { value: "mastery", label: "Mastery" },
            { value: "special", label: "Special" },
          ].map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                selectedCategory === category.value
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredBadges.map((badge) => (
            <div
              key={badge.id}
              onClick={() => handleBadgeClick(badge)}
              className={`relative bg-white rounded-xl shadow-sm border-2 p-6 cursor-pointer transition-all hover:shadow-md ${
                badge.unlocked
                  ? "border-orange-200 hover:border-orange-400"
                  : "border-gray-200 hover:border-gray-300 grayscale"
              }`}
            >
              {/* Badge Icon */}
              <div
                className={`flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full ${
                  badge.unlocked
                    ? getCategoryBgColor(badge.category)
                    : "bg-gray-100"
                }`}
              >
                <div
                  className={
                    badge.unlocked
                      ? getCategoryColor(badge.category)
                      : "text-gray-400"
                  }
                >
                  {badge.icon}
                </div>
              </div>

              {/* Lock overlay for locked badges */}
              {!badge.unlocked && (
                <div className="absolute top-4 right-4">
                  <Lock className="w-4 h-4 text-gray-400" />
                </div>
              )}

              {/* Badge Info */}
              <div className="text-center">
                <h3
                  className={`font-semibold mb-1 ${
                    badge.unlocked ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {badge.name}
                </h3>
                <p
                  className={`text-sm mb-3 ${
                    badge.unlocked ? "text-gray-600" : "text-gray-400"
                  }`}
                >
                  {badge.description}
                </p>

                {/* Progress bar for locked badges */}
                {!badge.unlocked && badge.progress !== undefined && (
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${badge.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {badge.progress}%
                    </p>
                  </div>
                )}

                {/* Unlocked date */}
                {badge.unlocked && badge.unlockedDate && (
                  <div className="flex items-center justify-center space-x-1 text-xs text-green-600 mt-2">
                    <CheckCircle className="w-3 h-3" />
                    <span>Unlocked {badge.unlockedDate}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Achievement Summary */}
        <div className="mt-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Keep Going!</h3>
              <p className="text-orange-100">
                You've unlocked {mockBadges.filter((b) => b.unlocked).length}{" "}
                out of {mockBadges.length} badges. Continue learning to earn
                more achievements!
              </p>
            </div>
            <Trophy className="w-16 h-16 text-orange-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
