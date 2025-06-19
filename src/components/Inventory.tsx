import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { Medicine } from '../types';
import MedicineForm from './forms/MedicineForm';
import Modal from './ui/Modal';

interface InventoryProps {
  medicines: Medicine[];
  onAddMedicine: (medicine: Omit<Medicine, 'id'>) => void;
  onUpdateMedicine: (id: string, medicine: Partial<Medicine>) => void;
  onDeleteMedicine: (id: string) => void;
}

const Inventory: React.FC<InventoryProps> = ({
  medicines,
  onAddMedicine,
  onUpdateMedicine,
  onDeleteMedicine
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const categories = [...new Set(medicines.map(med => med.category))];

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || medicine.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (medicine: Medicine) => {
    setEditingMedicine(medicine);
    setIsFormOpen(true);
  };

  const handleSubmit = (medicineData: Omit<Medicine, 'id'>) => {
    if (editingMedicine) {
      onUpdateMedicine(editingMedicine.id, medicineData);
    } else {
      onAddMedicine(medicineData);
    }
    setIsFormOpen(false);
    setEditingMedicine(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      onDeleteMedicine(id);
    }
  };

  const getStockStatus = (medicine: Medicine) => {
    if (medicine.stock === 0) return { status: 'Out of Stock', color: 'text-red-600 bg-red-50' };
    if (medicine.stock <= medicine.minStock) return { status: 'Low Stock', color: 'text-orange-600 bg-orange-50' };
    return { status: 'In Stock', color: 'text-green-600 bg-green-50' };
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Inventory Management</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Medicine</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Medicine Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedicines.map(medicine => {
          const stockStatus = getStockStatus(medicine);
          const isExpiringSoon = new Date(medicine.expiryDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

          return (
            <div key={medicine.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{medicine.name}</h3>
                  <p className="text-sm text-gray-600">{medicine.manufacturer}</p>
                  <p className="text-sm text-blue-600 font-medium">{medicine.category}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(medicine)}
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(medicine.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Price:</span>
                  <span className="font-semibold text-gray-800">₹{medicine.price.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Stock:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}>
                    {medicine.stock} units - {stockStatus.status}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Batch:</span>
                  <span className="text-sm font-medium text-gray-800">{medicine.batchNumber}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Expiry:</span>
                  <div className="flex items-center space-x-1">
                    {isExpiringSoon && <AlertTriangle className="w-3 h-3 text-orange-500" />}
                    <span className={`text-sm ${isExpiringSoon ? 'text-orange-600 font-medium' : 'text-gray-800'}`}>
                      {medicine.expiryDate}
                    </span>
                  </div>
                </div>

                {medicine.prescription && (
                  <div className="flex justify-center">
                    <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                      Prescription Required
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredMedicines.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No medicines found matching your criteria.</p>
        </div>
      )}

      {/* Medicine Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingMedicine(null);
        }}
        title={editingMedicine ? 'Edit Medicine' : 'Add New Medicine'}
      >
        <MedicineForm
          medicine={editingMedicine}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingMedicine(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default Inventory;