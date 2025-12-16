"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Building,
  Trophy,
  HelpCircle,
  Calendar,
} from "lucide-react";

export default function StudentProfile() {
  const [formData, setFormData] = useState({
    fullName: "Student Account",
    email: "student@abangkakak.com",
    phoneNumber: "+60 12-345 6789",
    school: "SMK Example School",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    alert("Profile Updated!");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <h1 className="text-3xl font-bold text-white mb-8">My Profile</h1>

      {/* Profile Card */}
      <div className="bg-slate-800 rounded-xl p-8 mb-8 text-center">
        <div className="flex flex-col items-center">
          {/* Avatar */}
          <div className="w-24 h-24 bg-slate-600 rounded-full flex items-center justify-center mb-4">
            <User className="w-12 h-12 text-slate-400" />
          </div>

          {/* Name */}
          <h2 className="text-2xl font-bold text-white mb-2">
            {formData.fullName}
          </h2>

          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-yellow-500/20 border border-yellow-500 rounded-full">
            <Trophy className="w-4 h-4 text-yellow-500 mr-2" />
            <span className="text-yellow-500 font-semibold">
              Level 5 Scholar
            </span>
          </div>
        </div>
      </div>

      {/* Editable Details Form */}
      <div className="bg-slate-800 rounded-xl p-8 mb-8">
        <h3 className="text-xl font-semibold text-white mb-6">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* School/Institution */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              School/Institution
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="school"
                value={formData.school}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSaveChanges}
            className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-800"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total XP */}
        <div className="bg-slate-800 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-6 h-6 text-orange-500" />
          </div>
          <h4 className="text-2xl font-bold text-white mb-1">2,450</h4>
          <p className="text-gray-400 text-sm">Total XP</p>
        </div>

        {/* Questions Asked */}
        <div className="bg-slate-800 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-6 h-6 text-blue-500" />
          </div>
          <h4 className="text-2xl font-bold text-white mb-1">127</h4>
          <p className="text-gray-400 text-sm">Questions Asked</p>
        </div>

        {/* Days Active */}
        <div className="bg-slate-800 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-6 h-6 text-green-500" />
          </div>
          <h4 className="text-2xl font-bold text-white mb-1">45</h4>
          <p className="text-gray-400 text-sm">Days Active</p>
        </div>
      </div>
    </div>
  );
}
