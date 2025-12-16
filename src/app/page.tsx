"use client";

import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
import { GraduationCap, Users } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const { login } = useUserStore();

  const handleRoleSelection = (role: "adik" | "abang") => {
    login(role);
    router.push(`/${role}`);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left/Top: Branding */}
          <div className="text-center md:text-left space-y-6">
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <GraduationCap className="w-12 h-12 text-orange-500" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                AbangKakak
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-orange-500 font-semibold">
              The AI Tutor for SEA
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Empowering students and tutors across Southeast Asia with
              intelligent, personalized learning experiences. Join our community
              today and transform your educational journey.
            </p>
            <div className="pt-4">
              <div className="flex items-center justify-center md:justify-start space-x-8 text-gray-400">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">10K+</div>
                  <div className="text-sm">Active Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">500+</div>
                  <div className="text-sm">Expert Tutors</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">95%</div>
                  <div className="text-sm">Success Rate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right/Bottom: Role Selection */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white text-center md:text-left">
              Choose Your Role
            </h2>

            <div className="space-y-4">
              {/* Adik (Student) Card */}
              <button
                onClick={() => handleRoleSelection("adik")}
                className="w-full p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-left group"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      I am an Adik (Student)
                    </h3>
                    <p className="text-gray-600">
                      Access personalized learning paths, get help from expert
                      tutors, and accelerate your academic journey.
                    </p>
                  </div>
                  <div className="text-blue-600 group-hover:translate-x-2 transition-transform">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </button>

              {/* Abang (Tutor) Card */}
              <button
                onClick={() => handleRoleSelection("abang")}
                className="w-full p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-left group"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors">
                    <GraduationCap className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      I am an Abang (Tutor)
                    </h3>
                    <p className="text-gray-600">
                      Share your knowledge, help students succeed, and earn
                      while making a difference in education.
                    </p>
                  </div>
                  <div className="text-green-600 group-hover:translate-x-2 transition-transform">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            </div>

            <div className="text-center text-gray-400 text-sm pt-4">
              By continuing, you agree to our Terms of Service and Privacy
              Policy
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
