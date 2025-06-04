
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Bill {
  id: string;
  name: string;
  amount: number;
  due_date: string;
  status: 'paid' | 'due' | 'upcoming';
  category: string;
  description?: string;
  recurring?: boolean;
  recurring_frequency?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface Budget {
  id: string;
  category: string;
  budget_limit: number;
  spent: number;
  period: string;
  color: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface Alert {
  id: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  read: boolean;
  user_id: string;
  created_at: string;
}

export interface Transaction {
  id: string;
  amount: number;
  category: string;
  description?: string;
  transaction_date: string;
  user_id: string;
  bill_id?: string;
  created_at: string;
}

export interface Profile {
  id: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

const fetchDashboardData = async () => {
  console.log('Fetching dashboard data...');
  
  // Fetch bills
  const { data: bills, error: billsError } = await supabase
    .from('bills')
    .select('*')
    .order('due_date', { ascending: true });
  
  if (billsError) {
    console.error('Error fetching bills:', billsError);
    throw billsError;
  }

  // Fetch budgets
  const { data: budgets, error: budgetsError } = await supabase
    .from('budgets')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (budgetsError) {
    console.error('Error fetching budgets:', budgetsError);
    throw budgetsError;
  }

  // Fetch alerts
  const { data: alerts, error: alertsError } = await supabase
    .from('alerts')
    .select('*')
    .eq('read', false)
    .order('created_at', { ascending: false });
  
  if (alertsError) {
    console.error('Error fetching alerts:', alertsError);
    throw alertsError;
  }

  // Fetch transactions
  const { data: transactions, error: transactionsError } = await supabase
    .from('transactions')
    .select('*')
    .order('transaction_date', { ascending: false });
  
  if (transactionsError) {
    console.error('Error fetching transactions:', transactionsError);
    throw transactionsError;
  }

  console.log('Dashboard data fetched successfully:', { bills, budgets, alerts, transactions });
  
  // Type the data properly
  const typedBills = (bills || []).map(bill => ({
    ...bill,
    status: bill.status as 'paid' | 'due' | 'upcoming'
  })) as Bill[];

  const typedAlerts = (alerts || []).map(alert => ({
    ...alert,
    type: alert.type as 'success' | 'warning' | 'error' | 'info'
  })) as Alert[];

  return {
    bills: typedBills,
    budgets: budgets as Budget[] || [],
    alerts: typedAlerts,
    transactions: transactions as Transaction[] || []
  };
};

export const useSupabaseData = () => {
  return useQuery({
    queryKey: ['dashboard-data'],
    queryFn: fetchDashboardData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Individual hooks for specific data types
export const useBills = () => {
  return useQuery({
    queryKey: ['bills'],
    queryFn: async () => {
      console.log('Fetching bills...');
      const { data: bills, error } = await supabase
        .from('bills')
        .select('*')
        .order('due_date', { ascending: true });
      
      if (error) {
        console.error('Error fetching bills:', error);
        throw error;
      }

      return (bills || []).map(bill => ({
        ...bill,
        status: bill.status as 'paid' | 'due' | 'upcoming'
      })) as Bill[];
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useBudgets = () => {
  return useQuery({
    queryKey: ['budgets'],
    queryFn: async () => {
      console.log('Fetching budgets...');
      const { data: budgets, error } = await supabase
        .from('budgets')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching budgets:', error);
        throw error;
      }

      return budgets as Budget[] || [];
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useAlerts = () => {
  return useQuery({
    queryKey: ['alerts'],
    queryFn: async () => {
      console.log('Fetching alerts...');
      const { data: alerts, error } = await supabase
        .from('alerts')
        .select('*')
        .eq('read', false)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching alerts:', error);
        throw error;
      }

      return (alerts || []).map(alert => ({
        ...alert,
        type: alert.type as 'success' | 'warning' | 'error' | 'info'
      })) as Alert[];
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useTransactions = () => {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      console.log('Fetching transactions...');
      const { data: transactions, error } = await supabase
        .from('transactions')
        .select('*')
        .order('transaction_date', { ascending: false });
      
      if (error) {
        console.error('Error fetching transactions:', error);
        throw error;
      }

      return transactions as Transaction[] || [];
    },
    staleTime: 1000 * 60 * 5,
  });
};
