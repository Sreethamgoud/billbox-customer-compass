
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export const useMockData = (endpoint) => {
  const { data, error, isLoading } = useSWR(`/api/mock/${endpoint}.json`, fetcher);
  
  return {
    data: data || [],
    isLoading,
    error
  };
};

export const useUsers = () => useMockData('users');
export const useBills = () => useMockData('bills');
export const useBudgets = () => useMockData('budgets');
export const useIntegrations = () => useMockData('integrations');
export const useAlerts = () => useMockData('alerts');
