
import { useQuery } from '@tanstack/react-query';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

export const useMockData = () => {
  // Fetch all the required data for the dashboard
  const { data: bills, isLoading: billsLoading, error: billsError } = useQuery({
    queryKey: ['bills'],
    queryFn: () => fetcher('/api/mock/bills.json'),
  });

  const { data: budgets, isLoading: budgetsLoading, error: budgetsError } = useQuery({
    queryKey: ['budgets'],
    queryFn: () => fetcher('/api/mock/budgets.json'),
  });

  const { data: alerts, isLoading: alertsLoading, error: alertsError } = useQuery({
    queryKey: ['alerts'],
    queryFn: () => fetcher('/api/mock/alerts.json'),
  });

  return {
    data: {
      bills: bills || [],
      budgets: budgets || [],
      alerts: alerts || [],
    },
    isLoading: billsLoading || budgetsLoading || alertsLoading,
    error: billsError || budgetsError || alertsError,
  };
};

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => fetcher('/api/mock/users.json'),
  });
};

export const useBills = () => {
  return useQuery({
    queryKey: ['bills'],
    queryFn: () => fetcher('/api/mock/bills.json'),
  });
};

export const useBudgets = () => {
  return useQuery({
    queryKey: ['budgets'],
    queryFn: () => fetcher('/api/mock/budgets.json'),
  });
};

export const useIntegrations = () => {
  return useQuery({
    queryKey: ['integrations'],
    queryFn: () => fetcher('/api/mock/integrations.json'),
  });
};

export const useAlerts = () => {
  return useQuery({
    queryKey: ['alerts'],
    queryFn: () => fetcher('/api/mock/alerts.json'),
  });
};
