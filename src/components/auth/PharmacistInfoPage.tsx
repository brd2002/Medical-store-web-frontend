import React, { useState } from 'react';
import { User, FileText, Calendar, Building, CheckCircle, Award } from 'lucide-react';

interface PharmacistInfoPageProps {
  onComplete: (pharmacistData: PharmacistData) => void;
}

export interface PharmacistData {
  pharmacistName: string;
  licenseNumber: string;
  issuedYear: string;
  expirationDate: string;
  issuedOrganization: string;
}

const PharmacistInfoPage: React.FC<PharmacistInfoPageProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState<PharmacistData>({
    pharmacistName: '',
    licenseNumber: '',
    issuedYear: '',
    expirationDate: '',
    issuedOrganization: ''
  });

  const [errors, setErrors] = useState<Partial<PharmacistData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof PharmacistData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<PharmacistData> = {};

    if (!formData.pharmacistName.trim()) {
      newErrors.pharmacistName = 'Pharmacist name is required';
    }

    if (!formData.licenseNumber.trim()) {
      newErrors.licenseNumber = 'License number is required';
    }

    if (!formData.issuedYear) {
      newErrors.issuedYear = 'Issued year is required';
    } else {
      const year = parseInt(formData.issuedYear);
      const currentYear = new Date().getFullYear();
      if (year < 1990 || year > currentYear) {
        newErrors.issuedYear = `Year must be between 1990 and ${currentYear}`;
      }
    }

    if (!formData.expirationDate) {
      newErrors.expirationDate = 'Expiration date is required';
    } else {
      const expiryDate = new Date(formData.expirationDate);
      const today = new Date();
      if (expiryDate <= today) {
        newErrors.expirationDate = 'License must not be expired';
      }
    }

    if (!formData.issuedOrganization.trim()) {
      newErrors.issuedOrganization = 'Issuing organization is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onComplete(formData);
    }, 2000);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1989 }, (_, i) => currentYear - i);

  const organizations = [
    'Pharmacy Council of India (PCI)',
    'State Pharmacy Council - Andhra Pradesh',
    'State Pharmacy Council - Delhi',
    'State Pharmacy Council - Gujarat',
    'State Pharmacy Council - Karnataka',
    'State Pharmacy Council - Maharashtra',
    'State Pharmacy Council - Tamil Nadu',
    'State Pharmacy Council - Uttar Pradesh',
    'State Pharmacy Council - West Bengal',
    'Other'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
          {/* Header */}
          <div className="p-8 border-b border-gray-200">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Pharmacist License Information</h1>
              <p className="text-gray-600">Please provide your professional licensing details</p>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pharmacist Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="pharmacistName"
                  value={formData.pharmacistName}
                  onChange={handleInputChange}
                  placeholder="Enter licensed pharmacist name"
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.pharmacistName ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                  }`}
                />
              </div>
              {errors.pharmacistName && <p className="mt-1 text-sm text-red-600">{errors.pharmacistName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                License Number *
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleInputChange}
                  placeholder="Enter pharmacist license number"
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.licenseNumber ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                  }`}
                />
              </div>
              {errors.licenseNumber && <p className="mt-1 text-sm text-red-600">{errors.licenseNumber}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Issued Year *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    name="issuedYear"
                    value={formData.issuedYear}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.issuedYear ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                    }`}
                  >
                    <option value="">Select Year</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                {errors.issuedYear && <p className="mt-1 text-sm text-red-600">{errors.issuedYear}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiration Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    name="expirationDate"
                    value={formData.expirationDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.expirationDate ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                    }`}
                  />
                </div>
                {errors.expirationDate && <p className="mt-1 text-sm text-red-600">{errors.expirationDate}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Issued Organization *
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  name="issuedOrganization"
                  value={formData.issuedOrganization}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.issuedOrganization ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                  }`}
                >
                  <option value="">Select Issuing Organization</option>
                  {organizations.map(org => (
                    <option key={org} value={org}>{org}</option>
                  ))}
                </select>
              </div>
              {errors.issuedOrganization && <p className="mt-1 text-sm text-red-600">{errors.issuedOrganization}</p>}
            </div>

            {/* License Status Indicator */}
            {formData.expirationDate && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-800">License Status</p>
                    <p className="text-sm text-blue-600">
                      {new Date(formData.expirationDate) > new Date() 
                        ? `Valid until ${new Date(formData.expirationDate).toLocaleDateString()}`
                        : 'License appears to be expired'
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying License...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Complete Setup</span>
                </>
              )}
            </button>
          </form>

          {/* Security Note */}
          <div className="px-8 pb-8">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-600 text-center">
                <span className="font-medium">Security Notice:</span> Your license information will be verified and stored securely. 
                This information is required for regulatory compliance and will not be shared with third parties.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Having trouble? Contact support for assistance with license verification
          </p>
        </div>
      </div>
    </div>
  );
};

export default PharmacistInfoPage;