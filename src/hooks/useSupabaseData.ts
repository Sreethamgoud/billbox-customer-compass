
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// For now, we'll use mock data until we set up the database tables
const mockBills = [
  {
    id: 1,
    name: "Netflix",
    amount: 15.99,
    dueDate: "2024-01-15",
    status: "paid",
    category: "Entertainment"
  },
  {
    id: 2,
    name: "Electric Bill",
    amount: 127.43,
    dueDate: "2024-01-18",
    status: "due",
    category: "Utilities"
  },
  {
    id: 3,
    name: "Internet",
    amount: 79.99,
    dueDate: "2024-01-20",
    status: "due",
    category: "Utilities"
  }
];

const mockBudgets = [
  {
    id: 1,
    category: "Groceries",
    spent: 450,
    limit: 500,
    color: "green"
  },
  {
    id: 2,
    category: "Entertainment",
    spent: 280,
    limit: 200,
    color: "red"
  },
  {
    id: 3,
    category: "Transportation",
    spent: 120,
    limit: 300,
    color: "blue"
  }
];

const mockAlerts = [
  {
    id: 1,
    message: "Your grocery budget is 90% used this month",
    type: "warning",
    time: "2h ago",
    read: false
  },
  {
    id: 2,
    message: "Electric bill payment confirmed",
    type: "success",
    time: "1d ago",
    read: false
  }
];

export const useSupabaseData = () => {
  // For now, return mock data instantly
  // Later we'll replace this with actual Supabase queries
  return {
    data: {
      bills: mockBills,
      budgets: mockBudgets,
      alerts: mockAlerts,
    },
    isLoading: false,
    error: null,
  };
};

export const useBills = () => {
  return useQuery({
    queryKey: ['bills'],
    queryFn: async () => {
      // For now return mock data
      // Later: const { data, error } = await supabase.from('bills').select('*');
      return mockBills;
    },
  });
};

export const useBudgets = () => {
  return useQuery({
    queryKey: ['budgets'],
    queryFn: async () => {
      // For now return mock data
      // Later: const { data, error } = await supabase.from('budgets').select('*');
      return mockBudgets;
    },
  });
};

export const useAlerts = () => {
  return useQuery({
    queryKey: ['alerts'],
    queryFn: async () => {
      // For now return mock data
      // Later: const { data, error } = await supabase.from('alerts').select('*');
      return mockAlerts;
    },
  });
};
