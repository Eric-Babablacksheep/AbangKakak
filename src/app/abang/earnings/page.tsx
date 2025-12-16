"use client";

import { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  Clock,
  Calendar,
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  Hourglass,
} from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  amount: number;
  status: "completed" | "pending";
  student: string;
  subject: string;
  duration: number;
  rate: number;
}

interface WeeklyData {
  week: string;
  earnings: number;
  sessions: number;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    date: "2024-12-15",
    amount: 90.0,
    status: "completed",
    student: "Ahmad Rahman",
    subject: "Physics",
    duration: 60,
    rate: 90.0,
  },
  {
    id: "2",
    date: "2024-12-14",
    amount: 67.5,
    status: "completed",
    student: "Siti Nurhaliza",
    subject: "Mathematics",
    duration: 45,
    rate: 90.0,
  },
  {
    id: "3",
    date: "2024-12-13",
    amount: 90.0,
    status: "pending",
    student: "Raj Kumar",
    subject: "Biology",
    duration: 60,
    rate: 90.0,
  },
  {
    id: "4",
    date: "2024-12-12",
    amount: 120.0,
    status: "completed",
    student: "Fatima Hassan",
    subject: "History",
    duration: 80,
    rate: 90.0,
  },
  {
    id: "5",
    date: "2024-12-10",
    amount: 45.0,
    status: "completed",
    student: "Mohamed Ali",
    subject: "Chemistry",
    duration: 30,
    rate: 90.0,
  },
];

const mockWeeklyData: WeeklyData[] = [
  { week: "Week 1", earnings: 450, sessions: 6 },
  { week: "Week 2", earnings: 680, sessions: 8 },
  { week: "Week 3", earnings: 520, sessions: 7 },
  { week: "Week 4", earnings: 890, sessions: 10 },
  { week: "Week 5", earnings: 750, sessions: 9 },
  { week: "Week 6", earnings: 920, sessions: 11 },
  { week: "Week 7", earnings: 680, sessions: 8 },
  { week: "Week 8", earnings: 1050, sessions: 12 },
];

export default function EarningsAnalytics() {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [statusFilter, setStatusFilter] = useState<
    "all" | "completed" | "pending"
  >("all");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const totalEarningsThisMonth = 3240.0;
  const pendingPayout = 90.0;
  const totalHoursTaught = 156;

  const filteredTransactions = transactions.filter(
    (transaction) =>
      statusFilter === "all" || transaction.status === statusFilter
  );

  const maxEarnings = Math.max(...mockWeeklyData.map((d) => d.earnings));

  const handleExport = () => {
    setToastMessage("Exporting earnings data...");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-MY", {
      style: "currency",
      currency: "MYR",
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 flex items-center space-x-2 px-4 py-3 bg-orange-500 text-white rounded-lg shadow-lg transition-all transform">
          <Download className="w-5 h-5" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Earnings & Analytics
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Track your financial performance and earnings
              </p>
            </div>
            <button
              onClick={handleExport}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex items-center text-green-600 text-sm">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                <span>12%</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {formatCurrency(totalEarningsThisMonth)}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Total Earnings this Month
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="flex items-center text-yellow-600 text-sm">
                <Hourglass className="w-4 h-4 mr-1" />
                <span>Pending</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {formatCurrency(pendingPayout)}
            </h3>
            <p className="text-sm text-gray-600 mt-1">Pending Payout</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex items-center text-blue-600 text-sm">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                <span>8%</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {totalHoursTaught}
            </h3>
            <p className="text-sm text-gray-600 mt-1">Total Hours Taught</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Weekly Earnings Overview
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-3 h-3 bg-orange-500 rounded"></div>
              <span>Last 8 Weeks</span>
            </div>
          </div>

          {/* CSS-based Bar Chart */}
          <div className="relative h-64">
            <div className="absolute inset-0 flex items-end justify-between space-x-2 px-2">
              {mockWeeklyData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex flex-col items-center">
                    <span className="text-xs text-gray-600 mb-2">
                      {formatCurrency(data.earnings)}
                    </span>
                    <div
                      className="w-full bg-gradient-to-t from-orange-500 to-orange-400 rounded-t transition-all duration-500 hover:from-orange-600 hover:to-orange-500"
                      style={{
                        height: `${(data.earnings / maxEarnings) * 180}px`,
                        minHeight: "20px",
                      }}
                      title={`${data.week}: ${formatCurrency(data.earnings)} (${
                        data.sessions
                      } sessions)`}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-2 text-center">
                    {data.week}
                  </span>
                </div>
              ))}
            </div>

            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500 -ml-8">
              <span>{formatCurrency(maxEarnings)}</span>
              <span>{formatCurrency(maxEarnings / 2)}</span>
              <span>RM0</span>
            </div>
          </div>

          {/* Chart Summary */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-600">Average Weekly</p>
              <p className="text-lg font-semibold text-gray-900">
                {formatCurrency(totalEarningsThisMonth / 4)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Best Week</p>
              <p className="text-lg font-semibold text-gray-900">
                {formatCurrency(
                  Math.max(...mockWeeklyData.map((d) => d.earnings))
                )}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Sessions</p>
              <p className="text-lg font-semibold text-gray-900">
                {mockWeeklyData.reduce((sum, d) => sum + d.sessions, 0)}
              </p>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Transaction History
              </h2>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="all">All Transactions</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.student}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                        {transaction.subject}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.duration} min
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(transaction.rate)}/hr
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(transaction.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          transaction.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {transaction.status === "completed" ? (
                          <>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Completed
                          </>
                        ) : (
                          <>
                            <Hourglass className="w-3 h-3 mr-1" />
                            Pending
                          </>
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No transactions found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
