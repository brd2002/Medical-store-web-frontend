import { Medicine, Customer, Sale } from '../types';

export const mockMedicines: Medicine[] = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    category: 'Pain Relief',
    manufacturer: 'Cipla',
    price: 25.50,
    stock: 150,
    minStock: 20,
    expiryDate: '2025-12-15',
    batchNumber: 'PAR001',
    description: 'Pain relief and fever reducer',
    dosage: '1-2 tablets every 4-6 hours',
    prescription: false
  },
  {
    id: '2',
    name: 'Amoxicillin 250mg',
    category: 'Antibiotics',
    manufacturer: 'Sun Pharma',
    price: 85.00,
    stock: 75,
    minStock: 15,
    expiryDate: '2025-08-20',
    batchNumber: 'AMX002',
    description: 'Antibiotic for bacterial infections',
    dosage: 'As prescribed by doctor',
    prescription: true
  },
  {
    id: '3',
    name: 'Cetirizine 10mg',
    category: 'Antihistamine',
    manufacturer: 'Dr. Reddy\'s',
    price: 45.00,
    stock: 12,
    minStock: 20,
    expiryDate: '2025-06-30',
    batchNumber: 'CET003',
    description: 'Allergy relief medication',
    dosage: '1 tablet daily',
    prescription: false
  },
  {
    id: '4',
    name: 'Vitamin D3 60000 IU',
    category: 'Vitamins',
    manufacturer: 'Mankind',
    price: 120.00,
    stock: 200,
    minStock: 30,
    expiryDate: '2026-01-15',
    batchNumber: 'VIT004',
    description: 'Vitamin D supplement',
    dosage: '1 capsule weekly',
    prescription: false
  },
  {
    id: '5',
    name: 'Insulin Glargine',
    category: 'Diabetes',
    manufacturer: 'Sanofi',
    price: 850.00,
    stock: 8,
    minStock: 10,
    expiryDate: '2025-03-28',
    batchNumber: 'INS005',
    description: 'Long-acting insulin',
    dosage: 'As prescribed by doctor',
    prescription: true
  }
];

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91 9876543210',
    address: '123 Main Street, Delhi',
    totalPurchases: 5280.50,
    lastVisit: '2024-01-15'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    phone: '+91 8765432109',
    address: '456 Oak Avenue, Mumbai',
    totalPurchases: 3450.00,
    lastVisit: '2024-01-14'
  },
  {
    id: '3',
    name: 'Amit Patel',
    email: 'amit.patel@email.com',
    phone: '+91 7654321098',
    totalPurchases: 1890.75,
    lastVisit: '2024-01-13'
  }
];

export const mockSales: Sale[] = [
  {
    id: '1',
    customerId: '1',
    customerName: 'Rajesh Kumar',
    items: [
      {
        medicineId: '1',
        medicineName: 'Paracetamol 500mg',
        quantity: 2,
        price: 25.50,
        total: 51.00
      },
      {
        medicineId: '3',
        medicineName: 'Cetirizine 10mg',
        quantity: 1,
        price: 45.00,
        total: 45.00
      }
    ],
    total: 96.00,
    discount: 5.00,
    finalTotal: 91.00,
    paymentMethod: 'cash',
    date: '2024-01-15',
    time: '14:30'
  },
  {
    id: '2',
    customerId: '2',
    customerName: 'Priya Sharma',
    items: [
      {
        medicineId: '4',
        medicineName: 'Vitamin D3 60000 IU',
        quantity: 3,
        price: 120.00,
        total: 360.00
      }
    ],
    total: 360.00,
    discount: 0,
    finalTotal: 360.00,
    paymentMethod: 'upi',
    date: '2024-01-14',
    time: '11:15'
  }
];