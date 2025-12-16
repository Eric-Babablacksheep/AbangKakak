"use client";

import { useState, useRef } from "react";
import {
  Upload,
  File,
  CheckCircle,
  AlertCircle,
  Download,
  Trash2,
  Eye,
  Award,
  BookOpen,
  GraduationCap,
} from "lucide-react";

interface Certificate {
  id: string;
  name: string;
  fileName: string;
  fileSize: number;
  uploadDate: string;
  verified: boolean;
  type: "education" | "professional" | "teaching";
  issuer?: string;
  expiryDate?: string;
}

const mockCertificates: Certificate[] = [
  {
    id: "1",
    name: "Bachelor of Education",
    fileName: "Bachelor_of_Education.pdf",
    fileSize: 2.4,
    uploadDate: "2024-01-15",
    verified: true,
    type: "education",
    issuer: "University of Malaya",
    expiryDate: "2025-12-31",
  },
  {
    id: "2",
    name: "Teaching License",
    fileName: "Teaching_License_2024.pdf",
    fileSize: 1.2,
    uploadDate: "2024-02-20",
    verified: true,
    type: "teaching",
    issuer: "Ministry of Education Malaysia",
    expiryDate: "2026-12-31",
  },
  {
    id: "3",
    name: "Physics Certification",
    fileName: "Physics_Cert_Advanced.pdf",
    fileSize: 3.1,
    uploadDate: "2024-03-10",
    verified: false,
    type: "professional",
    issuer: "Malaysian Physics Society",
  },
  {
    id: "4",
    name: "Mathematics Teaching Certificate",
    fileName: "Math_Teaching_Cert.pdf",
    fileSize: 1.8,
    uploadDate: "2024-04-05",
    verified: true,
    type: "teaching",
    issuer: "National Mathematics Society",
  },
];

export default function Certifications() {
  const [certificates, setCertificates] = useState(mockCertificates);
  const [isDragging, setIsDragging] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newCertificates: Certificate[] = Array.from(files).map(
      (file, index) => ({
        id: Date.now().toString() + index,
        name: file.name.replace(/\.[^/.]+$/, ""),
        fileName: file.name,
        fileSize: Math.round((file.size / 1024 / 1024) * 10) / 10, // Convert to MB
        uploadDate: new Date().toISOString().split("T")[0],
        verified: false,
        type: "professional" as const,
      })
    );

    setCertificates([...certificates, ...newCertificates]);
    setToastMessage(
      `${newCertificates.length} certificate(s) uploaded successfully!`
    );
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDeleteCertificate = (id: string) => {
    setCertificates(certificates.filter((cert) => cert.id !== id));
    setToastMessage("Certificate deleted successfully");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleViewCertificate = (fileName: string) => {
    setToastMessage(`Opening ${fileName}...`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const formatFileSize = (sizeInMB: number) => {
    if (sizeInMB < 1) {
      return `${Math.round(sizeInMB * 1024)} KB`;
    }
    return `${sizeInMB} MB`;
  };

  const getTypeIcon = (type: Certificate["type"]) => {
    switch (type) {
      case "education":
        return <GraduationCap className="w-5 h-5" />;
      case "professional":
        return <Award className="w-5 h-5" />;
      case "teaching":
        return <BookOpen className="w-5 h-5" />;
      default:
        return <File className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: Certificate["type"]) => {
    switch (type) {
      case "education":
        return "bg-blue-100 text-blue-700";
      case "professional":
        return "bg-purple-100 text-purple-700";
      case "teaching":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const verifiedCount = certificates.filter((cert) => cert.verified).length;
  const totalCount = certificates.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 flex items-center space-x-2 px-4 py-3 bg-orange-500 text-white rounded-lg shadow-lg transition-all transform">
          <Upload className="w-5 h-5" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Certifications
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage your teaching credentials and qualifications
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {verifiedCount} Verified
                </p>
                <p className="text-xs text-gray-500">of {totalCount} total</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {certificates.filter((c) => c.type === "education").length}
                </p>
                <p className="text-sm text-gray-600">Education</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {certificates.filter((c) => c.type === "professional").length}
                </p>
                <p className="text-sm text-gray-600">Professional</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {certificates.filter((c) => c.type === "teaching").length}
                </p>
                <p className="text-sm text-gray-600">Teaching</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-orange-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {verifiedCount}
                </p>
                <p className="text-sm text-gray-600">Verified</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Upload New Certificate
          </h2>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragging
                ? "border-orange-400 bg-orange-50"
                : "border-gray-300 hover:border-orange-400 hover:bg-orange-50"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
            />
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              Drop your certificates here or click to browse
            </p>
            <p className="text-sm text-gray-600">
              Supported formats: PDF, DOC, DOCX, JPG, JPEG, PNG (Max 10MB per
              file)
            </p>
          </div>
        </div>

        {/* Certificates List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Uploaded Certificates
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {certificates.map((certificate) => (
              <div
                key={certificate.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`p-3 rounded-lg ${getTypeColor(
                        certificate.type
                      )}`}
                    >
                      {getTypeIcon(certificate.type)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-base font-medium text-gray-900">
                          {certificate.name}
                        </h3>
                        {certificate.verified && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </span>
                        )}
                        {!certificate.verified && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Pending Verification
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{certificate.fileName}</span>
                        <span>•</span>
                        <span>{formatFileSize(certificate.fileSize)}</span>
                        <span>•</span>
                        <span>Uploaded {certificate.uploadDate}</span>
                      </div>
                      {certificate.issuer && (
                        <p className="text-sm text-gray-600 mt-1">
                          Issued by: {certificate.issuer}
                        </p>
                      )}
                      {certificate.expiryDate && (
                        <p className="text-sm text-gray-600">
                          Expires: {certificate.expiryDate}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        handleViewCertificate(certificate.fileName)
                      }
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                      title="View Certificate"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Download Certificate"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteCertificate(certificate.id)}
                      className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Certificate"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {certificates.length === 0 && (
            <div className="text-center py-12">
              <File className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No certificates uploaded yet</p>
              <p className="text-sm text-gray-400 mt-1">
                Upload your first certificate to get started
              </p>
            </div>
          )}
        </div>

        {/* Verification Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-blue-900">
                Verification Process
              </h3>
              <ul className="mt-2 text-sm text-blue-800 space-y-1">
                <li>
                  • Uploaded certificates are typically verified within 2-3
                  business days
                </li>
                <li>
                  • Make sure your certificates are clear and all information is
                  visible
                </li>
                <li>
                  • Professional and teaching certificates require official
                  verification
                </li>
                <li>
                  • You'll receive a notification once verification is complete
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
