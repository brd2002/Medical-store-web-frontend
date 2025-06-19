import  { useState } from 'react';
import { Store, Package, Users, TrendingUp, ShoppingCart, AlertTriangle } from 'lucide-react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import Sales from './components/Sales';
import Customers from './components/Customers';
import Reports from './components/Reports';
import LoginPage from './components/auth/LoginPage';
import OTPPage from './components/auth/OTPPage';
import RegistrationPage, { UserData } from './components/auth/RegistrationPage';
import PharmacistInfoPage, { PharmacistData } from './components/auth/PharmacistInfoPage';
import { Medicine, Customer, Sale } from './types';
import { mockMedicines, mockCustomers, mockSales } from './data/mockData';

export type Tab = 'dashboard' | 'inventory' | 'sales' | 'customers' | 'reports';
type AuthStep = 'login' | 'otp' | 'registration' | 'pharmacist-info' | 'authenticated';

function App() {
  const [authStep, setAuthStep] = useState<AuthStep>('login');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [pharmacistData, setPharmacistData] = useState<PharmacistData | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [medicines, setMedicines] = useState<Medicine[]>(mockMedicines);
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [sales, setSales] = useState<Sale[]>(mockSales);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogin = (phone: string) => {
    setPhoneNumber(phone);
    setAuthStep('otp');
  };

  const handleOTPVerify = () => {
    setAuthStep('registration');
  };

  const handleRegistrationComplete = (data: UserData) => {
    setUserData(data);
    setAuthStep('pharmacist-info');
  };

  const handlePharmacistInfoComplete = (data: PharmacistData) => {
    setPharmacistData(data);
    setAuthStep('authenticated');
  };

  const handleBackToLogin = () => {
    setAuthStep('login');
    setPhoneNumber('');
  };

  const handleAddMedicine = (medicine: Omit<Medicine, 'id'>) => {
    const newMedicine: Medicine = {
      ...medicine,
      id: Date.now().toString(),
    };
    setMedicines(prev => [...prev, newMedicine]);
  };

  const handleUpdateMedicine = (id: string, updatedMedicine: Partial<Medicine>) => {
    setMedicines(prev => 
      prev.map(medicine => 
        medicine.id === id 
          ? { ...medicine, ...updatedMedicine }
          : medicine
      )
    );
  };

  const handleDeleteMedicine = (id: string) => {
    setMedicines(prev => prev.filter(medicine => medicine.id !== id));
  };

  const handleAddCustomer = (customer: Omit<Customer, 'id'>) => {
    const newCustomer: Customer = {
      ...customer,
      id: Date.now().toString(),
    };
    setCustomers(prev => [...prev, newCustomer]);
  };

  const handleAddSale = (sale: Omit<Sale, 'id'>) => {
    const newSale: Sale = {
      ...sale,
      id: Date.now().toString(),
    };
    setSales(prev => [...prev, newSale]);
    
    // Update medicine stock
    sale.items.forEach(item => {
      handleUpdateMedicine(item.medicineId, {
        stock: medicines.find(m => m.id === item.medicineId)!.stock - item.quantity
      });
    });
  };

  // Show authentication pages
  if (authStep === 'login') {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (authStep === 'otp') {
    return (
      <OTPPage 
        phoneNumber={phoneNumber}
        onVerify={handleOTPVerify}
        onBack={handleBackToLogin}
      />
    );
  }

  if (authStep === 'registration') {
    return (
      <RegistrationPage 
        phoneNumber={phoneNumber}
        onComplete={handleRegistrationComplete}
      />
    );
  }

  if (authStep === 'pharmacist-info') {
    return (
      <PharmacistInfoPage 
        onComplete={handlePharmacistInfoComplete}
      />
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard medicines={medicines} customers={customers} sales={sales} />;
      case 'inventory':
        return (
          <Inventory
            medicines={medicines}
            onAddMedicine={handleAddMedicine}
            onUpdateMedicine={handleUpdateMedicine}
            onDeleteMedicine={handleDeleteMedicine}
          />
        );
      case 'sales':
        return (
          <Sales
            medicines={medicines}
            customers={customers}
            sales={sales}
            onAddSale={handleAddSale}
          />
        );
      case 'customers':
        return (
          <Customers
            customers={customers}
            onAddCustomer={handleAddCustomer}
          />
        );
      case 'reports':
        return <Reports medicines={medicines} sales={sales} />;
      default:
        return <Dashboard medicines={medicines} customers={customers} sales={sales} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <Header 
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          userData={userData}
          pharmacistData={pharmacistData}
        />
        
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;