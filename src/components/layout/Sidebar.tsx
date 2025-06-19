import React from 'react';
import { Store, Package, ShoppingCart, Users, TrendingUp, Menu, X } from 'lucide-react';
import { Tab } from '../../App';

interface SidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const menuItems = [
  { id: 'dashboard' as Tab, label: 'Dashboard', icon: Store },
  { id: 'inventory' as Tab, label: 'Inventory', icon: Package },
  { id: 'sales' as Tab, label: 'Sales', icon: ShoppingCart },
  { id: 'customers' as Tab, label: 'Customers', icon: Users },
  { id: 'reports' as Tab, label: 'Reports', icon: TrendingUp },
];

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full bg-white shadow-lg z-50 transition-all duration-300
        ${isOpen ? 'w-64' : 'w-20'}
      `}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Store className="w-6 h-6 text-white" />
            </div>
            {isOpen && (
              <div>
                <h1 className="text-xl font-bold text-gray-800">MedStore</h1>
                <p className="text-sm text-gray-500">Management System</p>
              </div>
            )}
          </div>
        </div>
        
        <nav className="mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`
                  w-full flex items-center px-6 py-3 text-left transition-all duration-200
                  ${isActive 
                    ? 'bg-blue-50 border-r-4 border-blue-600 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${isOpen ? 'mr-3' : 'mx-auto'}`} />
                {isOpen && (
                  <span className="font-medium">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;