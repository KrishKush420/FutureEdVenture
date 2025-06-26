import React, { useEffect, useState } from 'react';
import { Building2, Upload, Calendar, Globe, Eye, CheckCircle, AlertTriangle } from 'lucide-react';
import { SchoolIdentityData } from '@/types/schoolSetup';

interface SchoolIdentityStepProps {
  data: SchoolIdentityData;
  onUpdate: (data: SchoolIdentityData) => void;
  onValidationChange: (isValid: boolean) => void;
}

export function SchoolIdentityStep({ data, onUpdate, onValidationChange }: SchoolIdentityStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadError, setUploadError] = useState<string>('');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation - must be 3-100 characters
    if (!data.name.trim()) {
      newErrors.name = 'School name is required';
    } else if (data.name.trim().length < 3) {
      newErrors.name = 'School name must be at least 3 characters';
    } else if (data.name.trim().length > 100) {
      newErrors.name = 'School name must not exceed 100 characters';
    }

    // Academic year validation - end date must follow start date
    if (data.academicYear.startDate && data.academicYear.endDate) {
      const startDate = new Date(data.academicYear.startDate);
      const endDate = new Date(data.academicYear.endDate);
      if (endDate <= startDate) {
        newErrors.academicYear = 'End date must be after start date';
      }
    }

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    onValidationChange(isValid);
    return isValid;
  };

  useEffect(() => {
    validateForm();
  }, [data]);

  const handleNameChange = (name: string) => {
    onUpdate({ ...data, name });
  };

  const handleAcademicYearChange = (field: 'startDate' | 'endDate', value: string) => {
    const newAcademicYear = { ...data.academicYear, [field]: value };
    onUpdate({ ...data, academicYear: newAcademicYear });
  };

  const handleTimezoneChange = (timezone: string) => {
    onUpdate({ ...data, timezone });
  };

  const handleLogoUpload = (file: File) => {
    setUploadStatus('uploading');
    setUploadError('');

    // Validate file format (PNG, JPEG)
    const validFormats = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!validFormats.includes(file.type)) {
      setUploadStatus('error');
      setUploadError('Only PNG and JPEG formats are allowed');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setUploadStatus('error');
      setUploadError('File size must be less than 5MB');
      return;
    }

    // Simulate upload success
    setTimeout(() => {
      setUploadStatus('success');
      onUpdate({ ...data, logo: file, logoUrl: URL.createObjectURL(file) });
    }, 1000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    if (imageFile) {
      handleLogoUpload(imageFile);
    }
  };

  const getBrowserTimezone = () => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  };

  const timezones = [
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'America/Phoenix',
    'America/Anchorage',
    'Pacific/Honolulu',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Australia/Sydney',
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Building2 className="w-8 h-8 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">School Identity</h2>
        <p className="text-gray-600">Set up your school's basic information and branding</p>
      </div>

      {/* Preview Toggle */}
      <div className="flex justify-center">
        <button
          onClick={() => setIsPreviewMode(!isPreviewMode)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <Eye className="w-4 h-4" />
          {isPreviewMode ? 'Edit Mode' : 'Preview Mode'}
        </button>
      </div>

      {/* School Name */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">School Name *</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className={`w-full text-lg border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.name ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter your school name"
            maxLength={100}
          />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          <p className="text-xs text-gray-500 mt-1">{data.name.length}/100 characters</p>
        </div>

        {/* Preview in simulated header */}
        {data.name && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Preview: Dashboard Header</h3>
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3">
                {data.logo ? (
                  <img
                    src={URL.createObjectURL(data.logo)}
                    alt="School logo"
                    className="w-10 h-10 object-contain rounded-lg bg-gray-50 border border-gray-200"
                  />
                ) : (
                  <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-gray-900">{data.name}</h4>
                  <p className="text-sm text-gray-500">School Management System</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Logo Upload */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Upload className="w-5 h-5 text-indigo-600" />
          School Logo
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Logo</label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                uploadStatus === 'uploading'
                  ? 'border-blue-400 bg-blue-50'
                  : uploadStatus === 'success'
                  ? 'border-green-400 bg-green-50'
                  : uploadStatus === 'error'
                  ? 'border-red-400 bg-red-50'
                  : 'border-gray-300 hover:border-indigo-400'
              }`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {uploadStatus === 'uploading' ? (
                <div className="space-y-2">
                  <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-sm text-blue-600 font-medium">Uploading...</p>
                </div>
              ) : uploadStatus === 'success' ? (
                <div className="space-y-2">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto" />
                  <p className="text-sm text-green-600 font-medium">Upload successful!</p>
                </div>
              ) : uploadStatus === 'error' ? (
                <div className="space-y-2">
                  <AlertTriangle className="w-8 h-8 text-red-600 mx-auto" />
                  <p className="text-sm text-red-600 font-medium">Upload failed</p>
                  <p className="text-xs text-red-500">{uploadError}</p>
                </div>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Drag and drop your logo here, or click to browse</p>
                </>
              )}
              {uploadStatus !== 'uploading' && (
                <>
                  <input
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleLogoUpload(file);
                    }}
                    className="hidden"
                    id="logo-upload"
                  />
                  <label
                    htmlFor="logo-upload"
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer transition-colors"
                  >
                    Choose File
                  </label>
                  <p className="text-xs text-gray-500 mt-2">PNG or JPEG format, max 5MB</p>
                </>
              )}
            </div>
          </div>

          {/* Live preview */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Live Preview</label>
            <div className="border border-gray-200 rounded-lg p-6">
              {data.logo ? (
                <div className="space-y-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                      src={URL.createObjectURL(data.logo)}
                      alt="School logo preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-sm text-gray-600">
                    <p><strong>File:</strong> {data.logo.name}</p>
                    <p><strong>Size:</strong> {Math.round(data.logo.size / 1024)} KB</p>
                    <p><strong>Format:</strong> {data.logo.type}</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm text-green-800">✓ Logo will be used in top nav and login screen</p>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Building2 className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500">No logo uploaded yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Academic Year */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-indigo-600" />
          Academic Year
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
            <input
              type="date"
              value={data.academicYear.startDate}
              onChange={(e) => handleAcademicYearChange('startDate', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
            <input
              type="date"
              value={data.academicYear.endDate}
              onChange={(e) => handleAcademicYearChange('endDate', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        {errors.academicYear && <p className="text-red-600 text-sm mt-2">{errors.academicYear}</p>}
        {data.academicYear.startDate && data.academicYear.endDate && !errors.academicYear && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              ✓ Academic year: {new Date(data.academicYear.startDate).toLocaleDateString()} - {new Date(data.academicYear.endDate).toLocaleDateString()}
            </p>
            <p className="text-xs text-blue-600 mt-1">Will be used in term/date validations throughout the system</p>
          </div>
        )}
      </div>

      {/* Timezone Selection */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-indigo-600" />
          Timezone
        </h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">School Timezone *</label>
          <select
            value={data.timezone || getBrowserTimezone()}
            onChange={(e) => handleTimezoneChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select timezone...</option>
            {timezones.map((tz) => (
              <option key={tz} value={tz}>
                {tz.replace('_', ' ')} ({new Date().toLocaleTimeString('en-US', { timeZone: tz, timeZoneName: 'short' }).split(' ')[1]})
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">Default: {getBrowserTimezone()} (detected from browser locale)</p>
          {data.timezone && (
            <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">✓ All timestamps will reflect {data.timezone} timezone</p>
            </div>
          )}
        </div>
      </div>

      {/* Setup Summary Preview */}
      {isPreviewMode && data.name && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Setup Summary Preview</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start gap-4">
              {data.logo ? (
                <img
                  src={URL.createObjectURL(data.logo)}
                  alt="School logo"
                  className="w-16 h-16 object-contain rounded-lg bg-white border border-gray-200"
                />
              ) : (
                <div className="w-16 h-16 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
              )}
              <div className="flex-1">
                <h4 className="text-xl font-bold text-gray-900">{data.name}</h4>
                {data.academicYear.startDate && data.academicYear.endDate && (
                  <p className="text-sm text-gray-600 mt-1">
                    Academic Year: {new Date(data.academicYear.startDate).getFullYear()} - {new Date(data.academicYear.endDate).getFullYear()}
                  </p>
                )}
                {data.timezone && <p className="text-sm text-gray-600">Timezone: {data.timezone}</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 