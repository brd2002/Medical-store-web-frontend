import React, { useState } from 'react';
import { Plus, Minus, Trash2, Search } from 'lucide-react';
import { Medicine, Customer, Sale, SaleItem } from '../../types';

interface SaleFormProps {
  medicines: Medicine[];
  customers: Customer[];
  onSubmit: (sale: Omit<Sale, 'id'>) => void;
  onCancel: () => void;
}

const SaleForm: React.FC<SaleFormProps> = ({ medicines, customers, onSubmit, onCancel }) => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [items, setItems] = useState<SaleItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'upi'>('cash');
  const [discount, setDiscount] = useState(0);

  const filteredMedicines = medicines.filter(med => 
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
    med.stock > 0
  );

  const addItem = (medicine: Medicine) => {
    const existingItem = items.find(item => item.medicineId === medicine.id);
    
    if (existingItem) {
      if (existingItem.quantity < medicine.stock) {
        updateItemQuantity(medicine.id, existingItem.quantity + 1);
      }
    } else {
      const newItem: SaleItem = {
        medicineId: medicine.id,
        medicineName: medicine.name,
        quantity: 1,
        price: medicine.price,
        total: medicine.price
      };
      setItems([...items, newItem]);
    }
    setSearchTerm('');
  };

  const updateItemQuantity = (medicineId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(medicineId);
      return;
    }

    const medicine = medicines.find(m => m.id === medicineId);
    if (!medicine || quantity > medicine.stock) return;

    setItems(items.map(item => 
      item.medicineId === medicineId
        ? { ...item, quantity, total: item.price * quantity }
        : item
    ));
  };

  const removeItem = (medicineId: string) => {
    setItems(items.filter(item => item.medicineId !== medicineId));
  };

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const finalTotal = subtotal - discount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      alert('Please add at least one item to the sale.');
      return;
    }

    const saleData: Omit<Sale, 'id'> = {
      customerId: selectedCustomer?.id,
      customerName: selectedCustomer?.name,
      items,
      total: subtotal,
      discount,
      finalTotal,
      paymentMethod,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().split(' ')[0].slice(0, 5)
    };

    onSubmit(saleData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Customer (Optional)
        </label>
        <select
          value={selectedCustomer?.id || ''}
          onChange={(e) => {
            const customer = customers.find(c => c.id === e.target.value);
            setSelectedCustomer(customer || null);
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Walk-in Customer</option>
          {customers.map(customer => (
            <option key={customer.id} value={customer.id}>
              {customer.name} - {customer.phone}
            </option>
          ))}
        </select>
      </div>

      {/* Medicine Search */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Add Medicines
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search medicines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        {searchTerm && (
          <div className="mt-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg">
            {filteredMedicines.map(medicine => (
              <button
                key={medicine.id}
                type="button"
                onClick={() => addItem(medicine)}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">{medicine.name}</p>
                    <p className="text-sm text-gray-500">₹{medicine.price} - Stock: {medicine.stock}</p>
                  </div>
                  <Plus className="w-4 h-4 text-gray-400" />
                </div>
              </button>
            ))}
            {filteredMedicines.length === 0 && (
              <p className="px-4 py-2 text-gray-500">No medicines found</p>
            )}
          </div>
        )}
      </div>

      {/* Selected Items */}
      {items.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-3">Selected Items</h3>
          <div className="space-y-2">
            {items.map(item => (
              <div key={item.medicineId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{item.medicineName}</p>
                  <p className="text-sm text-gray-500">₹{item.price.toFixed(2)} each</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => updateItemQuantity(item.medicineId, item.quantity - 1)}
                    className="p-1 rounded-full hover:bg-gray-200"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  
                  <button
                    type="button"
                    onClick={() => updateItemQuantity(item.medicineId, item.quantity + 1)}
                    className="p-1 rounded-full hover:bg-gray-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  
                  <div className="w-20 text-right font-medium text-gray-800">
                    ₹{item.total.toFixed(2)}
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => removeItem(item.medicineId)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded-full"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payment Details */}
      {items.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount (₹)
              </label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                min="0"
                max={subtotal}
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as 'cash' | 'card' | 'upi')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="upi">UPI</option>
              </select>
            </div>
          </div>

          {/* Total Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Discount:</span>
                <span className="font-medium">-₹{discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total:</span>
                <span>₹{finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={items.length === 0}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Complete Sale
        </button>
      </div>
    </form>
  );
};

export default SaleForm;