import React from 'react';
import { Menu, Bell, Search, User, Award } from 'lucide-react';
import { UserData } from '../auth/RegistrationPage';
import { PharmacistData } from '../auth/PharmacistInfoPage';

interface HeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  userData?: UserData | null;
  pharmacistData?: PharmacistData | null;
}

const Header: React.FC<HeaderProps> = ({ isSidebarOpen, setIsSidebarOpen, userData, pharmacistData }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search medicines, customers..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">
                {userData?.name ? userData.name.charAt(0).toUpperCase() : 'A'}
              </span>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-2">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {userData?.name || 'Admin User'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {userData?.shopName || 'Pharmacist'}
                  </p>
                </div>
                {pharmacistData && (
                  <div className="flex items-center space-x-1">
                    <Award className="w-4 h-4 text-green-600" />
                    <span className="text-xs text-green-600 font-medium">Licensed</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;