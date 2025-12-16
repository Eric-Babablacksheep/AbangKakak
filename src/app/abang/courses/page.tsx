"use client";

import { useState } from "react";
import { BookOpen, Users, Edit, Eye, Plus, Clock } from "lucide-react";

interface Course {
  id: string;
  title: string;
  studentsEnrolled: number;
  status: "Active" | "Inactive" | "Draft";
  nextSession?: string;
}

export default function TutorCourses() {
  const [courses] = useState<Course[]>([
    {
      id: "1",
      title: "SPM Physics",
      studentsEnrolled: 24,
      status: "Active",
      nextSession: "Today, 3:00 PM",
    },
    {
      id: "2",
      title: "Form 4 Mathematics",
      studentsEnrolled: 18,
      status: "Active",
      nextSession: "Tomorrow, 10:00 AM",
    },
    {
      id: "3",
      title: "Additional Mathematics",
      studentsEnrolled: 15,
      status: "Active",
      nextSession: "Friday, 2:00 PM",
    },
    {
      id: "4",
      title: "Science Form 3",
      studentsEnrolled: 22,
      status: "Inactive",
    },
  ]);

  const handleCreateNewCourse = () => {
    alert("Create New Course functionality would open a form here");
  };

  const handleEditSyllabus = (courseTitle: string) => {
    alert(`Editing syllabus for ${courseTitle}`);
  };

  const handleViewRoster = (courseTitle: string) => {
    alert(`Viewing roster for ${courseTitle}`);
  };

  const getStatusColor = (status: Course["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200";
      case "Inactive":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "Draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">My Courses</h1>
          <p className="text-gray-400 mt-1">
            Manage your teaching courses and syllabus
          </p>
        </div>
        <button
          onClick={handleCreateNewCourse}
          className="flex items-center space-x-2 px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-800"
        >
          <Plus className="w-5 h-5" />
          <span>Create New Course</span>
        </button>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-orange-500/50 transition-colors"
          >
            {/* Course Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {course.title}
                  </h3>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      course.status
                    )}`}
                  >
                    {course.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Course Details */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-2 text-gray-300">
                <Users className="w-4 h-4" />
                <span className="text-sm">
                  {course.studentsEnrolled} Students Enrolled
                </span>
              </div>
              {course.nextSession && (
                <div className="flex items-center space-x-2 text-gray-300">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Next: {course.nextSession}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditSyllabus(course.title)}
                className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-slate-700 text-gray-300 rounded-lg hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <Edit className="w-4 h-4" />
                <span className="text-sm">Edit Syllabus</span>
              </button>
              <button
                onClick={() => handleViewRoster(course.title)}
                className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-slate-700 text-gray-300 rounded-lg hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <Eye className="w-4 h-4" />
                <span className="text-sm">View Roster</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (if no courses) */}
      {courses.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No Courses Yet
          </h3>
          <p className="text-gray-400 mb-6">
            Start by creating your first course
          </p>
          <button
            onClick={handleCreateNewCourse}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Create Your First Course</span>
          </button>
        </div>
      )}
    </div>
  );
}
