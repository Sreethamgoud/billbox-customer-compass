
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useBillMutations = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createBill = useMutation({
    mutationFn: async (billData: {
      name: string;
      amount: number;
      due_date: string;
      status: 'paid' | 'due' | 'upcoming';
      category: string;
      description?: string;
      recurring?: boolean;
      recurring_frequency?: 'weekly' | 'monthly' | 'quarterly' | 'yearly';
      file_url?: string;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('bills')
        .insert({
          ...billData,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (newBill) => {
      // Invalidate and refetch bills data
      queryClient.invalidateQueries({ queryKey: ['bills'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-data'] });
      
      // Optimistically update the bills cache
      queryClient.setQueryData(['bills'], (oldData: any) => {
        if (oldData) {
          return [...oldData, newBill];
        }
        return [newBill];
      });

      toast({
        title: "Success",
        description: "Bill created successfully",
      });
    },
    onError: (error: any) => {
      console.error('Create bill error:', error);
      toast({
        title: "Error",
        description: `Failed to create bill: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updateBill = useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & Partial<{
      name: string;
      amount: number;
      due_date: string;
      status: 'paid' | 'due' | 'upcoming';
      category: string;
      description: string;
      recurring: boolean;
      recurring_frequency: 'weekly' | 'monthly' | 'quarterly' | 'yearly';
      file_url: string;
    }>) => {
      const { data, error } = await supabase
        .from('bills')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bills'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-data'] });
      toast({
        title: "Success",
        description: "Bill updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update bill: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deleteBill = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('bills')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bills'] });
      toast({
        title: "Success",
        description: "Bill deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete bill: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    createBill,
    updateBill,
    deleteBill,
  };
};
