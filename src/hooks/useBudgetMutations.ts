
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useBudgetMutations = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createBudget = useMutation({
    mutationFn: async (budgetData: {
      category: string;
      budget_limit: number;
      period: 'weekly' | 'monthly' | 'quarterly' | 'yearly';
      color?: string;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('budgets')
        .insert({
          ...budgetData,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      toast({
        title: "Success",
        description: "Budget created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create budget: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updateBudget = useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & Partial<{
      category: string;
      budget_limit: number;
      spent: number;
      period: 'weekly' | 'monthly' | 'quarterly' | 'yearly';
      color: string;
    }>) => {
      const { data, error } = await supabase
        .from('budgets')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      toast({
        title: "Success",
        description: "Budget updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update budget: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deleteBudget = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('budgets')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      toast({
        title: "Success",
        description: "Budget deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete budget: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    createBudget,
    updateBudget,
    deleteBudget,
  };
};
