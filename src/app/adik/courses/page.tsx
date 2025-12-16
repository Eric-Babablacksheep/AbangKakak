"use client";

import { useState } from "react";
import {
  BookOpen,
  Clock,
  User,
  Play,
  CheckCircle,
  Star,
  Calendar,
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  duration: string;
  rating: number;
  nextLesson: string;
  category: string;
}

const mockCourses: Course[] = [
  {
    id: "1",
    title: "SPM Physics",
    instructor: "Dr. Ahmad Rahman",
    thumbnail: "/physics-course.jpg",
    progress: 65,
    totalLessons: 24,
    completedLessons: 16,
    duration: "12 hours",
    rating: 4.8,
    nextLesson: "Chapter 5: Forces and Motion",
    category: "Science",
  },
  {
    id: "2",
    title: "KSSM Mathematics",
    instructor: "Puan Siti Aishah",
    thumbnail: "/math-course.jpg",
    progress: 82,
    totalLessons: 30,
    completedLessons: 25,
    duration: "15 hours",
    rating: 4.9,
    nextLesson: "Calculus Basics",
    category: "Mathematics",
  },
  {
    id: "3",
    title: "English 101",
    instructor: "Mr. David Smith",
    thumbnail: "/english-course.jpg",
    progress: 45,
    totalLessons: 20,
    completedLessons: 9,
    duration: "10 hours",
    rating: 4.7,
    nextLesson: "Essay Writing Techniques",
    category: "Language",
  },
  {
    id: "4",
    title: "KSSM Chemistry",
    instructor: "Dr. Farah Hassan",
    thumbnail: "/chemistry-course.jpg",
    progress: 30,
    totalLessons: 28,
    completedLessons: 8,
    duration: "14 hours",
    rating: 4.6,
    nextLesson: "Chemical Bonding",
    category: "Science",
  },
  {
    id: "5",
    title: "Sejarah Malaysia",
    instructor: "Cikgu Muhammad",
    thumbnail: "/history-course.jpg",
    progress: 90,
    totalLessons: 18,
    completedLessons: 16,
    duration: "9 hours",
    rating: 4.8,
    nextLesson: "Malaysia Independence",
    category: "History",
  },
  {
    id: "6",
    title: "Biology Form 4",
    instructor: "Dr. Nurul Huda",
    thumbnail: "/biology-course.jpg",
    progress: 55,
    totalLessons: 22,
    completedLessons: 12,
    duration: "11 hours",
    rating: 4.7,
    nextLesson: "Cell Structure",
    category: "Science",
  },
];

export default function MyCourses() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleContinueLearning = (courseTitle: string) => {
    setToastMessage(`Continuing "${courseTitle}"...`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Science":
        return "bg-blue-100 text-blue-700";
      case "Mathematics":
        return "bg-green-100 text-green-700";
      case "Language":
        return "bg-purple-100 text-purple-700";
      case "History":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 flex items-center space-x-2 px-4 py-3 bg-orange-500 text-white rounded-lg shadow-lg transition-all transform">
          <Play className="w-5 h-5" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
              <p className="text-sm text-gray-600 mt-1">
                Continue your learning journey
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  6 Active Courses
                </p>
                <p className="text-xs text-gray-500">61% Average Progress</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Course Thumbnail */}
              <div className="relative h-48 bg-gradient-to-br from-slate-900 to-slate-700">
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-white/50" />
                </div>
                <div className="absolute top-3 left-3">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(
                      course.category
                    )}`}
                  >
                    {course.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/50 px-2 py-1 rounded-full">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-white">{course.rating}</span>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {course.title}
                </h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                  <User className="w-4 h-4" />
                  <span>{course.instructor}</span>
                </div>

                {/* Progress Section */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium text-gray-900">
                      {course.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                    <span>
                      {course.completedLessons} of {course.totalLessons} lessons
                    </span>
                    <span>{course.duration}</span>
                  </div>
                </div>

                {/* Next Lesson */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Next Lesson:</p>
                  <p className="text-sm font-medium text-gray-900">
                    {course.nextLesson}
                  </p>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleContinueLearning(course.title)}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
                >
                  <Play className="w-4 h-4" />
                  <span>Continue Learning</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">6</p>
                <p className="text-sm text-gray-600">Active Courses</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">86</p>
                <p className="text-sm text-gray-600">Lessons Completed</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">71h</p>
                <p className="text-sm text-gray-600">Total Learning Time</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Star className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">4.7</p>
                <p className="text-sm text-gray-600">Average Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
