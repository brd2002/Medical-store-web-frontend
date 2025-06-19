export interface Medicine {
  id: string;
  name: string;
  category: string;
  manufacturer: string;
  price: number;
  stock: number;
  minStock: number;
  expiryDate: string;
  batchNumber: string;
  description?: string;
  dosage?: string;
  prescription?: boolean;
}

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone: string;
  address?: string;
  totalPurchases: number;
  lastVisit: string;
}

export interface SaleItem {
  medicineId: string;
  medicineName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Sale {
  id: string;
  customerId?: string;
  customerName?: string;
  items: SaleItem[];
  total: number;
  discount: number;
  finalTotal: number;
  paymentMethod: 'cash' | 'card' | 'upi';
  date: string;
  time: string;
}

export interface DashboardStats {
  totalMedicines: number;
  lowStockCount: number;
  totalCustomers: number;
  todaySales: number;
  totalRevenue: number;
  expiringMedicines: number;
}