import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Package, Users, Calendar } from 'lucide-react';
import { Medicine, Sale } from '../types';

interface ReportsProps {
  medicines: Medicine[];
  sales: Sale[];
}

const Reports: React.FC<ReportsProps> = ({ medicines, sales }) => {
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.finalTotal, 0);
  const averageSale = sales.length > 0 ? totalRevenue / sales.length : 0;
  
  const lowStockItems = medicines.filter(med => med.stock <= med.minStock);
  const expiringItems = medicines.filter(med => {
    const expiryDate = new Date(med.expiryDate);
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    return expiryDate <= thirtyDaysFromNow;
  });

  // Calculate daily sales for the last 7 days
  const dailySales = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split('T')[0];
    const daySales = sales.filter(sale => sale.date === dateString);
    const dayRevenue = daySales.reduce((sum, sale) => sum + sale.finalTotal, 0);
    dailySales.push({
      date: dateString,
      sales: daySales.length,
      revenue: dayRevenue
    });
  }

  // Top selling medicines
  const medicinesSold = sales.flatMap(sale => sale.items);
  const medicineSales = medicinesSold.reduce((acc, item) => {
    acc[item.medicineId] = (acc[item.medicineId] || 0) + item.quantity;
    return acc;
  }, {} as Record<string, number>);

  const topMedicines = Object.entries(medicineSales)
    .map(([medicineId, quantity]) => {
      const medicine = medicines.find(m => m.id === medicineId);
      return { medicine, quantity };
    })
    .filter(item => item.medicine)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Reports & Analytics</h1>
        <div className="text-sm text-gray-500">
          Generated on: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-800">₹{totalRevenue.toFixed(2)}</p>
              <p className="text-sm text-green-600">+12.5% from last month</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sales</p>
              <p className="text-2xl font-bold text-gray-800">{sales.length}</p>
              <p className="text-sm text-blue-600">Avg: ₹{averageSale.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
              <p className="text-2xl font-bold text-gray-800">{lowStockItems.length}</p>
              <p className="text-sm text-red-600">Requires attention</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
              <p className="text-2xl font-bold text-gray-800">{expiringItems.length}</p>
              <p className="text-sm text-orange-600">Within 30 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Sales Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Daily Sales (Last 7 Days)</h2>
          <div className="space-y-3">
            {dailySales.map((day, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{new Date(day.date).toLocaleDateString()}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-800">{day.sales} sales</span>
                  <span className="text-sm font-bold text-green-600">₹{day.revenue.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Selling Medicines */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Selling Medicines</h2>
          <div className="space-y-3">
            {topMedicines.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-gray-800">{item.medicine!.name}</p>
                    <p className="text-sm text-gray-500">{item.medicine!.category}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-blue-600">{item.quantity} sold</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Alert */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <TrendingDown className="w-5 h-5 text-red-500" />
            <span>Low Stock Alert</span>
          </h2>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {lowStockItems.length > 0 ? (
              lowStockItems.map(medicine => (
                <div key={medicine.id} className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium text-red-800">{medicine.name}</p>
                    <p className="text-sm text-red-600">{medicine.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-red-800">{medicine.stock} left</p>
                    <p className="text-sm text-red-600">Min: {medicine.minStock}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">All medicines are well stocked</p>
            )}
          </div>
        </div>

        {/* Expiring Medicines */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-orange-500" />
            <span>Expiring Soon</span>
          </h2>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {expiringItems.length > 0 ? (
              expiringItems.map(medicine => (
                <div key={medicine.id} className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <div>
                    <p className="font-medium text-orange-800">{medicine.name}</p>
                    <p className="text-sm text-orange-600">{medicine.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-orange-800">{medicine.expiryDate}</p>
                    <p className="text-sm text-orange-600">{medicine.stock} units</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No medicines expiring soon</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;