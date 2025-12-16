"use client";

import { DollarSign, TrendingUp, Star, Users, BarChart3 } from "lucide-react";

interface StudentPerformance {
  id: string;
  name: string;
  sessionsAttended: number;
  improvementScore: number;
}

export default function TutorAnalytics() {
  // Mock data for the analytics
  const overviewData = {
    totalRevenue: 4850,
    studentRetentionRate: 92,
    avgSessionRating: 4.8,
  };

  // Mock data for the last 7 days earnings
  const weeklyEarnings = [
    { day: "Mon", amount: 650 },
    { day: "Tue", amount: 480 },
    { day: "Wed", amount: 720 },
    { day: "Thu", amount: 550 },
    { day: "Fri", amount: 890 },
    { day: "Sat", amount: 920 },
    { day: "Sun", amount: 640 },
  ];

  // Mock data for top performing students
  const topStudents: StudentPerformance[] = [
    {
      id: "1",
      name: "Ali bin Ahmad",
      sessionsAttended: 24,
      improvementScore: 85,
    },
    {
      id: "2",
      name: "Siti Aishah binti Mohamed",
      sessionsAttended: 18,
      improvementScore: 72,
    },
    {
      id: "3",
      name: "Mohamed Razif",
      sessionsAttended: 22,
      improvementScore: 68,
    },
    { id: "4", name: "Nurul Hana", sessionsAttended: 20, improvementScore: 65 },
    { id: "5", name: "Daniel Lim", sessionsAttended: 16, improvementScore: 58 },
  ];

  // Calculate the maximum earnings for chart scaling
  const maxEarnings = Math.max(...weeklyEarnings.map((day) => day.amount));

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
        <p className="text-gray-400 mt-1">
          Track your teaching performance and earnings
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Revenue Card */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-500" />
            </div>
            <span className="text-sm font-medium text-green-500">+12.5%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            RM {overviewData.totalRevenue.toLocaleString()}
          </h3>
          <p className="text-gray-400 text-sm">Total Revenue (This Month)</p>
        </div>

        {/* Student Retention Rate Card */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-500" />
            </div>
            <span className="text-sm font-medium text-blue-500">+3.2%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            {overviewData.studentRetentionRate}%
          </h3>
          <p className="text-gray-400 text-sm">Student Retention Rate</p>
        </div>

        {/* Average Session Rating Card */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
            <span className="text-sm font-medium text-yellow-500">+0.3</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            {overviewData.avgSessionRating}
          </h3>
          <p className="text-gray-400 text-sm">Average Session Rating</p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            Last 7 Days Earnings
          </h2>
          <div className="flex items-center space-x-2 text-gray-400">
            <BarChart3 className="w-5 h-5" />
            <span className="text-sm">
              RM{" "}
              {weeklyEarnings
                .reduce((sum, day) => sum + day.amount, 0)
                .toLocaleString()}{" "}
              total
            </span>
          </div>
        </div>

        {/* Bar Chart using Flexbox */}
        <div className="relative">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-8 w-12 flex flex-col justify-between text-xs text-gray-500">
            <span>RM {maxEarnings}</span>
            <span>RM {Math.round(maxEarnings * 0.75)}</span>
            <span>RM {Math.round(maxEarnings * 0.5)}</span>
            <span>RM {Math.round(maxEarnings * 0.25)}</span>
            <span>RM 0</span>
          </div>

          {/* Chart area */}
          <div className="ml-16 flex items-end justify-between h-48 border-l border-b border-slate-600">
            {weeklyEarnings.map((day, index) => (
              <div
                key={index}
                className="flex flex-col items-center flex-1 mx-1"
              >
                {/* Bar */}
                <div
                  className="w-full bg-orange-500 rounded-t-sm hover:bg-orange-400 transition-colors relative group cursor-pointer"
                  style={{ height: `${(day.amount / maxEarnings) * 100}%` }}
                >
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-slate-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    RM {day.amount}
                  </div>
                </div>
                {/* X-axis label */}
                <span className="text-xs text-gray-400 mt-2">{day.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Student Performance Table */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            Top Performing Students
          </h2>
          <div className="flex items-center space-x-2 text-gray-400">
            <Users className="w-5 h-5" />
            <span className="text-sm">Based on improvement score</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                  Student Name
                </th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">
                  Sessions Attended
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">
                  Improvement Score
                </th>
              </tr>
            </thead>
            <tbody>
              {topStudents.map((student, index) => (
                <tr
                  key={student.id}
                  className={`border-b border-slate-700 ${
                    index % 2 === 0 ? "bg-slate-800/50" : "bg-slate-800"
                  }`}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-orange-500">
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <span className="text-white font-medium">
                        {student.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-gray-300">
                      {student.sessionsAttended}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <span className="text-green-500 font-medium">
                        +{student.improvementScore}%
                      </span>
                      <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${student.improvementScore}%` }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="mt-4 pt-4 border-t border-slate-700 flex items-center justify-between">
          <span className="text-sm text-gray-400">
            Showing top 5 performing students
          </span>
          <button className="text-sm text-orange-500 hover:text-orange-400 transition-colors">
            View All Students →
          </button>
        </div>
      </div>
    </div>
  );
}
