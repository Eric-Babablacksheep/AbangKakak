"use client";

import { useState, useRef } from "react";
import {
  Camera,
  Upload,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Target,
} from "lucide-react";

type SyllabusRegion = "Malaysia KSSM" | "Indonesia K-13" | "Philippines K-12";

interface ScanResult {
  text: string;
  keywords: string[];
  confidence: number;
}

export default function AdikDashboard() {
  const [selectedRegion, setSelectedRegion] =
    useState<SyllabusRegion>("Malaysia KSSM");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const regions: SyllabusRegion[] = [
    "Malaysia KSSM",
    "Indonesia K-13",
    "Philippines K-12",
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        simulateScanning();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateScanning = () => {
    setIsScanning(true);
    setScanResult(null);

    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        text: "The answer involves applying force and pressure principles. According to Newton's Second Law of Motion, the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. The pressure exerted on a surface is calculated by dividing the force by the area over which it is applied. In this problem, we need to calculate the total force and then determine the pressure distribution.",
        keywords: [
          "Force",
          "Pressure",
          "Newton's Second Law",
          "Acceleration",
          "Mass",
          "Area",
        ],
        confidence: 94,
      });
    }, 2000);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        simulateScanning();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const highlightKeywords = (text: string, keywords: string[]) => {
    let highlightedText = text;
    keywords.forEach((keyword) => {
      const regex = new RegExp(`(${keyword})`, "gi");
      highlightedText = highlightedText.replace(
        regex,
        '<span class="font-bold text-orange-500">$1</span>'
      );
    });
    return highlightedText;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Region Switcher */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Snap & Solve</h1>
              <p className="text-sm text-gray-600 mt-1">
                Upload your question and get instant AI-powered solutions
              </p>
            </div>

            {/* Region Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span className="text-sm font-medium">{selectedRegion}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                  {regions.map((region) => (
                    <button
                      key={region}
                      onClick={() => {
                        setSelectedRegion(region);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {region}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Syllabus Badge */}
          <div className="mt-3 flex items-center space-x-2">
            <div className="flex items-center space-x-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
              <CheckCircle className="w-4 h-4" />
              <span className="font-medium">
                Syllabus Locked: {selectedRegion}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {/* Upload Area */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Camera className="w-5 h-5 mr-2 text-orange-500" />
              Upload Question
            </h2>

            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isScanning
                  ? "border-orange-300 bg-orange-50"
                  : "border-gray-300 hover:border-orange-400 hover:bg-orange-50"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              {isScanning ? (
                <div className="space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                  <p className="text-gray-600">Scanning your question...</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full animate-pulse"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                </div>
              ) : uploadedImage ? (
                <div className="space-y-4">
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    className="max-h-64 mx-auto rounded-lg"
                  />
                  <p className="text-sm text-gray-600">
                    Click to upload a different image
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-lg font-medium text-gray-900">
                      Drag & Drop your image here
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      or click to browse
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">
                    Supports: JPG, PNG, GIF (Max 10MB)
                  </p>
                </div>
              )}
            </div>

            {/* Quick Tips */}
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium">Tips for best results:</p>
                  <ul className="mt-1 space-y-1 text-xs">
                    <li>• Ensure good lighting and clear focus</li>
                    <li>• Capture the entire question</li>
                    <li>• Avoid shadows and reflections</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-orange-500" />
              Solution & Analysis
            </h2>

            {scanResult ? (
              <div className="space-y-4">
                {/* Confidence Score */}
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium text-green-800">
                    Confidence Score
                  </span>
                  <span className="text-lg font-bold text-green-600">
                    {scanResult.confidence}%
                  </span>
                </div>

                {/* Solution Text */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Solution:</h3>
                  <div
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: highlightKeywords(
                        scanResult.text,
                        scanResult.keywords
                      ),
                    }}
                  />
                </div>

                {/* Keywords Detected */}
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-3">
                    Marking Scheme Keywords Detected:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {scanResult.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-orange-500 text-white rounded-full text-sm font-medium"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-orange-700 mt-2">
                    These keywords match the {selectedRegion} marking scheme
                    criteria.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium">
                    Save to Notes
                  </button>
                  <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                    Ask Follow-up
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500">
                  Upload an image to see the solution
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Our AI will analyze your question and provide a step-by-step
                  solution
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-6 max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Snap & Solve History
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  subject: "Mathematics",
                  topic: "Calculus",
                  time: "2 hours ago",
                  confidence: 92,
                },
                {
                  subject: "Physics",
                  topic: "Forces",
                  time: "Yesterday",
                  confidence: 88,
                },
                {
                  subject: "Chemistry",
                  topic: "Balancing Equations",
                  time: "2 days ago",
                  confidence: 95,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">
                      {item.subject}
                    </span>
                    <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      {item.confidence}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{item.topic}</p>
                  <p className="text-xs text-gray-400 mt-2">{item.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
