import React from 'react';
import { Package, Users, TrendingUp, AlertTriangle, Calendar, DollarSign } from 'lucide-react';
import { Medicine, Customer, Sale } from '../types';
import StatsCard from './ui/StatsCard';
import Chart from './ui/Chart';

interface DashboardProps {
  medicines: Medicine[];
  customers: Customer[];
  sales: Sale[];
}

const Dashboard: React.FC<DashboardProps> = ({ medicines, customers, sales }) => {
  const lowStockMedicines = medicines.filter(med => med.stock <= med.minStock);
  const expiringMedicines = medicines.filter(med => {
    const expiryDate = new Date(med.expiryDate);
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    return expiryDate <= thirtyDaysFromNow;
  });

  const todaySales = sales.filter(sale => sale.date === '2024-01-15');
  const todayRevenue = todaySales.reduce((sum, sale) => sum + sale.finalTotal, 0);
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.finalTotal, 0);

  const salesData = [
    { name: 'Jan 11', sales: 2400 },
    { name: 'Jan 12', sales: 1398 },
    { name: 'Jan 13', sales: 9800 },
    { name: 'Jan 14', sales: 3908 },
    { name: 'Jan 15', sales: 4800 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Medicines"
          value={medicines.length.toString()}
          icon={Package}
          color="blue"
          change="+12%"
        />
        <StatsCard
          title="Low Stock Items"
          value={lowStockMedicines.length.toString()}
          icon={AlertTriangle}
          color="red"
          change={lowStockMedicines.length > 0 ? "Alert" : "Good"}
        />
        <StatsCard
          title="Total Customers"
          value={customers.length.toString()}
          icon={Users}
          color="green"
          change="+8%"
        />
        <StatsCard
          title="Today's Revenue"
          value={`₹${todayRevenue.toFixed(2)}`}
          icon={DollarSign}
          color="purple"
          change="+15%"
        />
      </div>

      {/* Charts and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Sales Trend</h2>
          <Chart data={salesData} />
        </div>

        {/* Alerts */}
        <div className="space-y-4">
          {/* Low Stock Alert */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <h2 className="text-lg font-semibold text-gray-800">Low Stock Alert</h2>
            </div>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {lowStockMedicines.length > 0 ? (
                lowStockMedicines.map(medicine => (
                  <div key={medicine.id} className="flex justify-between items-center p-2 bg-red-50 rounded">
                    <span className="text-sm font-medium text-red-800">{medicine.name}</span>
                    <span className="text-sm text-red-600">{medicine.stock} left</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">All medicines are well stocked</p>
              )}
            </div>
          </div>

          {/* Expiring Medicines */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-semibold text-gray-800">Expiring Soon</h2>
            </div>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {expiringMedicines.length > 0 ? (
                expiringMedicines.map(medicine => (
                  <div key={medicine.id} className="flex justify-between items-center p-2 bg-orange-50 rounded">
                    <span className="text-sm font-medium text-orange-800">{medicine.name}</span>
                    <span className="text-sm text-orange-600">{medicine.expiryDate}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No medicines expiring soon</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Sales */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Sales</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-sm font-medium text-gray-600">Customer</th>
                <th className="text-left py-2 text-sm font-medium text-gray-600">Items</th>
                <th className="text-left py-2 text-sm font-medium text-gray-600">Total</th>
                <th className="text-left py-2 text-sm font-medium text-gray-600">Date</th>
                <th className="text-left py-2 text-sm font-medium text-gray-600">Payment</th>
              </tr>
            </thead>
            <tbody>
              {sales.slice(0, 5).map(sale => (
                <tr key={sale.id} className="border-b border-gray-100">
                  <td className="py-3 text-sm text-gray-800">{sale.customerName || 'Walk-in'}</td>
                  <td className="py-3 text-sm text-gray-600">{sale.items.length} items</td>
                  <td className="py-3 text-sm font-medium text-gray-800">₹{sale.finalTotal.toFixed(2)}</td>
                  <td className="py-3 text-sm text-gray-600">{sale.date}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      sale.paymentMethod === 'cash' 
                        ? 'bg-green-100 text-green-800'
                        : sale.paymentMethod === 'card'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {sale.paymentMethod.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;