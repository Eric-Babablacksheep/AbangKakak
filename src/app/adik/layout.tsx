"use client";

import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  GraduationCap,
  BookOpen,
  Calendar,
  MessageSquare,
  Award,
  Settings,
  LogOut,
  Home,
  User,
} from "lucide-react";

export default function AdikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userRole, logout } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (userRole !== "adik") {
      router.push("/");
    }
  }, [userRole, router]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/adik" },
    { icon: BookOpen, label: "My Courses", href: "/adik/courses" },
    { icon: Calendar, label: "Schedule", href: "/adik/schedule" },
    { icon: MessageSquare, label: "Messages", href: "/adik/messages" },
    { icon: Award, label: "Achievements", href: "/adik/achievements" },
    { icon: User, label: "Profile", href: "/adik/profile" },
    { icon: Settings, label: "Settings", href: "/adik/settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <GraduationCap className="w-8 h-8 text-orange-500" />
            <div>
              <h1 className="text-xl font-bold">AbangKakak</h1>
              <p className="text-xs text-orange-500">Student Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => router.push(item.href)}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition-colors text-gray-300 hover:text-white w-full text-left"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition-colors text-gray-300 hover:text-white w-full"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Welcome back, Student!
              </h2>
              <p className="text-sm text-gray-600">
                Ready to continue your learning journey?
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  Student Account
                </p>
                <p className="text-xs text-gray-500">adik@abangkakak.com</p>
              </div>
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
